import React from "react";
import "./Style/AdminPannel.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
const NavBarHome = () => {
  const { auth } = useAuth();
  const username = auth?.username;
  return (
    <div>
      <div className="parent-navbar-dashbord">
        <div className="container-navbar-dashbord">
          <div className="navbar">
            <div className="card">
              <div className="text">
                <h3>Categories</h3>
              </div>
              <div className="profile">
                <div className="dark">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <h3>
                  Hello <FaLongArrowAltRight className="arrow" />
                  <span>{username}</span>
                </h3>
                <div className="img">
                  <img src="/Pictures/Logo.jpg" alt="profile" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="paragraph">
                <h1>Dashboard</h1>
                <div className="path">
                  <p>Dashboard </p>
                  <p>
                    <FaArrowRight />
                  </p>
                  <Link>Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarHome;
