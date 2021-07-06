import Carousel from 'react-bootstrap/Carousel';
// import "./bootstrap.min.css";
// import _carousel from "./_carousel.scss";
import './custom.scss'


export default function CarouselComp(props) {

    return (
        <div>
            
            <Carousel>
            {props.ImgUrl.map((link) => (
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={link}
                    alt="pic"
                    />
                </Carousel.Item>
            ))}
            </Carousel>



            {/* // <li key = {ind}>
            //   <img className = "h-full w-full object-fill" src={link} alt="pic" />
            // </li> */}
         
        </div>   
    );
}

