import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Axios for API calls

const TaskForm = ({ selectedDate }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const res = await axios.get(`http://localhost:5000/tasks?date=${dateStr}`);
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newTask = {
        title: title.trim(),
        date: selectedDate.toISOString().split('T')[0],
        completed: false,
      };
      await axios.post('http://localhost:5000/tasks', newTask);
      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this task?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating completion status:', error);
    }
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: editTitle,
      });
      setEditingId(null);
      setEditTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="task-button">Add</button>
      </form>

      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />
              {editingId === task.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => handleEditSave(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <button onClick={() => {
                    setEditingId(task.id);
                    setEditTitle(task.title);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
