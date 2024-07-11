document.addEventListener('DOMContentLoaded', onLoad);

let todoList = [];

function onLoad() {
  let todoListStr = localStorage.getItem('todoList');
  todoList = todoListStr ? JSON.parse(todoListStr) : [];
  displayItem();
}

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let dateElement = document.querySelector('#todo-date');

  let todoDate = dateElement.value;
  let todoItem = inputElement.value;

  if (todoItem.trim() === '' || todoDate.trim() === '') {
    alert("Please fill out both the task and date fields.");
    return;
  }

  todoList.push({ item: todoItem, dueDate: todoDate });

  inputElement.value = '';
  dateElement.value = '';

  displayItem();
}

function displayItem() {
  let containerElement = document.querySelector('.todo-container');
  localStorage.setItem('todoList', JSON.stringify(todoList));

  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let { item, dueDate } = todoList[i];
    newHtml += `
      <div class="todo-item">
        <span>${item}</span>
        <span>${dueDate}</span>
        <button class="btn-delete" onclick="deleteItem(${i})">Delete</button>
      </div>
    `;
  }
  containerElement.innerHTML = newHtml;
}

function deleteItem(index) {
  todoList.splice(index, 1);
  displayItem();
}