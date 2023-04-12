const addBtn = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoListDiv = document.getElementById('todo-list');

const todoList = JSON.parse(localStorage.getItem("todo"));

if (todoList === null) {
   let newTodoList = [];
   localStorage.setItem('todo', JSON.stringify(newTodoList));
}
else {
   renderTodoList();
}

addBtn.addEventListener('click', addTodo);

function addTodo() {
   if (todoInput.value === '' || todoInput.value === " ") {
      alert('You need to add todo.');
   }
   else {
      todoList.push({
         name: todoInput.value
      });
   }

   todoInput.value = '';
   renderTodoList();
}

function renderTodoList() {
   let todoListHTML = '';

   todoList.forEach(todoObject => {
      const {name} = todoObject;
      const html = `
         <p>${name}
         <button class="delete">Delete</button> 
         <button class="edit">Edit</button>
         </p>
      `;
      todoListHTML += html;
   });

   todoListDiv.innerHTML = todoListHTML;

   document.querySelectorAll('.delete')
       .forEach((deleteButton, index) => {
         deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
             renderTodoList();
         });
      });

   localStorage.setItem('todo', JSON.stringify(todoList));
}