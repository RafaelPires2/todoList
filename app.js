'use strict';  

// const dataBase = [
//    {'tarefa': 'Estudar JS', 'status': ''},
//    {'tarefa': 'Fazer vídeo YT', 'status': 'checked'},
//    {'tarefa': 'Fazer Almoço', 'status': 'checked'}
// ]

const getDB = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setDB = (dataBase) => localStorage.setItem ('todoList', JSON.stringify(dataBase))

const createItem = (tarefa, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo-item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index} >
        <div>${tarefa}</div>
        <input class="btn" type="button" value="X" data-index=${index} >
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

     if(text != "" && tecla === 'Enter') {
        const dataBase = getDB();
        dataBase.push({'tarefa': text, 'status': ''})
        setDB(dataBase);
        event.target.value = ""
        refresh();
     }
}
const updateItem = (index) => {
    const dataBase = getDB();
    dataBase[index].status = dataBase[index].status === '' ? 'checked' : '';
    setDB(dataBase);
    refresh();
}


const removeItem = (index) => {
    const dataBase = getDB();
    dataBase.splice(index, 1);
    setDB(dataBase);
    refresh();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index)
    } else {
        const index = element.dataset.index;
        updateItem(index)
    }

}



document.querySelector('#newItem').addEventListener('keypress', addItem);
document.querySelector('#todoList').addEventListener('click', clickItem);




const refresh = () => {
    clearTarefas();
    const dataBase = getDB();
    dataBase.forEach( (item, index) => createItem(item.tarefa, item.status, index));
}

refresh()
