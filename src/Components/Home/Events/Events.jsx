import React from "react";
import Css from "./Events.module.css";
import picture1 from "../Pictures/Caterings.jpg";
import picture2 from "../Pictures/Birthdays.jpg";
import picture3 from "../Pictures/Weddings.jpg";
import picture4 from "../Pictures/Events.jpg";
import endCaterings from "../Pictures/2ndCaterings.jpg";
import endBirthdays from "../Pictures/2ndBirthdays.jpg";
import endWeddings from "../Pictures/2ndWeddings.jpg";
import endEvents from "../Pictures/2ndEvents.jpg";
const Events = () => {
  const products = [
    {
      id: 1,
      title: "Caterings",
      des: "Professional catering services for corporate events, private parties, and special occasions. Custom menus tailored to your preferences and dietary requirements.",
      image: picture1,
      twoImage : endCaterings
    },
    {
      id: 2,
      title: "Birthdays",
      des: "Celebrate your special day with our exclusive birthday catering packages. From intimate gatherings to grand celebrations, we make every moment memorable.",
      image: picture2,
      twoImage : endBirthdays
    },
    {
      id: 3,
      title: "Weddings",
      des: "Make your wedding day perfect with our elegant wedding catering services. From traditional ceremonies to modern receptions, we create unforgettable dining experiences.",
      image: picture3,
      twoImage : endWeddings
    },
    {
      id: 4,
      title: "Events",
      des: "Comprehensive event planning and catering for all types of celebrations. From anniversaries to corporate functions, we handle every detail with precision.",
      image: picture4,
      twoImage : endEvents
    },
  ];
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.logo}>
          <h3>We also offer unique services for your events</h3>
        </div>
        <div className={Css.container}>
          {products?.map((r) => (
            <div className={Css.card} key={r.id}  data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="2"
            data-aos-offset="0">
              <div className={Css.img}>
                <img src={r.image} alt="" />
                <div className={Css.img}>
                  <img src={r.twoImage} alt="" />
                </div>
              </div>
              <div className={Css.text}>
                <h4>{r.title}</h4>
                <p>{r.des}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
