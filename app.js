const content = document.getElementById('itemTitle');

function addItem() {
    if (content.value === "") {
        alert("Please add some text!");
        return;
    }
    const existingTodos = JSON.parse(localStorage.getItem("todos"));
    const contentObj = {
        content: content.value,
        _id: (Math.floor(100000 + Math.random() * 900000)).toString(),
    }
    let todos;
    if (existingTodos !== null) {
        todos = [...existingTodos, contentObj];
    } else {
        todos = [contentObj];
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    updateTodoList(localStorage.getItem("todos"));
    content.value = "";
}

function updateTodoList(todos) {
    const myList = document.getElementById("myList");

    const parsedTodos = JSON.parse(todos);

    myList.innerHTML = ""

    parsedTodos.map((todo) => {
        myList.innerHTML += `
        <li>${todo.content} <i class="fas fa-trash-alt" onclick="deleteTodo(${todo._id})"></i></li>
       `
    })
}

function deleteTodo(id) {
    const todoId = id.toString();
    const changedTodos = JSON.parse(localStorage.getItem("todos")).filter((todo) => {
        return todo._id !== todoId;
    })

    localStorage.setItem("todos", JSON.stringify(changedTodos));
    updateTodoList(localStorage.getItem("todos"));
}

window.addEventListener("load", function () {
    if (localStorage.getItem("todos") !== null) {
        updateTodoList(localStorage.getItem("todos"));
    }
})