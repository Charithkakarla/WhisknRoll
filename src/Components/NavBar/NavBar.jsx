import React, { useEffect, useState } from "react";
import Css from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../Pictures/Logo.jpg";
import { FaArrowUp, FaUser } from "react-icons/fa6";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const [setClass, getClass] = useState(false);
  const Menu = () => {
    getClass(!setClass);
  };
  
  const closeMenu = () => {
    getClass(false);
  };
  const [scroll, setScroll] = useState(false);
  const eventScroll = () => {
    if (window.scrollY > 1308) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  const [DataUsers, SetDataUser] = useState();
  const [ChangeDisplay, SetChangeDisplay] = useState(false);
  const [DeleteData, SetDeleteData] = useState(true);
  const { auth, clearAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch username if we have an id from auth context
    let mounted = true;
    async function fetchUsername() {
      try {
        if (!auth?.id) {
          SetChangeDisplay(false);
          return;
        }
        const res = await axios.get(`https://apis-8gnd.onrender.com/register/${auth.id}`);
        if (mounted) {
          SetDataUser(res.data?.data?.username);
          SetChangeDisplay(true);
          SetDeleteData(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted) SetChangeDisplay(false);
      }
    }
    fetchUsername();

    // attach scroll listener and cleanup
    window.addEventListener("scroll", eventScroll);
    return () => {
      mounted = false;
      window.removeEventListener("scroll", eventScroll);
    };
  }, [auth]);

  const RemoveData = () => {
    clearAuth();
    SetDeleteData(true);
    SetChangeDisplay(false);
    navigate("/");
  };
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
            <Link className={ChangeDisplay ? Css.showProfile : Css.hidex} to="profile">
              <h1> {DataUsers?.split("").splice(0, 1).join(" ")}</h1>
            </Link>
            <Link to="login" className={`${Css.register} ${ ChangeDisplay ? Css.hidex : Css.showProfile}`} onClick={() => window.scrollTo(0, 100)}>
              <FaUser />
            </Link>
            <Link onClick={() => RemoveData()} className={`${Css.out} ${ DeleteData ? Css.hidex : Css.showProfile}`}>
              <IoIosLogOut />
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

