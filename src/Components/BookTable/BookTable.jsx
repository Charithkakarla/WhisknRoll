import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./style.scss";
import "./MiddleWare.css";

const BookTable = () => {
  const [getValue, setGetValue] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGetValue((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitting booking:", data);

      // Prepare booking data for Firestore
      const bookingData = {
        name: data.name,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: parseInt(data.guests),
        specialRequests: data.specialRequests || "",
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date(),
        status: "confirmed" // You can add status tracking later
      };

      // Save to Firestore - this will automatically create the 'bookings' collection
      const docRef = await addDoc(collection(db, 'bookings'), bookingData);

      console.log("Booking saved with ID:", docRef.id);

      // Success message
      let message = `✅ Thank you ${data.name}!\n\nYour table has been booked for ${data.guests} guest${data.guests > 1 ? 's' : ''} on ${data.date} at ${data.time}.\n\nPhone: ${data.phone}`;

      if (data.specialRequests) {
        message += `\n\nSpecial Requests: ${data.specialRequests}`;
      }

      message += `\n\n📋 Booking ID: ${docRef.id}`;

      alert(message);

      // Reset form after successful booking
      setGetValue({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        specialRequests: "",
      });

    } catch (error) {
      console.error("Error saving booking:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Provide specific error messages based on error type
      let errorMessage = "❌ Sorry, there was an error saving your booking. ";

      if (error.code === 'permission-denied') {
        errorMessage += "Permission denied. Please check Firestore security rules.";
      } else if (error.code === 'unavailable') {
        errorMessage += "Firestore is currently unavailable. Please try again later.";
      } else if (error.code === 'deadline-exceeded') {
        errorMessage += "Request timed out. Please check your internet connection.";
      } else {
        errorMessage += "Please try again.";
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!currentUser) {
      alert("Please log in to book a table.");
      navigate("/login");
      return;
    }

    // Validate required fields with specific messages
    const missingFields = [];
    if (!getValue.name) missingFields.push("Name");
    if (!getValue.phone) missingFields.push("Phone Number");
    if (!getValue.date) missingFields.push("Booking Date");
    if (!getValue.time) missingFields.push("Booking Time");
    if (!getValue.guests) missingFields.push("Number of Guests");

    // Validate name length
    if (getValue.name.trim().length < 2) {
      alert("Please enter a valid name (at least 2 characters).");
      return;
    }

    // Validate number of guests
    const guestCount = parseInt(getValue.guests);
    if (guestCount < 1 || guestCount > 20) {
      alert("Please enter a number of guests between 1 and 20.");
      return;
    }

    // Validate booking time is reasonable (between 6 AM and 11 PM)
    const [hours, minutes] = getValue.time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes < 360 || totalMinutes > 1380) { // 6:00 AM to 11:00 PM
      alert("Please select a booking time between 6:00 AM and 11:00 PM.");
      return;
    }

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
          <form onSubmit={handleSubmit}>
            <div className="container-form">
              {!currentUser && (
                <div className="auth-notice" style={{
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  color: '#D4AF37',
                  fontWeight: '500'
                }}>
                  🔐 Please log in to book a table
                </div>
              )}
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={getValue.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={getValue.phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    required
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="date">Booking Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={getValue.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="time">Booking Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={getValue.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="guests">Number of Guests *</label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={getValue.guests}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    placeholder="4"
                    required
                  />
                </div>
              </div>
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="specialRequests">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={getValue.specialRequests}
                    onChange={handleChange}
                    placeholder="Window seat please"
                    rows="5"
                  />
                </div>
              </div>
              <div className="submit">
                <button type="submit" disabled={!currentUser}>
                  {currentUser ? "Book Now" : "Login to Book"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;

