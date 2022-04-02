const form = document.getElementById("form");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const todosUL = document.getElementById("todos");

const Todos = JSON.parse(localStorage.getItem("todos"));

if (Todos) {
    Todos.forEach((todo) => {
        addTodo(todo);
    });
}

btn.addEventListener("click", (e) => {
    e.preventDefault();

    addTodo();
});


function addTodo(todo) {
    let todotext = input.value
    if (todo) {
        todotext = todo.text;
    }
    if (todotext) {
        //create element
        const todoEl = document.createElement('li');


        if(todo && todo.completed){
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todotext;
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
           
            
            
        });

        
        
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            todoEl.classList.add("completed");
            setInterval(() => {
                todoEl.remove()
                
                updata();
            
            }, 1000)
        })

        todosUL.appendChild(todoEl);
        updata()
    }

    input.value = "";
}
//localStorage and JSON parse
function updata() {
    const todosEl = document.querySelectorAll("li")
    const todos = []

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos))
}
