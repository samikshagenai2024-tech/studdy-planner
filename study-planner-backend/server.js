import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import taskRoutes from './routes/tasks.js';

const app = express();

// Render provides PORT in environment variables
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/tasks', taskRoutes);

// -------------------
// Serve React frontend
// -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for all unknown routes (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
