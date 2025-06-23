// module imports & setup
const express    = require('express'); // framework for routes/handlers
const cors       = require('cors'); // middleware to allow cross-origin requests
const bodyParser = require('body-parser'); // parses JSON request bodies for req.body
const path       = require('path'); // building filesystem paths
const fs         = require('fs').promises; // file system API so we can await reads/writes

const DATA_PATH  = path.join(__dirname, 'data', 'tasks.json'); // path to tasks data file (our "database")
const members    = require(path.join(__dirname, 'data', 'members.json')); // path to members data file (employees)
const users      = require(path.join(__dirname, 'data', 'users.json')); // path to users data file (for auth services)

// create express app instance and configure middleware cors for requests
const app = express();
app.use(cors());
app.use((req, res, next) => { // prints incoming request methods + URLs
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(bodyParser.json()); // parses JSON request bodies into req.body

// Helpers to load and update/save tasks to tasks.json using fs.promises
async function loadTasks() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}
async function saveTasks(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
}

// Authentication endpoint, checks id password against users object, data is static in users.json
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;
  const user = users[id];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ id });
});

// list all tasks using tasks object
app.get('/api/tasks', async (req, res) => {
  const tasks = await loadTasks();
  res.json(tasks);
});

// get one task by ID using find function
app.get('/api/tasks/:id', async (req, res) => {
  const tasks = await loadTasks();
  const task  = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// create a new task, assigns a unique ID using Date.now() and gets request body
// creates a new task object and appends it to tasks array and saves it with saveTasks
app.post('/api/tasks', async (req, res) => {
  const tasks   = await loadTasks();
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  await saveTasks(tasks);
  res.status(201).json(newTask);
});

// update an existing task by ID using findIndex to locate it
// merges existing task with request body using spread operator
app.put('/api/tasks/:id', async (req, res) => {
  const tasks = await loadTasks();
  const idx   = tasks.findIndex(t => t.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Task not found' });
  tasks[idx] = { ...tasks[idx], ...req.body };
  await saveTasks(tasks);
  res.json(tasks[idx]);
});

// delete a task by ID using filter to remove it from tasks array, saveaTasks to update
app.delete('/api/tasks/:id', async (req, res) => {
  const tasks    = await loadTasks();
  const filtered = tasks.filter(t => t.id !== req.params.id);
  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }
  await saveTasks(filtered);
  res.status(204).end();
});

// member lookup by ID using members object, data is static in members.json
app.get('/api/members/:memberId', (req, res) => {
  const member = members[req.params.memberId];
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

// sets up the server to listen for incoming requests using app.listen()
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
