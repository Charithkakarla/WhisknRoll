import React from "react";
import "./BookingConfirmation.scss";

const BookingConfirmation = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="booking-confirmation-overlay">
      <div className="booking-confirmation-modal">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h2>Booking Confirmed!</h2>
          <p className="success-message">
            Thank you! Your table reservation has been successfully confirmed.
          </p>
        </div>

        <div className="booking-details">
          <div className="detail-card">
            <div className="detail-row">
              <span className="label">👤 Guest Name:</span>
              <span className="value">{bookingDetails.name}</span>
            </div>
            
            <div className="detail-row">
              <span className="label">📞 Phone:</span>
              <span className="value">{bookingDetails.phone}</span>
            </div>
            
            <div className="detail-row">
              <span className="label">📅 Date:</span>
              <span className="value">{formatDate(bookingDetails.date)}</span>
            </div>
            
            <div className="detail-row">
              <span className="label">🕒 Time:</span>
              <span className="value">{formatTime(bookingDetails.time)}</span>
            </div>
            
            <div className="detail-row">
              <span className="label">👥 Guests:</span>
              <span className="value">
                {bookingDetails.guests} {bookingDetails.guests > 1 ? 'guests' : 'guest'}
              </span>
            </div>

            {bookingDetails.specialRequests && (
              <div className="detail-row">
                <span className="label">📝 Special Requests:</span>
                <span className="value special-requests">{bookingDetails.specialRequests}</span>
              </div>
            )}
            
            <div className="detail-row booking-id">
              <span className="label">📋 Booking ID:</span>
              <span className="value booking-id-value">{bookingDetails.bookingId}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-footer">
          <div className="restaurant-info">
            <p><strong>Whisk & Roll</strong></p>
            <p>📍 Banjara Hills, Hyderabad</p>
            <p>📞 +91 9876543210</p>
          </div>
          
          <div className="action-buttons">
            <button className="btn-primary" onClick={onClose}>
              Continue Browsing
            </button>
          </div>
        </div>

        <div className="confirmation-note">
          <p>
            <strong>Note:</strong> Please arrive 10 minutes before your scheduled time. 
            For any changes or cancellations, please call us at least 2 hours in advance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
