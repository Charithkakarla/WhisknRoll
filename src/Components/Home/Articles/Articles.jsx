import React from "react";
import Css from "./Articles.module.css";
import picture1 from "../Pictures/burgar.jpg";
import picture2 from "../Pictures/botatos.jpg";
import picture3 from "../Pictures/chicken.jpg";
import picture4 from "../Pictures/cake.jpg";
import picture5 from "../Pictures/Beza.jpg";
import { Link } from "react-router-dom";
const Articles = () => {
  const product = [
    {
      id: 1,
      title:
        "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
      descraption:
        "Unlock the secrets to mouth-watering burgers and pizzas: use fresh, high-quality ingredients, season your patties just before grilling, and let your dough rise slowly for the perfect crust. Always cook on high heat for a crispy outside and juicy inside. Don’t forget to rest your meat and use a pizza stone for that authentic flavor!",
      image: picture1,
      month: "February 12, 2025",
    },
  ];
  const newProducts = [
    {
      id: 1,
      month: "March 8, 2025",
      title: "How to prepare the perfect french fries in an air fryer",
      image: picture2,
    },
    {
      id: 2,
      month: "April 15, 2025",
      title: "How to prepare delicious chicken tenders",
      image: picture3,
    },
    {
      id: 3,
      month: "June 21, 2025",
      title: "7 delicious cheesecake recipes you can prepare",
      image: picture4,
    },
    {
      id: 4,
      month: "October 2, 2025",
      title: "5 great pizza restaurants you should visit this city",
      image: picture5,
    },
  ];
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.paragraph}>
          <h3>Our Blog & Articles</h3>
          <Link to="/pages" onClick={()=>window.scrollTo(0,0)}>Read All Articles</Link>
        </div>
        <div className={Css.container}>
          {product?.map((r) => (
            <div className={Css.card} key={r.id}>
              <div className={Css.img}>
                <img src={r.image} alt="" />
              </div>
              <div className={Css.text}>
                <p>{r.month}</p>
                <h3>{r.title}</h3>
                <p>{r.descraption}</p>
              </div>
            </div>
          ))}

          <div className={Css.card}>
            {newProducts?.map((r) => (
              <div className={Css.cards} key={r.id} data-aos="fade-left">
                <div className={Css.imgs}>
                  <img src={r.image} alt="" />
                </div>
                <div className={Css.texts}>
                  <p>{r.month}</p>
                  <h3>{r.title}</h3>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
