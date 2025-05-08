const todoList = JSON.parse(localStorage.getItem('todoList')) || []; // charge la liste des tâches depuis localStorage ou initialise un tableau vide si aucune donnée n'est trouvée.

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button> 
    `;
    todoListHTML += html;
  });

  

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        saveTodoList();
        renderTodoList();
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '') {
    alert('Please fill up Your name');
    return; // Arrête l'exécution si le champ est vide
  }

  if (dueDate === '') {
    alert('Please fill up The date');
    return; // Arrête l'exécution si le champ est vide
  }

  todoList.push({ name, dueDate });

  saveTodoList();

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}

function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList)); // vous verez que cette fonction est juste definie en bas car elle a deja ete appeler a plusieurs reprise en haut, la raison est que En JavaScript, les fonctions déclarées avec le mot-clé function sont hoistées (levées). Cela signifie que leur définition est déplacée en haut de leur portée (scope) par le moteur JavaScript, avant l'exécution du code. Ainsi, vous pouvez appeler une fonction définie avec function même avant sa déclaration dans le fichier.
}

