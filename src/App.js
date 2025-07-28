import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskForm from './components/TaskForm';
import './App.css';
import bannerImg from './assets/study-banner.jpg';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // 📥 Fetch all tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // ➕ Add a new task
  const addTask = async (newTask) => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    setTasks(prev => [...prev, data]);
  };

  // ❌ Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE"
    });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // 🧠 Helper: get JS Date for a given weekday
  const getDateForDay = (day) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = selectedDate.getDay();
    const targetDayIndex = days.indexOf(day);
    const diff = targetDayIndex - currentDayIndex;
    const targetDate = new Date(selectedDate);
    targetDate.setDate(selectedDate.getDate() + diff);
    return targetDate;
  };

  // 🧹 Filter tasks by selected day
  const getTasksForDate = (date) => {
    const d = date.toISOString().split('T')[0]; // format: YYYY-MM-DD
    return tasks.filter(task => task.date === d);
  };

  return (
    <div className="glow-container">
      <div className="app-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="user-info">
              <h3>📘 Study Planner</h3>
              <p>Samiksha</p>
            </div>
            <nav>
              <ul>
                <li>Dashboard</li>
                <li className="active">Study Plan</li>
                <li>Messages</li>
                <li>Settings</li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="main-section">
          <div className="header-bar">📅 Weekly Task Dashboard</div>

          {/* Calendar & Summary */}
          <div className="top-row">
            <div className="calendar-wrapper">
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>
            <div className="summary-card">
              <h2>This Week's Plan</h2>
              <p>Select a date from the calendar and start adding tasks for the week.</p>
              <img src={bannerImg} alt="Planning illustration" />
            </div>
          </div>

          {/* Weekly Task Grid */}
          <div className="weekly-grid">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
              const date = getDateForDay(day);
              return (
                <div key={day} className="day-column">
                  <h3>{day}</h3>
                  <TaskForm
                    selectedDate={date}
                    tasks={getTasksForDate(date)}
                    onAddTask={addTask}
                    onDeleteTask={deleteTask}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
