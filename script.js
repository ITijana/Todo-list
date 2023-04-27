const addBtn = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoListDiv = document.getElementById('todo-list');
const alert = document.getElementById('alert');

alert.hidden = true;

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
      alert.hidden = false;
      alert.style.color = 'purple';
      alert.style.textAlign = 'center';
   }
   else {
      todoList.push({
         name: todoInput.value,
         lineThrough: false
      });
      alert.hidden = true;
   }
   todoInput.value = '';
   renderTodoList();
}

function renderTodoList() {
   let todoListHTML = '';

   todoList.forEach(todoObject => {
      const {name, lineThrough} = todoObject;
      let html;
      if (lineThrough) {
         html = `
         <div class='todo-div'>
            <p class='paragraph-line line-through'>${name}</p>
            <button class="delete">x</button>  
         </div>
         `;
         todoListHTML += html;
      }
      else {
         html = `
         <div class='todo-div'>
            <p class='paragraph-line'>${name}</p>
            <button class="delete">x</button>  
         </div>
         `;
         todoListHTML += html;
      }
   });

   todoListDiv.innerHTML = todoListHTML;

   document.querySelectorAll('.delete')
      .forEach((deleteButton, index) => {
         deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
         });
      });
      
   const todoItems = todoListDiv.querySelectorAll('p');

   localStorage.setItem('todo', JSON.stringify(todoList));

   todoItems.forEach(item => {
      item.addEventListener('click', () => {
         item.classList.toggle('line-through');
         todoList.forEach(e => {
            if (e.name === item.innerHTML) {
               e.lineThrough = !e.lineThrough;
            }
         });
      });  
   });
}
