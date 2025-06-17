const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');

const tasks   = require(path.join(__dirname, 'data', 'tasks.json'));
const members = require(path.join(__dirname, 'data', 'members.json'));
const users   = require(path.join(__dirname, 'data', 'users.json'));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { id, password } = req.body;
  const user = users[id];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ id });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  res.status(201).json(req.body);
});

app.put('/api/tasks/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

app.delete('/api/tasks/:id', (req, res) => {
  res.status(204).end();
});

app.get('/api/members/:memberId', (req, res) => {
  const member = members[req.params.memberId];
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }
  res.json(member);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
