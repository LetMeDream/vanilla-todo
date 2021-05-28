/* Orderingcode just for once */
/* Selectors */
const input = document.querySelector('.todo-input');
const btn = document.querySelector('.todo-button');
const list = document.querySelector('.todo-list');
const filterOpt = document.querySelector('.filter-todo');
/* Array to save todos at localStorage */
let todos = ['Feed Milo', 'Take Baguira Out', 'Water Plants', 'Get to Diamond'];

getTodos();

/* Event listeners */
btn.onclick = add;
list.addEventListener('click', deleteCheck);
filterOpt.addEventListener('change', filterTodo)

/* Functions */
function add(e) {
    e.preventDefault();
    let todo = input.value;
    if(!todo){
        alert('Escribe algo primero');
    }else{
        saveToLocalStorage(todo);
        /* Creating DIV container */
        let div = document.createElement('div');
        div.setAttribute('data-localRef', todos.length-1);
        div.classList.add('todo');
        /* Creating buttons */
        let completedBtn = document.createElement('button');
        completedBtn.classList.add('completedBtn');
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        /* Creating icons */
        completedBtn.innerHTML = '<i class="fas fa-check"></i>'
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'

        /* Creating list */
        let li = document.createElement('li');
        li.classList.add('todoLi')
        let text = document.createTextNode(todo);
        /* Appending */
        li.appendChild(text);
        list.appendChild(div);
        div.append(li,completedBtn,deleteBtn)
        input.value = '';

    }
}

function deleteCheck(e){
    const item = e.target;
    /* If clicked deleteBtn */
    if(item.classList[0] === 'deleteBtn'){
        item.parentElement.classList.add('fall');

        item.parentElement.addEventListener('transitionend', ()=>{
            item.parentElement.remove();
            /* engorroso */
            let secondList = document.querySelector('.todo-list').childNodes;
            secondList.forEach((todo,i) => {
                todo.setAttribute('data-localRef', i)
            })
        });
        deleteFromLocalStorage(item.parentElement.dataset.localref);



    }
    /* If clicked completedBtn */
    if(item.classList[0] === 'completedBtn'){
        item.parentElement.classList.toggle('completed');
    }

}

function filterTodo(e){
    let todos = list.childNodes;
    todos.forEach( (todo)=>{
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }else{
                    todo.style.display = 'flex';
                }
                break;
            case 'uncompleted':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }else{
                    todo.style.display = 'flex';
                }
                break;
        }
    });

}

function saveToLocalStorage(todo){
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){

    if( (localStorage.getItem('todos')) && !todos ){
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos);
        todos.forEach( (todo, i) => {

            let div = document.createElement('div');
            div.setAttribute('data-localRef', i);
            div.classList.add('todo');
            /* Creating buttons */
            let completedBtn = document.createElement('button');
            completedBtn.classList.add('completedBtn');
            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteBtn');
            /* Creating icons */
            completedBtn.innerHTML = '<i class="fas fa-check"></i>'
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
            /* Create li */
            let li = document.createElement('li');
            li.classList.add('todoLi')
            let text = document.createTextNode(todo);
            /* Appending */
            li.appendChild(text);
            list.appendChild(div);
            div.append(li,completedBtn,deleteBtn)

        });

    }else{
        localStorage.setItem('todos', JSON.stringify(todos))
        todos.forEach( (todo, i) => {

            let div = document.createElement('div');
            div.setAttribute('data-localRef', i);
            div.classList.add('todo');
            /* Creating buttons */
            let completedBtn = document.createElement('button');
            completedBtn.classList.add('completedBtn');
            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteBtn');
            /* Creating icons */
            completedBtn.innerHTML = '<i class="fas fa-check"></i>'
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
            /* Create li */
            let li = document.createElement('li');
            li.classList.add('todoLi')
            let text = document.createTextNode(todo);
            /* Appending */
            li.appendChild(text);
            list.appendChild(div);
            div.append(li,completedBtn,deleteBtn)

        });
    }

}

function deleteFromLocalStorage(index){
    if(localStorage.getItem('todos')){
        todos.splice(index,1);
        localStorage.setItem('todos', JSON.stringify((todos)));
    }
}
