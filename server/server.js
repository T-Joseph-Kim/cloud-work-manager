const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const AWS        = require('aws-sdk');
require('dotenv').config();

// ===== AWS Setup =====
AWS.config.update({
  accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:          process.env.AWS_REGION
});

const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB.DocumentClient();

const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const TASKS_TABLE = process.env.DYNAMO_TABLE_NAME;

const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(bodyParser.json());

// ===== Helpers =====
async function fetchJSONFromS3(key) {
  const data = await s3.getObject({ Bucket: BUCKET_NAME, Key: key }).promise();
  return JSON.parse(data.Body.toString('utf-8'));
}

// ===== Health Check Root Route =====
app.get('/', (req, res) => {
  res.send('Server is healthy and running.');
});

// ===== Login (users.json in S3) =====
app.post('/api/login', async (req, res) => {
  try {
    const users = await fetchJSONFromS3('data/users.json');
    const { id, password } = req.body;
    const user = users[id];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== Member lookup (members.json in S3) =====
app.get('/api/members/:memberId', async (req, res) => {
  try {
    const members = await fetchJSONFromS3('data/members.json');
    const member = members[req.params.memberId];
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Member fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all members from S3
app.get('/api/members', async (req, res) => {
  try {
    const members = await fetchJSONFromS3('data/members.json');
    res.json(members);
  } catch (err) {
    console.error('Error fetching members list:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// ===== Task CRUD (DynamoDB) =====

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await dynamo.scan({ TableName: TASKS_TABLE }).promise();
    res.json(result.Items || []);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET task by ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const result = await dynamo.get({
      TableName: TASKS_TABLE,
      Key: { id: req.params.id }
    }).promise();
    if (!result.Item) return res.status(404).json({ error: 'Task not found' });
    res.json(result.Item);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new task
app.post('/api/tasks', async (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  try {
    await dynamo.put({
      TableName: TASKS_TABLE,
      Item: newTask
    }).promise();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updateExpr = [];
    const exprNames = {};
    const exprValues = {};
    for (const [key, value] of Object.entries(req.body)) {
      updateExpr.push(`#${key} = :${key}`);
      exprNames[`#${key}`] = key;
      exprValues[`:${key}`] = value;
    }

    const result = await dynamo.update({
      TableName: TASKS_TABLE,
      Key: { id: req.params.id },
      UpdateExpression: `SET ${updateExpr.join(', ')}`,
      ExpressionAttributeNames: exprNames,
      ExpressionAttributeValues: exprValues,
      ReturnValues: 'ALL_NEW'
    }).promise();

    res.json(result.Attributes);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await dynamo.delete({
      TableName: TASKS_TABLE,
      Key: { id: req.params.id }
    }).promise();
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
