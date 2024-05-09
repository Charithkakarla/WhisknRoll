import React, { useState } from "react";
import Css from "./Register.module.css";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [ChangeValue, SetChangeValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
        "https://nodejs-project-agsz.onrender.com/users/register",
        ChangeValue
      );
      console.log(response.data.msg);
      // Show success message or perform other actions
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const UpdateData = { ...ChangeValue };
    UpdateData[e.target.name] = e.target.value;
    SetChangeValue({ ...UpdateData });
  };

  return (
    <div>
      <div className={Css.parent}>
        <form onSubmit={handleSubmit}>
          <div className={Css.logo}>
            <Link>
              <FaRegUserCircle />
            </Link>
          </div>
          <div className={Css.logo}>
            <h3>Create Account</h3>
          </div>
          <div className={Css.login}>
            <label htmlFor="username">
              <FaRegUser />
            </label>
            <div></div>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="UserName"
            />
            {error === "Please enter your username" && (
              <div><span className={Css.error}>{error}</span></div>
            )}
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
              {error === "Please enter your email" || error==="this user is already exist in the dataBase"&& (
              <div><span className={Css.error}>{error}</span></div>
            )}
         
          </div>
          
          <div className={Css.login}>
            <label htmlFor="password" className={Css.input}>
              <RiLockPasswordLine />
            </label>
            <div></div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              id="password"
              placeholder="password"
            />
            {console.log(error)}
            {error !== "Please enter your email" &&
            error !== "Please enter your username" && (
              <div><span className={Css.error}>{error}</span></div>
            )}
          </div>
          <div className={Css.create}>
            <Link to="/login">Already have an account?</Link>
          </div>
          <button type="submit"> Create</button>
        </form>
      </div>
    </div>
  );
};

export default Register;