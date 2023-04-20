const addBtn = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoListDiv = document.getElementById('todo-list');
const alert = document.getElementById('alert');

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
      alert.innerHTML = 'You need to add todo.';
      alert.style.color = 'purple';
      alert.style.textAlign = 'center';
   }
   else {
      todoList.push({
         name: todoInput.value
      });
      alert.style.display = 'none';
   }

   todoInput.value = '';
   renderTodoList();
}

function renderTodoList() {
   let todoListHTML = '';

   todoList.forEach(todoObject => {
      const {name} = todoObject;
      const html = `
         <p class='paragraph-line'>${name}</p>
         <button class="delete">Delete</button>  
      `;
      todoListHTML += html;
   });

   todoListDiv.innerHTML = todoListHTML;

   const todoItems = todoListDiv.querySelectorAll('p');

   todoItems.forEach(item => {
      item.addEventListener('click', () => {
         item.classList.toggle('line-through');
      });
   });

   document.querySelectorAll('.delete')
       .forEach((deleteButton, index) => {
         deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
             renderTodoList();
         });
      });

   localStorage.setItem('todo', JSON.stringify(todoList));
}