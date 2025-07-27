import React from "react";
import Css from "./Menu.module.css";
import { NavLink, Outlet } from "react-router-dom";
import Order from "../Order/Order";

const Menu = () => {
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <nav>
            <h3>Our Menu</h3>
            <ul className="menu">
              <li>
                <NavLink to="/menu">All</NavLink>
              </li>
              <li>
                <NavLink to="/menu/breakfast">BreakFast</NavLink>
              </li>
              <li>
                <NavLink to="/menu/dishes">Main Dishes</NavLink>
              </li>
              <li>
                <NavLink to="/menu/drink">Drinks</NavLink>
              </li>
              <li>
                <NavLink to="/menu/dessart">Desserts</NavLink>
              </li>
            </ul>
            <p style={{marginTop: '18px'}}>Browse our menu and discover something delicious for every craving!</p>
          </nav>
          <div className={Css.card}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Order />
    </div>
  );
};

export default Menu;
