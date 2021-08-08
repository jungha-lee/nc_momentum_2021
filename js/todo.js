const todoForm = document.getElementById('todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.getElementById('todo-list');

let todoArray = [];

function init() {
    todoForm.addEventListener('submit', onTodoSubmit);

    const todoFromStorage = localStorage.getItem("todos");
    if (todoFromStorage !== null) {
        const todoItems = JSON.parse(todoFromStorage);
        todoItems.forEach(item => todoArray.push(item));
    }
    todoArray.forEach(item => paintTodo(item)); // needed??
}

function paintTodo(todo) {
    const li = document.createElement('li');
    li.id = todo.id;
    const span = document.createElement('span');
    span.innerText = todo.name;
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '❌';
    deleteBtn.className = "toDo__button";
    deleteBtn.addEventListener("click", deleteTodo);

    li.appendChild(deleteBtn);
    li.appendChild(span);
    todoList.appendChild(li);
}

function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todoArray));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    todoList.removeChild(li);
    todoArray = todoArray.filter(item => item.id !== parseInt(li.id));
    saveTodo()
}

function onTodoSubmit(event) {
    event.preventDefault();
    const todoObj = { id: Date.now(), name: todoInput.value };
    todoArray.push(todoObj);
    saveTodo(todoInput.value);

    paintTodo(todoObj);
    todoInput.value = '';
}

init();
