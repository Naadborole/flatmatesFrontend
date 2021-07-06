import "./stackedCards.css";
import stackedCards from "./stackedCards";
import React, { useEffect, useState } from "react";


export default function ImageCarousel(props) {

  //const [tempImgUrl, settempImgUrl] = useState([]);
  // const imgArr = props.value.ImgUrl;
  console.log("propsImgUrl",props.ImgUrl)
  // console.log("imgArr",imgArr);

  // const timepass = async () => {
  //   await settempImgUrl(props.ImgUrl);
  // }

  useEffect(() => {
    // timepass();
    const stackedCard = new stackedCards({
      selector: ".images",
      layout: "slide",
      transformOrigin: "center",
      maxHieght: 200,
    });

    stackedCard.draw()
    // setTimeout(stackedCard.draw(),10000);
  }, []);

  let count = 0;

  return (
    <div>
      <script src="stackedCards.js"></script> 
      <div className="images stacked-cards stacked-cards-slide">
        <ul>
          {/*tempImgUrl*/props.ImgUrl.map((link, ind) => (
            <li key = {ind}>
              <img className = "h-full w-full object-fill" src={link} alt="pic" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
