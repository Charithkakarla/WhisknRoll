import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaEnvelope, FaPhone, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDropdown.css";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMenuItemClick = (action) => {
    setIsOpen(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'changePicture':
        // Handle profile picture change
        alert('Profile picture change functionality coming soon!');
        break;
      case 'editEmail':
        // Handle email edit
        alert('Email edit functionality coming soon!');
        break;
      case 'editPhone':
        // Handle phone edit
        alert('Phone edit functionality coming soon!');
        break;
      default:
        break;
    }
  };

  if (!currentUser) return null;

  const firstLetter = currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile menu"
      >
        <div className="profile-avatar">
          {firstLetter}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="user-avatar-small">{firstLetter}</div>
              <div className="user-details">
                <div className="user-email">{currentUser.email}</div>
                <div className="user-status">Verified User</div>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-items">
            <button
              className="dropdown-item"
              onClick={() => handleMenuItemClick('profile')}
            >
              <FaUser className="dropdown-icon" />
              <span>View Profile</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleMenuItemClick('changePicture')}
            >
              <FaCamera className="dropdown-icon" />
              <span>Change Profile Picture</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleMenuItemClick('editEmail')}
            >
              <FaEnvelope className="dropdown-icon" />
              <span>Edit Email</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleMenuItemClick('editPhone')}
            >
              <FaPhone className="dropdown-icon" />
              <span>Edit Phone Number</span>
            </button>
          </div>

          <div className="dropdown-divider"></div>

          <button
            className="dropdown-item logout-item"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="dropdown-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
