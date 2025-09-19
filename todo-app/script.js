document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const userSelect = document.getElementById('user-select');
    const newUserInput = document.getElementById('new-user-input');
    const addUserBtn = document.getElementById('add-user-btn');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tasks = [];
    let currentUserId = localStorage.getItem('currentUserId') ? parseInt(localStorage.getItem('currentUserId')) : null;

    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function saveTasks() {
        localStorage.setItem(`tasks_${currentUserId}`, JSON.stringify(tasks));
    }

    function loadUsers() {
        renderUsers();
        if (users.length > 0 && !currentUserId) {
            currentUserId = users[0].id;
            loadTasks();
        }
    }

    function loadTasks() {
        if (!currentUserId) return;
        tasks = JSON.parse(localStorage.getItem(`tasks_${currentUserId}`)) || [];
        renderTasks();
    }

    function renderUsers() {
        userSelect.innerHTML = '';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            if (user.id === currentUserId) option.selected = true;
            userSelect.appendChild(option);
        });
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.completed ? ' completed' : '');
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="task-btn complete-btn" data-id="${task.id}">Complete</button>
                <button class="task-btn delete-btn" data-id="${task.id}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText && currentUserId) {
            const newTask = {
                id: Date.now(),
                user_id: currentUserId,
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            taskInput.value = '';
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            const taskId = parseInt(e.target.dataset.id);
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            }
        } else if (e.target.classList.contains('delete-btn')) {
            const taskId = parseInt(e.target.dataset.id);
            tasks = tasks.filter(t => t.id !== taskId);
            saveTasks();
            renderTasks();
        }
    });

    userSelect.addEventListener('change', () => {
        currentUserId = parseInt(userSelect.value);
        localStorage.setItem('currentUserId', currentUserId);
        loadTasks();
    });

    addUserBtn.addEventListener('click', () => {
        const newUserName = newUserInput.value.trim();
        if (newUserName && !users.find(u => u.name === newUserName)) {
            const newUser = {
                id: Date.now(),
                name: newUserName
            };
            users.push(newUser);
            saveUsers();
            newUserInput.value = '';
            renderUsers();
            if (!currentUserId) {
                currentUserId = newUser.id;
                localStorage.setItem('currentUserId', currentUserId);
                loadTasks();
            }
        }
    });

    newUserInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addUserBtn.click();
        }
    });

    loadUsers();
});
