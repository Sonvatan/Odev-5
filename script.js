let todos = [];
let editIndex = null;

function renderTodos() {
    const mete = document.getElementById("mete");
    mete.innerHTML = todos
        .map(
            (todo) => `
            <div class="todo-item">
              <span>${todo.title}</span>
              <div class="actions">
                  <button onclick="editTodo('${todo.id}')">
                      <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button onclick="deleteTodo('${todo.id}')">
                      <i class="fa-solid fa-trash"></i>
                  </button>
              </div>
           </div>`
        )
        .join("");
}

function fetchTodos() {
    fetch("http://127.0.0.1:3000/getTodos")
        .then((res) => res.json())
        .then((res) => {
            todos = res.payload;
            renderTodos();
        })
        .catch((err) => {
            alert("Görevler alınamadı: " + err.message);
           
        });
}

function addTodo() {
    const newTodoInput = document.getElementById("newTodoInput");
    const newTodo = newTodoInput.value.trim();

    if (newTodo) {
        fetch("http://127.0.0.1:3000/addTodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTodo }),
        })
            .then((res) => res.json())
            .then(() => {
                fetchTodos();
            })
            .catch((err) => {
                alert("Görev eklenemedi: " + err.message);
                console.error(err);
            });
        newTodoInput.value = "";
    }
}

function deleteTodo(id) {
    fetch(`http://127.0.0.1:3000/deleteTodo/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then(() => {
            fetchTodos();
        })
        .catch((err) => {
            alert("Görev silinemedi: " + err.message);
            console.error(err);
        });
}

function editTodo(id) {
    editIndex = id;
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        document.getElementById("editInput").value = todo.title;
    }
}

function saveTodo() {
    const editInput = document.getElementById("editInput");
    const updatedTodo = editInput.value.trim();

    if (updatedTodo && editIndex) {
        fetch(`http://127.0.0.1:3000/updateTodo/${editIndex}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: updatedTodo }),
        })
            .then((res) => res.json())
            .then(() => {
                fetchTodos();
                editIndex = null;
            })
            .catch((err) => {
                alert("Görev güncellenemedi: " + err.message);
                console.error(err);
            });
    }
    editInput.value = "";
}

fetchTodos();