import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import "./MiddleWare.css";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";
const BookTable = () => {
  const [getValue, SetValue] = useState({
    date: "",
    time: "",
    username: "",
    phone: "",
    total: "",
    type: "users",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const sendData = async (Values) => {
    try {
      const response = await axios.post("https://apis-8gnd.onrender.com/booktable", Values);
      if (response.data.status === "success") {
        toast.success(response.data.msg || "Table booked successfully!");
        // Clear form after successful booking
        SetValue({
          date: "",
          time: "",
          username: "",
          phone: "",
          total: "",
          type: "users",
        });
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const takeValue = { ...getValue };
    takeValue[e.target.name] = e.target.value;
    SetValue({ ...takeValue });
  };

  const handleDateSelect = (selectedDate) => {
    SetValue({ ...getValue, date: selectedDate });
    setShowDatePicker(false);
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      
      days.push({
        day,
        date: date.toISOString().split('T')[0],
        isToday,
        isPast
      });
    }
    
    return days;
  };

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!getValue.date || !getValue.username || !getValue.phone || !getValue.time || !getValue.total) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Phone number validation (Egyptian format)
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(getValue.phone)) {
      toast.error("Please enter a valid Egyptian phone number");
      return;
    }

    // Username validation (at least 3 characters)
    if (getValue.username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    // If all validations pass, send the data
    sendData(getValue);
  };
  return (
    <div>
      <div className="parent-booktable">
        <div className="container-booktable">
          <div className="card">
            <div className="text">
              <h3 className="h3">Book A Table</h3>
              <p className="p">
                We consider all the drivers of change gives you the components
                you need to change to create a truly happens.
              </p>
            </div>
          </div>
          <div className="card">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.8864894567!2d78.267959!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1709569529556!5m2!1sen!2sin" 
                    title="Whisk & Roll Location - Hyderabad, Telangana"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="container-form">
              {/* New Line */}
              <div className="box-input">
                <div className="content-input" ref={datePickerRef} style={{ position: 'relative' }}>
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={getValue.date}
                    onChange={handleChange}
                    placeholder="Select a date"
                    readOnly
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    style={{ cursor: 'pointer' }}
                  />
                  <FaCalendarAlt 
                    style={{ 
                      position: 'absolute', 
                      right: '20px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#A0A0A0',
                      zIndex: 2
                    }}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  />
                  {showDatePicker && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: '#2a2a2a',
                      border: '1px solid #D4AF37',
                      borderRadius: '8px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      zIndex: 9999,
                      padding: '15px',
                      marginTop: '5px',
                      minWidth: '280px'
                    }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gap: '8px',
                      textAlign: 'center'
                    }}>
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} style={{ 
                          fontWeight: 'bold', 
                          padding: '8px', 
                          fontSize: '12px',
                          color: '#D4AF37',
                          borderBottom: '1px solid #444'
                        }}>
                          {day}
                        </div>
                      ))}
                      {generateCalendarDays().map((day, index) => (
                        <div
                          key={index}
                          onClick={() => day && !day.isPast && handleDateSelect(day.date)}
                          style={{
                            padding: '10px 8px',
                            cursor: day && !day.isPast ? 'pointer' : 'default',
                            backgroundColor: day?.isToday ? '#D4AF37' : 'transparent',
                            color: day?.isToday ? '#000' : day?.isPast ? '#666' : '#EDEDED',
                            borderRadius: '6px',
                            fontSize: '14px',
                            opacity: day ? 1 : 0,
                            transition: 'all 0.2s ease',
                            border: day?.isToday ? '2px solid #D4AF37' : 'none',
                            fontWeight: day?.isToday ? 'bold' : 'normal'
                          }}
                          onMouseEnter={(e) => {
                            if (day && !day.isPast) {
                              e.target.style.backgroundColor = day?.isToday ? '#D4AF37' : '#444';
                              e.target.style.transform = 'scale(1.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (day && !day.isPast) {
                              e.target.style.backgroundColor = day?.isToday ? '#D4AF37' : 'transparent';
                              e.target.style.transform = 'scale(1)';
                            }
                          }}
                        >
                          {day?.day || ''}
                        </div>
                      ))}
                    </div>
                    <div style={{
                      textAlign: 'center',
                      marginTop: '10px',
                      paddingTop: '10px',
                      borderTop: '1px solid #444',
                      color: '#A0A0A0',
                      fontSize: '12px'
                    }}>
                      Click any future date to select
                    </div>
                  </div>
                )}
                </div>
                <div className="content-input">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={getValue.time}
                    onChange={handleChange}
                    placeholder="06:30 PM"
                  />
                </div>
              </div>
              {/* New Line */}
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="name">UserName</label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    value={getValue.username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={getValue.phone}
                    onChange={handleChange}
                    placeholder="x-xxx-xxx-xxxx"
                  />
                </div>
              </div>
              {/* New Line */}
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="total">Total</label>
                  <input
                    type="text"
                    name="total"
                    id="total"
                    value={getValue.total}
                    onChange={handleChange}
                    placeholder="1 Person"
                  />
                </div>
              </div>
              {/* New Line */}
              <button>Book A Table</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
// Bokra hb2a akaml as7ab el Value mn input we a3ml API ly tabel 3shan tb2a mothed get we post

// We b3d ma a5ls da ezbot el Form day Response

