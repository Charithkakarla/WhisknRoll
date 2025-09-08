import React from "react";
import Css from "./Home.module.css";
import OurMenu from "../OurMenu/OurMenu";
import HealthyFood from "../HealthyFood/HealthyFood";
import Events from "../Events/Events";
import FastFood from "../FastFood/FastFood";
import Customers from "../Customers/Customers";
import Articles from "../Articles/Articles";
import { Link } from "react-router-dom";
import TextType from "../../TextType/TextType";
const Home = () => {
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <div className={Css.card}>
            <h3>
              <TextType 
                text="Best food for your taste"
                as="span"
                typingSpeed={100}
                initialDelay={500}
                pauseDuration={3000}
                showCursor={true}
                cursorCharacter="|"
                className={Css.animatedText}
              />
            </h3>
            <p>
              Discover delectable cuisine and unforgettable moments <br />
              in our welcoming, culinary haven
            </p>
            <div className={Css.info}>
              <Link to="booktable">Book A Table</Link>
              <Link to="/menu">Explore Menu</Link>
            </div>
          </div>
        </div>
      </div>
      <OurMenu />
      <HealthyFood />
      <Events />
      <FastFood />
      <Customers />
      <Articles />
    </div>
  );
};

export default Home;
