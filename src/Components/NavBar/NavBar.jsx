import React, { useEffect, useState } from "react";
import Css from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../Pictures/Logo.jpg";
import { FaArrowUp, FaUser } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import ProfileDropdown from "../Auth/ProfileDropdown";
const NavBar = () => {
  const [setClass, getClass] = useState(false);
  const Menu = () => {
    getClass(!setClass);
  };
  
  const closeMenu = () => {
    getClass(false);
  };
  const [scroll, setScroll] = useState(false);
  const [ChangeDisplay, SetChangeDisplay] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      SetChangeDisplay(true);
    } else {
      SetChangeDisplay(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // window.onload = refresh;
  return (
    <div>
      <header>
        <nav>
          <div className={Css.img}>
            <img src={logo} alt="" />
            <h3>Whisk & Roll</h3>
          </div>
          <ul className={`${Css.hide} ${setClass ? Css.show : ""}`}>
            <li>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to="about" onClick={closeMenu}>About</NavLink>
            </li>
            <li>
              <NavLink to="menu" onClick={closeMenu}>Menu</NavLink>
            </li>
            <li>
              <NavLink to="pages" onClick={closeMenu}>Pages</NavLink>
            </li>
          </ul>
          <div className={Css.icon}>
            <Link to="booktable">Book A Table</Link>
            <ProfileDropdown />
            <Link to="login" className={`${Css.register} ${ ChangeDisplay ? Css.hidex : Css.showProfile}`} onClick={() => window.scrollTo(0, 100)}>
              <FaUser />
            </Link>
          </div>
          <div className={Css.icons}>
            <div className={Css.menu}>
              <button onClick={() => Menu()}>
                <AiOutlineMenu />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div className={`${Css.top} ${scroll ? Css.showScroll : ""}`}>
        <button onClick={() => window.scrollTo(0, 0)}>
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

