function createTask(text, checked) {
    let li = document.createElement('li');

    let taskSpan = document.createElement('span');
    taskSpan.innerText = text;

    let checkboxContainer = document.createElement("span");
    checkboxContainer.className = "checkbox-container";
    let checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    checkBox.addEventListener('click', () => {
        taskSpan.style.textDecoration = checkBox.checked ? "line-through" : "none";
        saveTask();
    });

    let delBtn = document.createElement('button');
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    delBtn.className = "delete-button";
    delBtn.addEventListener('click', () => {
        list.removeChild(li);
        saveTask();
    });

    let editBtn = document.createElement('button');
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.className = "edit-button";
    editBtn.addEventListener('click', () => {
        let editText = taskSpan.innerText;
        inp.value = editText; 
        inp.dataset.index = Array.from(list.children).indexOf(li);
    });

    let liDiv = document.createElement('div');
    let liDiv2 = document.createElement('div');

    liDiv.append(checkBox);
    liDiv.append(taskSpan);

    liDiv2.append(editBtn);
    liDiv2.append(delBtn);

    li.append(liDiv);
    li.append(liDiv2);

    list.appendChild(li);

    if (checked) {
        checkBox.checked = true;
        taskSpan.style.textDecoration = "line-through";
    }
}

function addTask() {
    let task = inp.value.trim();
    if (task == "") {
        alert("Please enter a Task.");
        return;
    }

    let index = parseInt(inp.dataset.index);
    if (!isNaN(index) && index >= 0 && index < list.children.length) {
        let editText = inp.value;
        list.children[index].querySelector('span').innerText = editText; 
        editTask(index, editText); 
        inp.value = "";
        inp.dataset.index = null; 
    } else {
        createTask(task, false);
        saveTask();
        inp.value = '';
    }
}

function saveTask() {
    let tasks = [];
    let tasklis = document.querySelectorAll('#todo-list li');
    tasklis.forEach((taskEle) => {
        task = {
            text: taskEle.querySelector('span').innerText,
            checked: taskEle.querySelector('.checkbox').checked,
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(index, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks && tasks[index]) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function onLoadTask() {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        tasks.forEach((task) => {
            createTask(task.text, task.checked);
        });
    }
}

let inp = document.querySelector("#todo-input");
let addBtn = document.querySelector("#addTask");
let list = document.querySelector("#todo-list");
let resetBtn = document.querySelector("#resetTask");

addBtn.addEventListener('click', addTask);

resetBtn.addEventListener('click', () => {
    list.innerText = "";
    localStorage.clear();
});

onLoadTask();

inp.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
