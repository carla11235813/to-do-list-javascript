// Seleção de elementos--------------
const formToDo = document.querySelector("#form-todo");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form-container");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterBtn = document.querySelector("#filter-select");
const searchInput = document.querySelector("#search-input");
const removeSearchBtn = document.querySelector("#btn-delete");

//vou usar pra esconder
const formAdd = document.querySelector("#form-add");
const toolBar = document.querySelector("#toolbar-container");
const toDoListContainer = document.querySelector("#todo-list-container")

let oldInputValue;


// Funções---------------------------
// Função para adicionar e salvar tarefa
const saveToDo = (text) => {
    const toDoCard = document.createElement("div");
    toDoCard.classList.add("todo-card");

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDoCard.appendChild(doneBtn);

    const toDoTitle = document.createElement("h3");
    toDoTitle.innerHTML = text;
    toDoCard.appendChild(toDoTitle);

    const btns = document.createElement("div");
    btns.classList.add("btns");
    toDoCard.appendChild(btns);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    btns.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    btns.appendChild(removeBtn);

    todoList.appendChild(toDoCard);

    todoInput.value = "";
    console.log(toDoCard);
}

//Função para esconder formulário e mostrar outro
const toggleForms = () => {
    toolBar.classList.toggle("hide");
    formAdd.classList.toggle("hide");
    toDoListContainer.classList.toggle("hide");

    editForm.classList.toggle("hide");
}

//Função para atualizar tarefa
const updateToDo = (newToDoTitle) => {
    const allToDos = document.querySelectorAll(".todo-card");
    console.log(allToDos);

    allToDos.forEach((todo) => {

        let toDoTitle = todo.querySelector("h3")

        console.log(toDoTitle);

        if (toDoTitle.innerText === oldInputValue) {
            toDoTitle.innerText = newToDoTitle;

            console.log(toDoTitle);

        }
    })
}

// Função de filtar
const filterTodos = (filterValue) => {
    const allToDos = document.querySelectorAll(".todo-card")

    switch(filterValue) {
        case "all":
            allToDos.forEach((toDo) => (toDo.style.display = "flex"));

            break;

        case "done":
            allToDos.forEach((toDo) => 
                toDo.classList.contains("done")
                ? (toDo.style.display = "flex")
                : (toDo.style.display = "none")
            );

            break;
        
        case "todo":
            allToDos.forEach((toDo) => 
                !toDo.classList.contains("done")
                ? (toDo.style.display = "flex")
                : (toDo.style.display = "none")
            );

            break;

        default:
            break;
    }
};


// Função de pesquisa
const getSearchedTodos = (search) => {
    const allToDos = document.querySelectorAll(".todo-card");
  
    allToDos.forEach((toDo) => {
      const todoTitle = toDo.querySelector("h3").innerText.toLowerCase();
  
      toDo.style.display = "flex";
  
      console.log(todoTitle);
  
      if (!todoTitle.includes(search)) {
        toDo.style.display = "none";
      }
    });
  };


// Eventos---------------------------
// evento pra adicionar tarefa
formToDo.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveToDo(inputValue);
    }
})

//evento pra saber qual botão foi clicado
document.addEventListener("click", (e) => {
    //adicionando o elemento clicado numa const
    const targetEl =  e.target
    // pega o pai mais próximo desse elemento
    const parentEl = e.target.closest("div")
    const parentEl2 = parentEl ? parentEl.parentNode : null;
    let toDoTitle;

    if (parentEl2 && parentEl2.querySelector("h3")) {
        toDoTitle = parentEl2.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = toDoTitle;
        console.log(editInput.value);
        oldInputValue = toDoTitle;
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl2.remove();
    }
})

//evento pra cancelar edit
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

// evento pra enviar o edit
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        //atualizar
        updateToDo(editInputValue);
    }

    toggleForms();
})

// evento de filtro
filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
})

// evento de pesquisa
searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
  
    getSearchedTodos(search);
});


// evento pra remover conteudo do search
removeSearchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    filterTodos("all")
    console.log("deu bom")
});
