import React from "react";
import Css from "./Footer.module.css";
import Picture1 from "../Pictures/ella-footer.jpg";
import Picture2 from "../Pictures/steve-footer.jpg";
import Picture3 from "../Pictures/potatos-footer.jpg";
import Picture4 from "../Pictures/ash-footer.jpg";
import logo from "../Pictures/logoFooter.jpg";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CiPhone, CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  const firstCard = [
    {
      id: 1,
      title: "Whisk & Roll",
      descrpation:
        "In the new era of technology we look a in the future with certainty and pride to for our company and.",
      icon: <FaInstagram />,
      image: logo,
    },
  ];
  const threeCard = [
    {
      id: 1,
      title: "Follow Us On Instagram",
      image: Picture1,
    },
    {
      id: 2,
      image: Picture2,
    },
    {
      id: 3,
      image: Picture3,
    },
    {
      id: 4,
      image: Picture4,
    },
  ];
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <div className={Css.card} >
            {firstCard?.map((r) => (
              <div className={Css.cards} key={r.id}>
                <div className={Css.img}>
                  <img src={logo} alt="Whisk & Roll Logo" />
                  <h3>{r.title}</h3>
                </div>
                <div className={Css.text}>
                  <p>{r.descrpation}</p>
                  <div className={Css.icons}>
                    <Link to="https://www.instagram.com/charith__kakarla/">
                      {r.icon}
                    </Link>
                    <Link to="https://github.com/Charithkakarla">
                      <FaGithub />
                    </Link>
                    <Link to="https://www.linkedin.com/in/kakarla-charith-377512295/">
                      <FaLinkedinIn />
                    </Link>
                  </div>
                  <div className={Css.contact}>
                    <div className={Css.contactItem}>
                      <CiPhone />
                      <span>+91 9876543210</span>
                    </div>
                    <div className={Css.contactItem}>
                      <CiMail />
                      <span>WhisknRoll@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={Css.card} data-aos="zoom-in">
            <div className={Css.texts}>
              <h3>Page</h3>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="about">About</Link>
              </li>
              <li>
                <Link to="menu">Menu</Link>
              </li>
              <li>
                <Link to="">Pricing</Link>
              </li>
              <li>
                <Link to="">Blog</Link>
              </li>
              
              <li>
                <Link to="">Delivery</Link>
              </li>
            </div>
            <div className={Css.texts}>
              <h3>Utility Pages</h3>
              <p>Start Here</p>
              <p>Styleguide</p>
              <p>Password Protected</p>
              <p>404 Not Found</p>
              <p>Licenses</p>
              <p>Changelog</p>
              <p>View More</p>
            </div>
          </div>
          <div className={Css.card}>
            <h3>Follow Us On Instagram</h3>
            <div className={Css.cards}>
              {threeCard?.map((r) => (
                <div className={Css.imgs} key={r.id}>
                  <img src={r.image} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <h3>
          Copyright © 2025 Whisk & Roll. All Rights Reserved By{" "}
          <span>Kakarla Charith</span>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
