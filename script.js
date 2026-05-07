// get tasks from localStorage if it is not available then it is empty
let allTasks = JSON.parse(localStorage.getItem('taskstream_data')) || [];

// to manage editing of task
let currentEditingTaskId = null;

// default column for new task
let selectedColumnStatus = 'todoColumn';

// bootstrap modal setup & for manageing changes from js
const taskModalElement = document.getElementById('taskFormModal');
const taskModalManager = new bootstrap.Modal(taskModalElement);

// start app
function init() {
    renderTasks(); // show tasks
    attachEventListeners(); // attach events
}

// save tasks to localStorage
function persistTasks() {
    localStorage.setItem('taskstream_data', JSON.stringify(allTasks));
    renderTasks();
}

// open modal for add/edit
function showTaskModal(columnId = 'todoColumn', taskId = null) {
    currentEditingTaskId = taskId;
    selectedColumnStatus = columnId;

    if (taskId) {
        // edit mode - fill data
        const existingTask = allTasks.find(t => t.id === taskId);
        document.getElementById('taskNameInput').value = existingTask.title;
        document.getElementById('taskDescriptionInput').value = existingTask.desc;
        document.getElementById('taskPriorityInput').value = existingTask.priority;
    } else {
        // add mode - clear fields
        document.getElementById('taskNameInput').value = '';
        document.getElementById('taskDescriptionInput').value = '';
        document.getElementById('taskPriorityInput').value = 'Medium';
    }

    taskModalManager.show(); // show popup
}

// save task (add or update)
function saveTask() {
    const taskTitle = document.getElementById('taskNameInput').value;
    const taskDescription = document.getElementById('taskDescriptionInput').value;
    const taskPriority = document.getElementById('taskPriorityInput').value;

    if (!taskTitle) {
        return alert("Please enter a title & description. ");
    }

    // Map column ID to status
    const statusMap = {
        'todoColumn': 'todo',
        'progressColumn': 'progress',
        'doneColumn': 'done'
    };
    const taskStatus = statusMap[selectedColumnStatus] || 'todo';

    if (currentEditingTaskId) {
        // update existing task
        const taskToUpdate = allTasks.find(t => t.id === currentEditingTaskId);
        taskToUpdate.title = taskTitle;
        taskToUpdate.desc = taskDescription;
        taskToUpdate.priority = taskPriority;
    } else {
        // add new task
        allTasks.push({
            id: Date.now().toString(), // gives the id in miliseconds
            title: taskTitle,
            desc: taskDescription,
            priority: taskPriority,
            status: taskStatus,
            date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
        });
    }

    taskModalManager.hide(); // close modal
    persistTasks(); // save and refresh
}

// change task status (todo - progress - done - todo)
function cycleTaskStatus(taskId) {
    const taskToUpdate = allTasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    if (taskToUpdate.status === 'todo') {
        taskToUpdate.status = 'progress';
    } else if (taskToUpdate.status === 'progress') {
        taskToUpdate.status = 'done';
    } else {
        taskToUpdate.status = 'todo';
    }

    persistTasks(); // update UI
}

// delete a task
function removeTask(taskId) {
    allTasks = allTasks.filter(t => t.id !== taskId);
    persistTasks();
}

// render tasks on screen
function renderTasks() {

    const columnMap = {
        'todo': document.getElementById('todoTasksContainer'),
        'progress': document.getElementById('progressTasksContainer'),
        'done': document.getElementById('doneTasksContainer')
    };

    // removes older content 
    Object.values(columnMap).forEach(col => col.innerHTML = '');

    // get search and filter values
    const searchQuery = document.getElementById('taskSearchInput').value.toLowerCase();
    const priorityFilter = document.getElementById('taskPriorityFilter').value;

    // returns the tasks that matches to the search result & according to priority
    const cleanQuery = searchQuery.trim().toLowerCase();
    const filteredTasks = allTasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(cleanQuery);
        const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
        return matchesSearch && matchesPriority;
    });

    // create cards 
    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.draggable = true; // allows to become draggable

        // card HTML
        taskCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <span class="priority-badge badge-${task.priority.toLowerCase()}">${task.priority}</span>
                <div class="dropdown">
                    <i class="bi bi-three-dots-vertical cursor-pointer" data-bs-toggle="dropdown"></i>
                    <ul class="dropdown-menu shadow border-0">
                        <li><a class="dropdown-item" onclick="showTaskModal('${task.status}Column', '${task.id}')">Edit</a></li>
                        <li><a class="dropdown-item" onclick="cycleTaskStatus('${task.id}')">Change Status</a></li>
                        <li><a class="dropdown-item text-danger" onclick="removeTask('${task.id}')">Delete</a></li>
                    </ul>
                </div>
            </div>
            <h6 class="mt-2 fw-bold">${task.title}</h6>
            <p class="small text-muted mb-3">${task.desc}</p>
            <div class="d-flex align-items-center small text-muted">
                <i class="bi bi-calendar-event me-1"></i> ${task.date}
            </div>
        `;

        // drag start event
        taskCard.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', task.id);
        }

        // add card to correct column
        columnMap[task.status].appendChild(taskCard);
    });

    // update counts
    document.getElementById('todoTaskCount').innerText = allTasks.filter(t => t.status === 'todo').length;
    document.getElementById('progressTaskCount').innerText = allTasks.filter(t => t.status === 'progress').length;
    document.getElementById('doneTaskCount').innerText = allTasks.filter(t => t.status === 'done').length;
}

// allow drop 
function allowDrop(e) {
    e.preventDefault();
}

// handle drop event
function dropTask(e) {
    e.preventDefault();

    const draggedTaskId = e.dataTransfer.getData('text/plain'); // get dragged task id
    const targetColumnId = e.currentTarget.id; // get column id

    // Map column ID to status
    const statusMap = {
        'todoColumn': 'todo',
        'progressColumn': 'progress',
        'doneColumn': 'done'
    };
    const newStatus = statusMap[targetColumnId];

    const taskToMove = allTasks.find(t => t.id === draggedTaskId);
    // it check the task status is updated or not if updated then make changes in that
    if (taskToMove && taskToMove.status !== newStatus) {
        taskToMove.status = newStatus;
        persistTasks();
    }
}


function attachEventListeners() {
    document.getElementById('taskSearchInput').addEventListener('input', renderTasks);
    document.getElementById('taskPriorityFilter').addEventListener('change', renderTasks);
}


init();