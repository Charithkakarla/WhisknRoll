import React from "react";
import Css from "./Information.module.css";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Pictures/Logo.jpg";

const Information = () => {
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <div className={Css.logo}>
            <img src={logo} alt="Whisk & Roll Logo" />
            <h3>Whisk & Roll</h3>
          </div>
          <div className={Css.icons}>
            <Link to="https://www.instagram.com/charith__kakarla/">
              <FaInstagram />
            </Link>
            <Link to="https://github.com/Charithkakarla">
              <FaGithub />
            </Link>
            <Link to="https://www.linkedin.com/in/kakarla-charith-377512295/">
              <FaLinkedinIn  />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
