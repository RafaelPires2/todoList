'use strict';  

const dataBase = [
    {'tarefa': 'Estudar JS', 'status': ''},
    {'tarefa': 'Fazer vídeo YT', 'status': 'checked'},
    {'tarefa': 'Fazer Almoço', 'status': 'checked'}
 
]


const createItem = (tarefa, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo-item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}/>
        <div>${tarefa}</div>
        <input class="btn" type="button" value="X" data-index=${index}/>
    `
    document.querySelector('#todoList').appendChild(item);
}
const clearTarefas = () => {
    const todoList = document.querySelector('#todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const addItem = (event) => {
    const tecla = event.key;
    const text = event.target.value;
     if(tecla === 'Enter') {
        dataBase.push({'tarefa': text, 'status': ''})
        event.target.value = ""
        refresh();
     }
}
const clickItem = (event) => {
    const element = event.target;
    console.log(element)
}

document.querySelector('#newItem').addEventListener('keypress', addItem);
document.querySelector('#todoList').addEventListener('click', clickItem);




const refresh = () => {
    clearTarefas();
    dataBase.forEach( (item, index) => createItem(item.tarefa, item.status, index));
}

refresh()
