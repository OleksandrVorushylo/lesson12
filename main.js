'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

// const todoData = [
//   {
//     value: 'Сварить кофе',
//     completed: false
//   },
//   {
//     value: 'Помыть посуду',
//     completed: true
//   }
// ];

let todoData = [];
    if (localStorage.getItem('todoData') !== null) {

    todoData = JSON.parse(localStorage.getItem("todoData"));
    }

const render = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

    if(item.completed){
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    
    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });
    localStorage.setItem("todoData", JSON.stringify(todoData));
  });
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  todoData.push(newTodo);
   if (headerInput.value === '') {
          todoData.pull(newTodo);
        } else {
          todoData.push(newTodo);
        }
        // headerInput.value = '';
  render();
});

render();