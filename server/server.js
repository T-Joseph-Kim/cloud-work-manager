// server.js
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs').promises;

const DATA_PATH  = path.join(__dirname, 'data', 'tasks.json');
const members    = require(path.join(__dirname, 'data', 'members.json'));
const users      = require(path.join(__dirname, 'data', 'users.json'));

const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(bodyParser.json());

// helper to load & save tasks.json
async function loadTasks() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}
async function saveTasks(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
}

// auth
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;
  const user = users[id];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ id });
});

// list all
app.get('/api/tasks', async (req, res) => {
  const tasks = await loadTasks();
  res.json(tasks);
});

// get one
app.get('/api/tasks/:id', async (req, res) => {
  const tasks = await loadTasks();
  const task  = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// create
app.post('/api/tasks', async (req, res) => {
  const tasks   = await loadTasks();
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  await saveTasks(tasks);
  res.status(201).json(newTask);
});

// update
app.put('/api/tasks/:id', async (req, res) => {
  const tasks = await loadTasks();
  const idx   = tasks.findIndex(t => t.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Task not found' });
  tasks[idx] = { ...tasks[idx], ...req.body };
  await saveTasks(tasks);
  res.json(tasks[idx]);
});

// delete
app.delete('/api/tasks/:id', async (req, res) => {
  const tasks    = await loadTasks();
  const filtered = tasks.filter(t => t.id !== req.params.id);
  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }
  await saveTasks(filtered);
  res.status(204).end();
});

// member lookup
app.get('/api/members/:memberId', (req, res) => {
  const member = members[req.params.memberId];
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
