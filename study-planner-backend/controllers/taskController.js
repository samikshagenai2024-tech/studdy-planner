import fs from 'fs';
const filePath = './data/tasks.json';

function readTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

export const getTasks = (req, res) => {
  const { date } = req.query;
  const tasks = readTasks();
  if (date) {
    const filtered = tasks.filter(t => t.date === date);
    res.json(filtered);
  } else {
    res.json(tasks);
  }
};

export const addTask = (req, res) => {
  const tasks = readTasks();
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) return res.status(404).send('Task not found');
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  writeTasks(tasks);
  res.json(tasks[taskIndex]);
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id !== id);
  writeTasks(tasks);
  res.status(204).send();
};
