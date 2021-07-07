import "./stackedCards.css";
import stackedCards from "./stackedCards";
import React, { useEffect, useState , useRef } from "react";


export default function ImageCarousel(props) {

  console.log("propsImgUrl",props.ImgUrl)

  const check = useRef(false);

  useEffect(() => {

    if(check.current)
    {
      const stackedCard = new stackedCards({
        selector: ".images",
        layout: "slide",
        transformOrigin: "center",
        maxHieght: 200,
      });
      stackedCard.draw()
    }
    else
      check.current = true;

  }, [check.current]);

  let count = 0;

  return (
    <div>
      <script src="stackedCards.js"></script> 
      <div className="images stacked-cards stacked-cards-slide">
        <ul>
          {props.ImgUrl.map((link, ind) => (
            <li key = {ind}>
              <img className = "h-full w-full object-fill" src={link} alt="pic" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
