document.addEventListener("DOMContentLoaded", function () {
  loadToDoList();
  loadGoals();

  // Add To-Do
  document.getElementById('add-todo').addEventListener('click', function () {
    const todoInput = document.getElementById('todo-input').value;
    const category = document.getElementById('todo-category').value;
    if (todoInput.trim()) {
      const todoItem = { text: todoInput, category: category, completed: false };
      saveToDoList(todoItem);
      addToDoItemToDOM(todoItem);
      document.getElementById('todo-input').value = '';
    }
  });

  // Add Goal
  document.getElementById('add-goal').addEventListener('click', function () {
    const goalInput = document.getElementById('goal-input').value;
    const timeframe = document.getElementById('goal-timeframe').value;
    if (goalInput.trim()) {
      const goalItem = { text: goalInput, timeframe: timeframe, completed: false };
      saveGoal(goalItem);
      addGoalItemToDOM(goalItem);
      document.getElementById('goal-input').value = '';
    }
  });

  // Toggle Inputs
  document.getElementById('todo-column-toggle').addEventListener('click', () => {
    document.getElementById('todo-input').classList.toggle('visible');
    document.getElementById('todo-category').classList.toggle('visible');
  });

  document.getElementById('goals-column-toggle').addEventListener('click', () => {
    document.getElementById('goal-input').classList.toggle('visible');
    document.getElementById('goal-timeframe').classList.toggle('visible');
  });

  // Storage Functions
  function saveToDoList(todoItem) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function deleteToDoItem(todoItem) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(item => item.text !== todoItem.text);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadToDoList() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addToDoItemToDOM(todo));
  }

  function saveGoal(goalItem) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goalItem);
    localStorage.setItem('goals', JSON.stringify(goals));
  }

  function deleteGoal(goalItem) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals = goals.filter(item => item.text !== goalItem.text);
    localStorage.setItem('goals', JSON.stringify(goals));
  }

  function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.forEach(goal => addGoalItemToDOM(goal));
  }

  // DOM Functions
  function addToDoItemToDOM(todoItem) {
    const todoList = document.getElementById('todo-list');
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item', `todo-${todoItem.category}`);

    const circle = document.createElement('div');
    circle.classList.add('circle');
    if (todoItem.completed) {
      circle.classList.add('filled');
      todoDiv.classList.add('completed');
    }
    circle.addEventListener('click', () => {
      circle.classList.toggle('filled');
      todoDiv.classList.toggle('completed');
      toggleCompleteStatus(todoItem.text);
    });

    const text = document.createElement('span');
    text.textContent = todoItem.text;

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
      todoDiv.remove();
      deleteToDoItem(todoItem);
    });

    const leftDiv = document.createElement('div');
    leftDiv.style.display = 'flex';
    leftDiv.style.alignItems = 'center';
    leftDiv.appendChild(circle);
    leftDiv.appendChild(text);

    todoDiv.appendChild(leftDiv);
    todoDiv.appendChild(deleteBtn);
    todoList.appendChild(todoDiv);
  }

  function toggleCompleteStatus(text) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo => {
      if (todo.text === text) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function addGoalItemToDOM(goalItem) {
    const goalList = document.getElementById('goals-list');
    const goalDiv = document.createElement('div');
    goalDiv.classList.add('goal-item', `goal-${goalItem.timeframe}`);

    if (goalItem.completed) {
      goalDiv.classList.add('completed');
    }

    const circle = document.createElement('div');
    circle.classList.add('circle');
    if (goalItem.completed) {
      circle.classList.add('filled');
    }
    circle.addEventListener('click', () => {
      circle.classList.toggle('filled');
      goalDiv.classList.toggle('completed');
      toggleGoalCompleteStatus(goalItem.text);
    });

    const text = document.createElement('span');
    text.textContent = goalItem.text;

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
      goalDiv.remove();
      deleteGoal(goalItem);
    });

    const leftDiv = document.createElement('div');
    leftDiv.style.display = 'flex';
    leftDiv.style.alignItems = 'center';
    leftDiv.appendChild(circle);
    leftDiv.appendChild(text);

    goalDiv.appendChild(leftDiv);
    goalDiv.appendChild(deleteBtn);
    goalList.appendChild(goalDiv);
  }

  function toggleGoalCompleteStatus(text) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals = goals.map(goal => {
      if (goal.text === text) {
        goal.completed = !goal.completed;
      }
      return goal;
    });
    localStorage.setItem('goals', JSON.stringify(goals));
  }

});
