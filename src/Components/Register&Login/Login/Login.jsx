import React, { useState } from "react";
import Css from "./Login.module.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Home from "../../Home/Home/Home";
import { useAuth } from "../../../contexts/AuthContext";
const Login = () => {
  const [TakeValue, SetTakeValue] = useState({
    email: "",
    password: "",
    type: "users",
  });
  const Navigate = useNavigate();
  const { setAuthData } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("https://nodejs-project-agsz.onrender.com/users/login", TakeValue);
        // assume backend returns user info; set context accordingly
        const data = res?.data || {};
        setAuthData({ type: data.type || "User", username: data.username || TakeValue.email });
        toast.success("Login successfully");
        Navigate("/");
        return;
      } catch (err) {
        console.log(err);
        const msg = err?.response?.data?.message || err?.message || "Login failed";
        toast.error(msg);
      }
  }
  const handleChange = (e) => {
    const Validation = { ...TakeValue };
    Validation[e.target.name] = e.target.value;
    SetTakeValue({ ...Validation });
  };
  return (
    <div className={Css.bar}>
      <div className={`${Css.parent}`}>
        <div className={Css.container}>
          <form onSubmit={handleSubmit}>
            <div className={Css.logo}>
              <Link>
                <FaRegUserCircle />
              </Link>
            </div>
            <div className={Css.logo}>
              <h3>User Login</h3>
            </div>
            <div className={Css.login}>
              <label htmlFor="email">
                <CgMail />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Address your email"
              />
            </div>
            <div className={Css.login}>
              <label htmlFor="password">
                <RiLockPasswordLine />
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                id="password"
                placeholder="Password"
              />
            </div>
            <div className={Css.create}>
              <Link to="/register" onClick={()=>window.scrollTo(0,100)}>Create New Account?</Link>
            </div>
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

