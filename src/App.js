// App.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDateForDay = (day) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = selectedDate.getDay(); // 0 (Sun) to 6 (Sat)
    const targetDayIndex = days.indexOf(day);

    const diff = targetDayIndex - currentDayIndex;
    const targetDate = new Date(selectedDate);
    targetDate.setDate(selectedDate.getDate() + diff);
    return targetDate;
  };

  return (
    <div className="app-wrapper">
      <aside className="sidebar">
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
      </aside>

      <main className="main-section">
        <div className="top-row">
          <div className="calendar-wrapper">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
            />
          </div>
          <div className="summary-card">
            <h2>This Week's Plan</h2>
            <p>Select a date from the calendar and start adding tasks for the week.</p>
          </div>
        </div>

        <div className="weekly-grid">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <div key={day} className="day-column">
              <h3>{day}</h3>
              <TaskForm selectedDate={getDateForDay(day)} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
