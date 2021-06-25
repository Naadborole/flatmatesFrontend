import "./stackedCards.css";
import stackedCards from "./stackedCards";
import { useEffect } from "react";

export default function ImageCarousel(props) {
  const imgArr = props.imgArr;

  useEffect(() => {
    const stackedCard = new stackedCards({
      selector: ".images",
      layout: "slide",
      transformOrigin: "center",
      maxHieght: 200,
    });

    stackedCard.draw();
  }, []);

  let count = 0;

  return (
    <div>
      <script src="stackedCards.js"></script>
      <div className="images stacked-cards stacked-cards-slide">
        <ul>
          {imgArr.map((link, ind) => (
            <li key = {ind}>
              <img className = "h-full w-full object-fill" src={link} alt="pic"/ >
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
