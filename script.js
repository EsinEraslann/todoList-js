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
    const todoText = todoInput.value.trim(); // solundaki ve sağındaki boşlukları yok et
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
    const todoElement = document.getElementBy