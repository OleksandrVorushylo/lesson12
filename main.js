/* eslint-disable indent */
'use strict';

class ToDo {
	constructor(form, input, todoList, todoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
		this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));		
	}

	addToStorage() {
		localStorage.setItem('todoList',JSON.stringify([...this.todoData]))
	}

	render() {
		this.todoList.textContent = '';		
		this.todoCompleted.textContent = '';
		this.todoData.forEach(this.createItem.bind(this));
		this.addToStorage();
		this.handler();
	}

	createItem(todo) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = todo.key;
		li.insertAdjacentHTML('beforeend', `
		<span class="text-todo">${todo.value}</span>
       <div class="todo-buttons">
			 <button class="todo-remove"></button>
			 <button class="todo-complete"></button>
			 </div>
		`);
		if (todo.completed) {
			this.todoCompleted.append(li);
		} else {
			this.todoList.append(li);
		}
	}

	addTodo(event) {
		event.preventDefault();
		
		if (this.input.value === '') {
			alert('Пустую строку добавить нельзя, напишите что нибудь!');
		} else {
			if (this.input.value.trim()) {
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey()
			};
			this.input.value = '';
			this.todoData.set(newTodo.key, newTodo);
			this.render();
		} 
		}
	}

	deleteItem(elem) {
    const _this = this;
		this.todoData.forEach((item) => {		
			if (item.key === elem.key) {
				this.todoData.delete(item.key);
        document.querySelector('.todo-item').remove(item.key);
				this.addToStorage();
			}
      this.render();
		});
	}
	completedItem(elem) {				
		this.todoData.forEach(item => {
			if (item.key === elem.key) {
				item.completed = !item.completed;
				this.addToStorage();
				if (item.completed === true) {
					elem.remove();
					this.todoCompleted.append(elem);
				} else {
					elem.remove();
					this.todoList.append(elem);
				}
			}
		});
		
	}

	handler() {
		const todoItem = document.querySelectorAll('.todo-item');
		todoItem.forEach( item => {
			item.addEventListener('click', event => {
				const btn = event.target.closest('button');
				const btnClass = btn.className;
				if ( btnClass === 'todo-remove') this.deleteItem(item);
				if ( btnClass === 'todo-complete') this.completedItem(item);
			});
		});
		}


	generateKey() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.render();
	}
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
// const todoControl = document.querySelector('.todo-control'),
//       headerInput = document.querySelector('.header-input'),
//       todoList = document.querySelector('.todo-list'),
//       todoCompleted = document.querySelector('.todo-completed');

// let todoData = [];
//     if (localStorage.getItem('todoData') !== null) {

//     todoData = JSON.parse(localStorage.getItem("todoData"));
//     }

// const render = function(){
//   todoList.textContent = '';
//   todoCompleted.textContent = '';

//   todoData.forEach(function(item, index){
//     const li = document.createElement('li');
//     li.classList.add('todo-item');
//     li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
//       '<div class="todo-buttons">' +
//         '<button class="todo-remove"></button>' +
//         '<button class="todo-complete"></button>' +
//       '</div>';

//     if(item.completed){
//       todoCompleted.append(li);
//     } else {
//       todoList.append(li);
//     }
    
//     const todoComplete = li.querySelector('.todo-complete');
//                       todoComplete.addEventListener('click', function(){
//                         item.completed = !item.completed;
//                         render();
//     });
//     const TodoRemove = li.querySelector('.todo-remove');
//                   TodoRemove.addEventListener('click', function(){
//                     li.remove();
//                     todoData.splice(index, 1);
//                     localStorage.setItem("todoData", JSON.stringify(todoData));
//                     render();
//               });

//     localStorage.setItem("todoData", JSON.stringify(todoData));
//   });
// };

// todoControl.addEventListener('submit', function(event){
//   event.preventDefault();

//   const newTodo = {
//     value: headerInput.value,
//     completed: false
//   };
//   // todoData.push(newTodo);
//    if (headerInput.value === '' || headerInput.value === ' ') {
//           // todoData.pull(newTodo);
//         } else {
//           todoData.push(newTodo);
//         }
//   render();
//   headerInput.value = '';
// });

// render();