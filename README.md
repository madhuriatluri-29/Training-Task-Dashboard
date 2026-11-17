# Training Task Management Dashboard

## 1. Project Overview

The Training Task Management Dashboard is a responsive, browser-based web application developed to manage and track training tasks efficiently.

The application allows users to create, view, edit, delete, search, filter, and update training tasks. It also provides a dashboard with task statistics to monitor overall progress.

The project is developed using HTML5, CSS3, and Vanilla JavaScript without any external frameworks or backend services.

## 2. Project Objectives

- Develop a responsive task management application.
- Implement task creation, editing, and deletion.
- Track task status and priority.
- Display task progress through dashboard statistics.
- Store task information using browser LocalStorage.
- Practise JavaScript DOM manipulation and event handling.
- Create a user-friendly interface for desktop and mobile devices.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the application |
| CSS3 | Styling and responsive layout |
| JavaScript (ES6+) | Application functionality and validation |
| LocalStorage | Persistent browser-based data storage |
| Git and GitHub | Version control and project hosting |
| GitHub Pages | Website deployment |

## 4. Main Features

### Dashboard
- Displays total tasks.
- Displays completed tasks.
- Displays pending tasks.
- Displays overdue tasks.
- Shows task completion percentage.
- Displays a progress indicator.

### Task Management
- Create new training tasks.
- Edit existing tasks.
- Delete tasks with confirmation.
- Update task status.
- Add task descriptions and assignee names.
- Select task priorities and due dates.

### Task Status
Tasks can have the following statuses:
- To Do
- In Progress
- Completed

### Priority Management
Tasks can be assigned one of three priority levels:
- Low
- Medium
- High

### Search and Filtering
- Search tasks by title.
- Filter tasks by status.
- Filter tasks by priority.
- Clear filters to display all tasks.

### Sidebar Navigation
- Dashboard
- All Tasks
- Create Task
- Completed
- Pending
- Overdue

### Form Validation
- Task title is required.
- Assignee name is required.
- Valid priority must be selected.
- A valid due date must be selected.
- Task status must be valid.
- Inline validation messages are displayed for invalid entries.

### Data Persistence
- Task information is saved in browser LocalStorage.
- Existing tasks remain available after refreshing the browser.
- Data is stored in JSON format.

### Responsive Design
- Supports desktop, tablet, and mobile screen layouts.
- Uses CSS Flexbox and Grid.
- Provides a responsive navigation layout.

## 5. Project Folder Structure

```text
Training-Task-Dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 6. How to Run the Project

### Step 1: Download or Clone the Repository

Clone the repository using:

```bash
git clone https://github.com/madhuriatluri-29/Training-Task-Dashboard
```

Alternatively, download the project files from GitHub.

### Step 2: Open the Project

Open the project folder in Visual Studio Code.

### Step 3: Run the Application

Open `index.html` directly in a web browser, such as Google Chrome.

Alternatively, use the VS Code Live Server extension if installed.

### Step 4: Start Managing Tasks

- Create a task using the Create Task option.
- Enter the required information.
- Save the task.
- Edit, delete, search, and filter tasks.
- View task statistics on the dashboard.

## 7. JavaScript Concepts Implemented

The project demonstrates the following JavaScript concepts:

- Variables and constants.
- Arrays and objects.
- Functions and reusable code.
- Array methods such as `map()`, `filter()`, `find()`, `reduce()`, and `sort()`.
- DOM manipulation.
- Event listeners and event delegation.
- Conditional statements and loops.
- Form validation.
- Date handling and comparison.
- JSON serialization and parsing.
- LocalStorage data management.

## 8. Data Storage

This application uses browser LocalStorage instead of a backend database.

Task information is converted into JSON format and saved in the browser.

**Note:** LocalStorage data belongs to the browser and device where it was created. It is not automatically synchronised between different devices.

## 9. Testing Performed

The following functional tests were performed:

| Test Case | Expected Result |
|---|---|
| Create a task | Task appears in the task list |
| Edit a task | Updated information is displayed |
| Delete a task | Task is removed after confirmation |
| Refresh browser | Previously saved tasks remain visible |
| Search tasks | Matching tasks are displayed |
| Filter by status | Tasks with selected status are displayed |
| Filter by priority | Tasks with selected priority are displayed |
| Date validation | Invalid dates are rejected |
| Dashboard statistics | Task counts and progress are updated |
| Responsive layout | Interface adjusts to different screen sizes |

## 10. Screenshots



## 11. Deployment

**GitHub Repository:**  
https://github.com/madhuriatluri-29/Training-Task-Dashboard

**Live Website:**  
https://madhuriatluri-29.github.io/Training-Task-Dashboard/


## 12. AI Assistance Disclosure

AI tools were used as learning and development assistance during this project.

They helped with:
- Understanding HTML, CSS, and JavaScript concepts.
- Explaining code functionality.
- Identifying and correcting errors.
- Improving form validation and responsive design.
- Preparing project documentation.

The code was reviewed, tested, and modified during implementation to understand the functionality and behaviour of the application.

## 13. Conclusion

The Training Task Management Dashboard demonstrates the practical implementation of HTML5, CSS3, and Vanilla JavaScript.

The project helped develop practical knowledge of frontend development, DOM manipulation, form validation, event handling, responsive design, and browser LocalStorage.

It provides a simple and effective interface for managing training tasks and monitoring their progress.

---

**Project:** Training Task Management Dashboard  
**Development:** HTML5, CSS3, Vanilla JavaScript  
**Version:** 1.0
