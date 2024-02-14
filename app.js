let inp = document.querySelector("#todo-input");
let addBtn = document.querySelector("#addTask");
let list = document.querySelector("#todo-list");
let resetBtn = document.querySelector("#resetTask");

addBtn.addEventListener('click', ()=>{
    addTask();
})

resetBtn.addEventListener('click', ()=>{
    list.innerText = "";
    localStorage.clear()
})

function saveTask(){
    let tasks = [];
    let tasklis = document.querySelectorAll('#todo-list li');
    tasklis.forEach((taskEle) => {
        task = {
            text : taskEle.querySelector('span').innerText,
            checked: taskEle.querySelector('.checkbox').checked,
        }
        tasks.push(task);
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createTask(text, checked){
    let li = document.createElement('li');

    let taskSpan = document.createElement('span');
    taskSpan.innerText = text;

    let checkboxContainer = document.createElement("span");
    checkboxContainer.className = "checkbox-container";
    let checkBox = document.createElement('input')
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    checkBox.addEventListener('click', ()=>{
        taskSpan.style.textDecoration = checkBox.checked ? "line-through" : "none";
        saveTask();
        
    })

    let delBtn = document.createElement('button');
    delBtn.innerText = "Delete";
    delBtn.className = "delete-button";
    delBtn.addEventListener('click', ()=>{
        list.removeChild(li);
        saveTask();
    })

    

    li.appendChild(checkBox);
    li.appendChild(taskSpan);
    li.appendChild(delBtn);

    list.appendChild(li);

    if (checked) {
        checkBox.checked = true;
        taskSpan.style.textDecoration = "line-through";
    }

}
function addTask(){
    let task = inp.value.trim()
    if (task == ""){
        alert("Please enter a Task.");
        return;
    }

    createTask(task, false);
    saveTask();
    inp.value = '';
}

function onLoadTask(){
    let savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks)
        tasks.forEach((task) => {
            createTask(task.text, task.checked);
        })
    }
}

window.onload = () => {
    onLoadTask()
}