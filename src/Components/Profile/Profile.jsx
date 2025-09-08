import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
const Profile = () => {
  let random = Math.floor(Math.random() * 360) + 1;
  const [DataUsers, SetDataUser] = useState();
  const { auth } = useAuth();
  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      try {
        if (!auth?.id) {
          toast.error("You must login to see your profile");
          return;
        }
        const res = await axios.get(`https://apis-8gnd.onrender.com/register/${auth.id}`);
        if (mounted) {
          SetDataUser(res.data.data);
          toast(`Welcome ${res.data.data.username} Data Is Loading Now...!`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
    return () => (mounted = false);
  }, [auth]);
  return (
    <div>
      <div className="parent-profile">
        <div className="container-profile">
          {DataUsers && (
            <div className="card-profile">
              <h1
                className="username"
                style={{ backgroundColor: `hsl(${random}, 70%, 54%)` }}
              >
                {DataUsers?.username.split("").splice(0, 1).join(" ")}
              </h1>
              <h3>{DataUsers?.username}</h3>
              <h3 className="email">{DataUsers?.email}</h3>
              <p className="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi esse aliquid doloribus ipsam architec?
              </p>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                style={{ backgroundColor: `hsl(${random}, 70%, 54%)` }}
                to="/"
                className="home"
              >
                Back To Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
