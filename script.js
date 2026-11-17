// ==========================================
// TRAINING TASK MANAGEMENT DASHBOARD
// ==========================================

// 1. SELECT HTML ELEMENTS

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const titleInput = document.getElementById("title");
const assigneeInput = document.getElementById("assignee");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const statusInput = document.getElementById("status");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const addTaskButton = document.getElementById("addTaskButton");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const clearFiltersButton = document.getElementById("clearFilters");

const formSection = document.getElementById("taskFormSection");

// 2. CONSTANTS AND APPLICATION STATE

const STORAGE_KEY = "trainingDashboardTasks";

const VALID_STATUSES = ["To Do", "In Progress", "Completed"];
const VALID_PRIORITIES = ["Low", "Medium", "High"];

let tasks = [];
let editingTaskId = null;
let currentView = "dashboard";

// 3. HELPER FUNCTIONS

function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getDateAfter(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function createId() {
    if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

// 4. SAMPLE TASKS

function createSampleTasks() {
    return [
        {
            id: createId(),
            title: "Complete HTML5 Training",
            description: "Learn semantic HTML elements and create web pages.",
            assignee: "Rahul",
            priority: "High",
            dueDate: getDateAfter(2),
            status: "Completed"
        },
        {
            id: createId(),
            title: "Learn CSS Flexbox",
            description: "Practice layouts using CSS Flexbox.",
            assignee: "Priya",
            priority: "Medium",
            dueDate: getDateAfter(3),
            status: "In Progress"
        },
        {
            id: createId(),
            title: "JavaScript Fundamentals",
            description: "Study variables, functions, arrays and objects.",
            assignee: "Arun",
            priority: "High",
            dueDate: getDateAfter(1),
            status: "To Do"
        },
        {
            id: createId(),
            title: "Build Responsive Website",
            description: "Create a responsive website for desktop and mobile.",
            assignee: "Sneha",
            priority: "Medium",
            dueDate: getDateAfter(-2),
            status: "To Do"
        },
        {
            id: createId(),
            title: "GitHub Repository Setup",
            description: "Create a repository and upload project files.",
            assignee: "Kiran",
            priority: "Low",
            dueDate: getDateAfter(5),
            status: "In Progress"
        }
    ];
}

// 5. VALIDATE STORED TASK DATA

function isValidTask(task) {
    return (
        task !== null &&
        typeof task === "object" &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        task.title.trim() !== "" &&
        typeof task.description === "string" &&
        typeof task.assignee === "string" &&
        task.assignee.trim() !== "" &&
        VALID_PRIORITIES.includes(task.priority) &&
        VALID_STATUSES.includes(task.status) &&
        typeof task.dueDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate) &&
        !Number.isNaN(Date.parse(task.dueDate))
    );
}

// 6. LOAD DATA FROM LOCAL STORAGE

function loadTasks() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData === null) {
            tasks = createSampleTasks();
            saveTasks();
            return;
        }

        const parsedData = JSON.parse(savedData);

        if (
            !Array.isArray(parsedData) ||
            !parsedData.every(isValidTask)
        ) {
            throw new Error("Invalid stored task data");
        }

        tasks = parsedData;

    } catch (error) {
        console.warn("Stored data could not be loaded:", error);

        tasks = createSampleTasks();
        saveTasks();
    }
}

// 7. SAVE DATA TO LOCAL STORAGE

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Unable to save tasks:", error);
        alert("Unable to save tasks. Please check browser storage.");
    }
}

// 8. UPDATE DASHBOARD STATISTICS

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(task =>
        task.status === "Completed"
    ).length;

    const pending = tasks.filter(task =>
        task.status === "To Do" ||
        task.status === "In Progress"
    ).length;

    const overdue = tasks.filter(task =>
        task.status !== "Completed" &&
        task.dueDate < getToday()
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;

    document.getElementById("overdueTasks").textContent = overdue;

    document.getElementById("completionPercentage").textContent =
        `${percentage}%`;

    document.getElementById("progressBar").style.width =
        `${percentage}%`;
}

// 9. CREATE A TASK CARD SAFELY

function createTaskCard(task) {

    const card = document.createElement("article");
    card.className = "task-card";

    const heading = document.createElement("h4");
    heading.textContent = task.title;

    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description || "No description provided.";

    const badges = document.createElement("div");
    badges.className = "task-meta";

    const priorityBadge = document.createElement("span");
    priorityBadge.className = `badge priority-${task.priority}`;
    priorityBadge.textContent = `${task.priority} Priority`;

    const statusBadge = document.createElement("span");
    statusBadge.className =
        `badge status-${task.status.replaceAll(" ", "-")}`;
    statusBadge.textContent = task.status;

    badges.append(priorityBadge, statusBadge);

    const details = document.createElement("div");
    details.className = "task-details";

    const assignee = document.createElement("p");
    assignee.textContent = `Assigned to: ${task.assignee}`;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due date: ${formatDate(task.dueDate)}`;

    details.append(assignee, dueDate);

    if (
        task.status !== "Completed" &&
        task.dueDate < getToday()
    ) {
        const overdue = document.createElement("p");
        overdue.className = "overdue-label";
        overdue.textContent = "Overdue";
        details.appendChild(overdue);
    }

    // Status update dropdown

    const statusSelect = document.createElement("select");
    statusSelect.className = "task-status";
    statusSelect.dataset.action = "status";
    statusSelect.dataset.id = task.id;
    statusSelect.setAttribute("aria-label", `Change status for ${task.title}`);

    VALID_STATUSES.forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
    });

    statusSelect.value = task.status;

    // Edit and Delete buttons

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.dataset.action = "edit";
    editButton.dataset.id = task.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = task.id;

    actions.append(editButton, deleteButton);

    card.append(
        heading,
        description,
        badges,
        details,
        statusSelect,
        actions
    );

    return card;
}

// 10. DISPLAY TASKS


function renderTasks() {

    const searchText = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;

    const filteredTasks = tasks.filter(task => {

        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchText);

        const matchesStatus = !selectedStatus ||
            task.status === selectedStatus;

        const matchesPriority = !selectedPriority ||
            task.priority === selectedPriority;

        let matchesView = true;

        if (currentView === "completed") {
            matchesView = task.status === "Completed";
        }

        if (currentView === "pending") {
            matchesView =
                task.status === "To Do" ||
                task.status === "In Progress";
        }

        if (currentView === "overdue") {
            matchesView =
                task.status !== "Completed" &&
                task.dueDate < getToday();
        }

        return matchesSearch &&
               matchesStatus &&
               matchesPriority &&
               matchesView;
    });

    taskList.replaceChildren();

    filteredTasks.forEach(task => {
        taskList.appendChild(createTaskCard(task));
    });

    emptyState.hidden = filteredTasks.length !== 0;

    document.getElementById("taskCount").textContent =
        `${filteredTasks.length} task(s)`;

    const headings = {
        dashboard: "All Training Tasks",
        all: "All Training Tasks",
        completed: "Completed Tasks",
        pending: "Pending Tasks",
        overdue: "Overdue Tasks"
    };

    document.getElementById("taskSectionHeading").textContent =
        headings[currentView] || "All Training Tasks";
}


// 11. REFRESH THE COMPLETE DASHBOARD

function refreshDashboard() {
    updateDashboard();
    renderTasks();
}

// 12. FORM VALIDATION

function clearErrors() {
    ["title", "assignee", "priority", "dueDate"].forEach(field => {
        document.getElementById(`${field}Error`).textContent = "";
        document.getElementById(field).removeAttribute("aria-invalid");
    });
}

function showError(field, message) {
    document.getElementById(`${field}Error`).textContent = message;
    document.getElementById(field).setAttribute("aria-invalid", "true");
}


function validateForm() {

    clearErrors();

    let isValid = true;

    if (!titleInput.value.trim()) {
        showError("title", "Please enter a task title.");
        isValid = false;
    }

    if (!assigneeInput.value.trim()) {
        showError("assignee", "Please enter an assignee name.");
        isValid = false;
    }

    if (!VALID_PRIORITIES.includes(priorityInput.value)) {
        showError("priority", "Please select a valid priority.");
        isValid = false;
    }

    const dueDate = dueDateInput.value;

    if (!dueDate) {
        showError("dueDate", "Please select a due date.");
        isValid = false;

    } else {
        const dateParts = dueDate.split("-").map(Number);

        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        const selectedDate = new Date(year, month - 1, day);

        const validDate =
            /^\d{4}-\d{2}-\d{2}$/.test(dueDate) &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month - 1 &&
            selectedDate.getDate() === day;

        if (!validDate) {
            showError("dueDate", "Please enter a valid date.");
            isValid = false;
        }
    }

    if (!VALID_STATUSES.includes(statusInput.value)) {
        isValid = false;
        alert("Please select a valid task status.");
    }

    return isValid;
}


// 13. RESET FORM

function resetForm() {

    taskForm.reset();

    editingTaskId = null;

    clearErrors();

    document.getElementById("formHeading").textContent =
        "Create New Task";

    submitButton.textContent = "Create Task";

    cancelButton.hidden = false;

    dueDateInput.min = "";
}

// 14. CREATE OR UPDATE TASK

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const taskData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        assignee: assigneeInput.value.trim(),
        priority: priorityInput.value,
        dueDate: dueDateInput.value,
        status: statusInput.value
    };

    if (editingTaskId) {

        const taskIndex = tasks.findIndex(task =>
            task.id === editingTaskId
        );

        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                ...taskData
            };
        }

    } else {

        const newTask = {
            id: createId(),
            ...taskData
        };

        tasks.push(newTask);
    }

    saveTasks();
    refreshDashboard();
    resetForm();
});

// 15. EDIT, DELETE AND CHANGE STATUS
// Event delegation handles task card actions.

taskList.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;
    const taskId = button.dataset.id;

    const task = tasks.find(item => item.id === taskId);

    if (!task) return;

    
if (action === "edit") {

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        alert("Task not found.");
        return;
    }

    // Open the form
    formSection.hidden = false;

    // Fill the form with existing task details
    editingTaskId = taskId;
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    assigneeInput.value = task.assignee;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;
    statusInput.value = task.status;

    // Change form heading and button text
    document.getElementById("formHeading").textContent =
        "Edit Training Task";

    submitButton.textContent = "Update Task";
    cancelButton.hidden = false;

    clearErrors();

    // Open the form visibly
    formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    titleInput.focus();
}


    if (action === "delete") {

        const confirmed = confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmed) return;

        tasks = tasks.filter(item => item.id !== taskId);

        saveTasks();
        refreshDashboard();

        if (editingTaskId === taskId) {
            resetForm();
        }
    }
});

// Status changes are handled separately using change event.

taskList.addEventListener("change", function(event) {

    if (event.target.dataset.action !== "status") return;

    const taskId = event.target.dataset.id;
    const newStatus = event.target.value;

    if (!VALID_STATUSES.includes(newStatus)) return;

    const task = tasks.find(item => item.id === taskId);

    if (!task) return;

    task.status = newStatus;

    saveTasks();
    refreshDashboard();
});

// 16. SEARCH AND FILTERS

searchInput.addEventListener("input", renderTasks);

statusFilter.addEventListener("change", renderTasks);

priorityFilter.addEventListener("change", renderTasks);

// 17. CLEAR FILTERS

clearFiltersButton.addEventListener("click", function() {

    searchInput.value = "";
    statusFilter.value = "";
    priorityFilter.value = "";

    renderTasks();
});

// 18. CANCEL EDITING


cancelButton.addEventListener("click", function() {

    // Clear all form fields
    resetForm();

    // Hide the complete form section
    formSection.hidden = true;

    // Return sidebar selection to Dashboard
    sidebarButtons.forEach(item => {
        item.classList.remove("active");
    });

    document.querySelector('[data-view="dashboard"]')
        .classList.add("active");

});

// 19. CREATE NEW TASK BUTTON

addTaskButton.addEventListener("click", function() {

    resetForm();
    formSection.hidden = false;

    // Activate Create Task in sidebar
    sidebarButtons.forEach(item => {
        item.classList.remove("active");
    });

    document.getElementById("sidebarCreateTask")
        .classList.add("active");

    formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    titleInput.focus();
});

// 20. CLEAR VALIDATION ERRORS WHILE TYPING

["title", "assignee", "priority", "dueDate"].forEach(field => {

    document.getElementById(field).addEventListener(
        "input",
        function() {
            document.getElementById(`${field}Error`).textContent = "";
            this.removeAttribute("aria-invalid");
        }
    );

    document.getElementById(field).addEventListener(
        "change",
        function() {
            document.getElementById(`${field}Error`).textContent = "";
            this.removeAttribute("aria-invalid");
        }
    );
});

// 21. INITIALIZE DASHBOARD

loadTasks();
refreshDashboard();

console.log("Training Task Dashboard is ready!");

// SIDEBAR NAVIGATION

const sidebarButtons = document.querySelectorAll(".nav-item");

sidebarButtons.forEach(button => {

    button.addEventListener("click", function() {

        // CREATE TASK MENU
        if (this.id === "sidebarCreateTask") {

            resetForm();
            formSection.hidden = false;

            formSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            titleInput.focus();
            return;
        }

        // CHANGE ACTIVE MENU
        sidebarButtons.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        // SELECT DASHBOARD VIEW
        currentView = this.dataset.view;

        // Reset search and filters when changing menu
        searchInput.value = "";
        statusFilter.value = "";
        priorityFilter.value = "";

        // Close form when navigating elsewhere
        resetForm();
        formSection.hidden = true;

        renderTasks();

        // Scroll to the relevant section
        if (currentView === "dashboard") {
            document.getElementById("dashboard").scrollIntoView({
                behavior: "smooth"
            });
        } else {
            document.getElementById("tasks").scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});
