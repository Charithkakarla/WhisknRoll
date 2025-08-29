import React, { useState } from "react";
import "./style.scss";
import "./MiddleWare.css";

const BookTable = () => {
  const [getValue, setGetValue] = useState({
    date: "",
    time: "",
    people: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGetValue((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = (data) => {
    console.log("Submitting booking:", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!getValue.date || !getValue.time || !getValue.people || !getValue.name || !getValue.email || !getValue.phone) {
      alert("Please fill in all required fields.");
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
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={getValue.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={getValue.time}
                    onChange={handleChange}
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="people">People</label>
                  <input
                    type="number"
                    id="people"
                    name="people"
                    value={getValue.people}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              </div>
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={getValue.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={getValue.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="content-input">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={getValue.phone}
                    onChange={handleChange}
                    placeholder="123-456-7890"
                  />
                </div>
              </div>
              <div className="box-input">
                <div className="content-input">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={getValue.message}
                    onChange={handleChange}
                    placeholder="Any special requests?"
                    rows="4"
                  />
                </div>
              </div>
              <div className="submit">
                <button type="submit">Book Now</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;

