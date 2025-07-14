// src/components/CalendarView.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styles

const CalendarView = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate);  // pass selected date to parent
  };

  return (
    <div style={{ maxWidth: '350px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>📅 Select a Date</h2>
      <Calendar
        onChange={handleChange}
        value={date}
        calendarType="US"
      />
    </div>
  );
};

export default CalendarView;
