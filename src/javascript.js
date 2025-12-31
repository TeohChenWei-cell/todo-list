let tasks = [];
let editIndex = null;

window.onload = function() {
    const saved = localStorage.getItem("tasks");
    if (saved) tasks = JSON.parse(saved);
    renderTasks();
};

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    if (title === "") {
        alert("Task title is required!");
        return;
    }

    if (editIndex !== null) {
        tasks[editIndex] = {
            ...tasks[editIndex],
            title,
            description,
            priority
        };
        editIndex = null;
    } else {
        tasks.push({
            title,
            description,
            priority,
            completed: false
        });
    }

    saveTasks();
    clearForm();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task priority-${task.priority} ${task.completed ? "completed" : ""}`;

        const title = document.createElement("h3");
        title.textContent = task.title;

        const desc = document.createElement("p");
        desc.textContent = task.description;

        const status = document.createElement("p");
        status.innerHTML = `<strong>Status:</strong> ${task.completed ? "Completed" : "Pending"}`;

        const priority = document.createElement("p");
        priority.innerHTML = `<strong>Priority:</strong> ${task.priority}`;

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "task-buttons";

        const btnComplete = document.createElement("button");
        btnComplete.className = "btn-complete";
        btnComplete.textContent = task.completed ? "Undo" : "Complete";
        btnComplete.onclick = () => toggleComplete(index);
        buttonDiv.appendChild(btnComplete);

        if (!task.completed) {
            const btnEdit = document.createElement("button");
            btnEdit.className = "btn-edit";
            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => editTask(index);
            buttonDiv.appendChild(btnEdit);
        }

        const btnDelete = document.createElement("button");
        btnDelete.className = "btn-delete";
        btnDelete.textContent = "Delete";
        btnDelete.onclick = () => deleteTask(index);
        buttonDiv.appendChild(btnDelete);

        taskDiv.appendChild(title);
        taskDiv.appendChild(desc);
        taskDiv.appendChild(status);
        taskDiv.appendChild(priority);
        taskDiv.appendChild(buttonDiv);

        taskList.appendChild(taskDiv);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    document.getElementById("title").value = tasks[index].title;
    document.getElementById("description").value = tasks[index].description;
    document.getElementById("priority").value = tasks[index].priority;
    editIndex = index;
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "low";
}
