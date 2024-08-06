document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            toggleTask(e.target.parentElement.parentElement);
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement);
        }
    });
});

function addTask(task) {
    const li = document.createElement('li');

    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'checkbox-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkboxWrapper.appendChild(checkbox);
    
    const customCheckbox = document.createElement('span');
    customCheckbox.className = 'custom-checkbox';
    checkboxWrapper.appendChild(customCheckbox);
    
    li.appendChild(checkboxWrapper);
    li.appendChild(document.createTextNode(task));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('X'));
    deleteBtn.className = 'delete';
    li.appendChild(deleteBtn);

    document.getElementById('task-list').appendChild(li);
    saveTask(task);
}

function deleteTask(taskItem) {
    taskItem.remove();
    removeTaskFromStorage(taskItem.textContent.slice(0, -1));
}

function toggleTask(taskItem) {
    taskItem.classList.toggle('completed');
    updateTaskInStorage(taskItem.textContent.slice(0, -1), taskItem.classList.contains('completed'));
}

function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push({ task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasksFromStorage();
    tasks.forEach(function(taskObj) {
        const li = document.createElement('li');
        
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = taskObj.completed;
        checkboxWrapper.appendChild(checkbox);
        
        const customCheckbox = document.createElement('span');
        customCheckbox.className = 'custom-checkbox';
        checkboxWrapper.appendChild(customCheckbox);
        
        li.appendChild(checkboxWrapper);
        li.appendChild(document.createTextNode(taskObj.task));
        
        if (taskObj.completed) {
            li.classList.add('completed');
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('X'));
        deleteBtn.className = 'delete';
        li.appendChild(deleteBtn);
        
        document.getElementById('task-list').appendChild(li);
    });
}

function removeTaskFromStorage(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(taskObj => taskObj.task !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInStorage(task, completed) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(taskObj => taskObj.task === task ? { task, completed } : taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
