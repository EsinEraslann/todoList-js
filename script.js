const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// local storage dan görevleri kontrol edip listeleme

const savedTodosJSON = localStorage.getItem("todos");
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON) : [];

for (const todo of savedTodos) {
    addTodoToList(todo);
}

// yeni görev eklemek için 
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;


    const todo = {
        id: Date.now(),
        text: todoText,
        comleted: false,
    };

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoToList(todo);
    todoInput.value = "";
}

// Tamamlanan görevi değiştirmek için
function toggleComplete(id) {
    const todo = savedTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed; // true yu fale, false yi true yap

    localStorage.setItem("todos", JSON.stringify(savedTodos));
    const todoElement = document.getElementById(id);
    todoElement.classList.toggle("completed", todo.completed);
}

// görevi düzenlemek için
function editTodo(id) {
    const todo = savedTodos.find((todo) => todo.id === id);
    const newText = prompt("görevi düzenleyin: ", todo.text);
    if (newText !== null) {
        todo.text = newText.trim();
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        const todoElement = document.getElementById(id);
        todoElement.querySelector("span").textContent = newText;
    }
}

// görevi listeden kaldırmak için
function removeTodo(id) {
    const todoElement = document.getElementById(id);
    todoElement.style.animation = "fadeOut 0.3s ease";

    setTimeout(() => {
        savedTodos.splice(
            savedTodos.findIndex((todo) => todo.id === id),
            1
        );
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        todoElement.remove();
    }, 300);
}

// listeye ekleme fonksiyonu
function addTodoToList(todo) {
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.innerHTML = `
        <span title="${todo.text}">${todo.text}</span>
        <button onclick="toggleComplete(${todo.id})"><i class="fa-solid fa-check"></i></button>
        <button onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="removeTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
    `;
    /* li.classList.toggle("completed", todo.completed); */
    todoList.appendChild(li);
}

// Enter tuşuna basıldığında ekleme yapma
todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});