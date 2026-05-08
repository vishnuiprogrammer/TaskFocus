# 📌 TaskFocus — Trello Mini Clone

A clean and responsive **Kanban Task Management App** inspired by Trello.  
Built using **HTML**, **CSS**, **JavaScript**, and **Bootstrap 5**.

---

# ✨ Preview

## 🖥 Desktop View
- Responsive 3-column Kanban board
- Drag & Drop task management
- Search and filter support
- Modern UI cards

## 📱 Mobile View
- Fully responsive stacked layout
- Optimized toolbar and search section

---

# 🚀 Features

## ✅ Task Management
- Create Tasks
- Edit Existing Tasks
- Delete Tasks
- Change Task Status

## ✅ Kanban Workflow
Three workflow columns:

| Column | Purpose |
|---|---|
| 🟦 To Do | Pending tasks |
| 🟧 In Progress | Active tasks |
| 🟩 Completed | Finished tasks |

---

## ✅ Drag & Drop
Tasks can be dragged between columns.

---

## ✅ Local Storage
All tasks are automatically saved in browser storage.

So tasks remain even after page refresh.

---

## ✅ Search Tasks
Instant task searching by title.

---

## ✅ Priority Filter
Filter tasks using:

- High
- Medium
- Low

---

## ✅ Responsive Design
Optimized for:
- Desktop
- Tablet
- Mobile devices

---

# 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript (Vanilla) | Functionality |
| Bootstrap 5 | Components & Layout |
| Bootstrap Icons | Icons |

---

# 📂 Project Structure

```bash
TaskFocus/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# 📄 HTML Structure (`index.html`)

The HTML file contains:

## 1️⃣ Header Section

Contains:
- App Branding
- Search Bar
- Priority Filter
- New Task Button

```html
<header class="navbar-top">
```

---

## 2️⃣ Dashboard Header

```html
<div class="dashboard-header">
```

Displays:
- Title
- Subtitle

---

## 3️⃣ Kanban Board

Main board wrapper:

```html
<div class="board-container">
```

Contains 3 columns:
- To Do
- In Progress
- Completed

Each column supports:
- Drag
- Drop
- Dynamic tasks

---

## 4️⃣ Task Modal

Bootstrap modal used for:
- Creating tasks
- Editing tasks

```html
<div class="modal fade" id="taskFormModal">
```

---

# 🎨 CSS Styling (`style.css`)

---

# 🌈 UI Design Philosophy

The UI follows:
- Soft modern colors
- Minimal shadows
- Rounded cards
- Smooth responsive layouts

---

# 🧩 Main Styling Sections

---

## ✅ Body Styling

```css
body {
  background-color: #f7f9fc;
}
```

Provides:
- Light background
- Modern typography

---

## ✅ Header Design

```css
.navbar-top
```

Features:
- White glass card look
- Box shadows
- Rounded corners

---

## ✅ Search Bar

```css
.search-container
```

Interactive focus effects:
- Border glow
- Background transition

---

## ✅ Board Layout

Desktop:
```css
flex-direction: row;
```

Mobile:
```css
flex-direction: column;
```

---

## ✅ Task Cards

```css
.task-card
```

Features:
- Elevated shadows
- Hover animations
- Colored top borders

---

## ✅ Priority Badges

| Priority | Color |
|---|---|
| High | Red |
| Medium | Orange |
| Low | Blue |

---

## ✅ Responsive Media Queries

### Tablet

```css
@media (min-width: 768px)
```

### Mobile

```css
@media (max-width: 768px)
```

### Small Phones

```css
@media (max-width: 480px)
```

---

# ⚙ JavaScript Logic (`script.js`)

---

# 📦 Data Storage

Tasks are stored using:

```javascript
localStorage
```

Example:

```javascript
localStorage.setItem()
localStorage.getItem()
```

---

# 🧠 Core Variables

---

## All Tasks Array

```javascript
let allTasks = JSON.parse(localStorage.getItem('taskstream_data')) || [];
```

Stores every task object.

---

## Current Editing Task

```javascript
let currentEditingTaskId = null;
```

Tracks task being edited.

---

## Selected Column

```javascript
let selectedColumnStatus = 'todoColumn';
```

Determines where new tasks are added.

---

# 🚀 Application Initialization

```javascript
init();
```

Runs:
- `renderTasks()`
- `attachEventListeners()`

---

# 💾 Persist Tasks

## Function

```javascript
persistTasks()
```

Purpose:
- Save tasks to localStorage
- Re-render UI

---

# 📝 Create / Edit Modal

## Function

```javascript
showTaskModal()
```

Handles:
- Opening modal
- Editing existing tasks
- Resetting form for new tasks

---

# 💾 Save Task

## Function

```javascript
saveTask()
```

Performs:
- Validation
- Add task
- Update existing task
- Save data

---

# 🔄 Change Task Status

## Function

```javascript
cycleTaskStatus()
```

Workflow cycle:

```text
To Do → Progress → Done → To Do
```

---

# ❌ Delete Task

## Function

```javascript
removeTask()
```

Removes task from array.

---

# 🎯 Render Tasks

## Function

```javascript
renderTasks()
```

Most important function.

Responsibilities:
- Clear columns
- Filter tasks
- Search tasks
- Create task cards
- Update counters

---

# 🔍 Search Functionality

```javascript
const searchQuery
```

Filters tasks by title.

---

# 🎚 Priority Filter

```javascript
const priorityFilter
```

Filters tasks based on selected priority.

---

# 🧱 Dynamic Card Creation

Cards are created using:

```javascript
document.createElement('div')
```

Then injected using:

```javascript
innerHTML
```

---

# 🖱 Drag & Drop System

---

## Allow Drop

```javascript
allowDrop()
```

Prevents default browser behavior.

---

## Drag Start

```javascript
taskCard.ondragstart
```

Stores task ID during drag.

---

## Drop Event

```javascript
dropTask()
```

Updates task status when dropped.

---

# 📊 Task Counters

Each column dynamically updates task counts:

```javascript
todoTaskCount
progressTaskCount
doneTaskCount
```

---

# 📱 Responsive Design

---

# Desktop Layout

```text
┌──────────┬──────────┬──────────┐
│ To Do    │ Progress │ Done     │
└──────────┴──────────┴──────────┘
```

---

# Mobile Layout

```text
┌──────────┐
│ To Do    │
└──────────┘

┌──────────┐
│ Progress │
└──────────┘

┌──────────┐
│ Done     │
└──────────┘
```

---

# 🧩 Task Object Structure

Each task follows this structure:

```javascript
{
    id: "1715345345",
    title: "Build README",
    desc: "Write detailed documentation",
    priority: "High",
    status: "todo",
    date: "08-05-2026"
}
```

---

# 🎨 UI Components

---

## Status Indicators

| Color | Meaning |
|---|---|
| 🔵 Blue | To Do |
| 🟠 Orange | Progress |
| 🟢 Green | Completed |

---

## Buttons

Custom button class:

```css
.btn-primary-custom
```

---

# 📌 Bootstrap Components Used

| Component | Purpose |
|---|---|
| Modal | Task Form |
| Dropdown | Task Actions |
| Form Controls | Inputs |
| Grid System | Responsive Layout |

---

# 🧪 Future Improvements

Potential enhancements:

- ✅ Dark Mode
- ✅ Due Dates
- ✅ Team Collaboration
- ✅ Task Labels
- ✅ Drag Animation
- ✅ Backend Database
- ✅ Authentication
- ✅ Real-time Sync
- ✅ Subtasks
- ✅ Notifications

---

# ⚡ How To Run

---

## Step 1

Download or clone the project.

```bash
git clone your-repository-url
```

---

## Step 2

Open folder.

---

## Step 3

Run `index.html`

You can use:
- VS Code Live Server
- Browser directly

---

# 📸 Suggested Screenshots

Add screenshots inside:

```bash
/assets
```

Example:

```markdown
![Dashboard](assets/dashboard.png)
```

---

# 🏆 Learning Concepts Covered

This project helps learn:

- DOM Manipulation
- Event Handling
- Drag & Drop API
- Local Storage
- Responsive Design
- Bootstrap Integration
- Dynamic Rendering
- State Management

---

# 📚 Important JavaScript Concepts Used

| Concept | Usage |
|---|---|
| Arrays | Store tasks |
| Objects | Task structure |
| Functions | Modular logic |
| Events | User interactions |
| localStorage | Persistence |
| Template Literals | Dynamic HTML |
| Filtering | Search & priority |
| Conditionals | Status management |

---

# 🙌 Credits

Built with ❤️ using:
- Bootstrap 5
- Bootstrap Icons
- Vanilla JavaScript

---

# 📄 License

This project is open-source and free to use.

---

# ⭐ Final Output

TaskFocus provides:
- Beautiful UI
- Real-world Kanban workflow
- Smooth task management
- Responsive experience
- Persistent browser storage

Perfect beginner-to-intermediate frontend project.

---
