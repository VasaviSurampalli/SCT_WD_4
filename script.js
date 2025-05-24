const form = document.getElementById('task-form');
const list = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const save = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  render();
};

const render = () => {
  list.innerHTML = tasks.length === 0 ? '<li>No tasks yet</li>' : tasks.map((t, i) => `
    <li class="${t.completed ? 'completed' : ''}">
      <div>
        <strong>${t.text}</strong><br/>
        <small>${t.date}</small>
      </div>
      <div>
        <button onclick="toggle(${i})">${t.completed ? 'Undo' : 'Done'}</button>
        <button onclick="edit(${i})">Edit</button>
        <button onclick="remove(${i})">Delete</button>
      </div>
    </li>
  `).join('');
};

// Expose functions globally so inline onclick handlers work:
window.toggle = i => {
  tasks[i].completed = !tasks[i].completed;
  save();
};

window.edit = i => {
  const newText = prompt("Edit task:", tasks[i].text);
  if (newText) {
    tasks[i].text = newText;
    save();
  }
};

window.remove = i => {
  tasks.splice(i, 1);
  save();
};

form.onsubmit = e => {
  e.preventDefault();
  const text = form['task-input'].value.trim();
  const date = form['task-date'].value;
  if (text && date) tasks.push({ text, date, completed: false });
  form.reset();
  save();
};

render();
