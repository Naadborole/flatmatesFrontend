import Card from '../Shared/Cards/Card';
import Filters from "../Components/Home/Filters";
import "../Shared/Cards/patternCss.css"
import axios from 'axios';
import React, {useState , useEffect} from "react";
//import ReactLoading from "react-loading";

// const cardData = {
//     firstname: "Naad",
//     lastname : "Borole",
//     age: 21,
//     gender: "Male",
//     Institution: "Pune Institute of Computer Technology",
//     profession: "Student",
//     area: "Bibwewadi",
//     city: "Pune",
//     rent: 15000,
//     vacancy: 2
//   }


export default function Home() {

  const [cardData, setCardData] = useState([]);
  const [pending, setPending] = useState(true);
  // console.log("Aniket");

  const fetchdata = async () => {
      const res = await axios.get("http://localhost:5000/user/getAllPost")
      setCardData(res.data);
      setPending(false);
  }  
  
  useEffect( () => {
    fetchdata();
  }, []);

  const getfilteredData = (data) => {
    console.log("data",data)
    setCardData(data);
  }

  // useEffect(() => {
  //   console.log("pending done!");
  // },[pending]);

  useEffect(()=>{
    console.log("filtered data changed");
    console.log("card data changed :",cardData);
  },[cardData]);
  
  // if (pending) {
  //   return  (
  //       <center><ReactLoading
  //         type={"spokes"}
  //         color={"#00008B"}
  //         height={30}
  //         width={30}
  //       /></center>
  //     );
  // }

  return (
    <div>
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header> */}
      <main className="bg-transparent">
        <div className="w-full py-6 mt-5 px-5 flex flex-row">
          <div className="realtive sm:w-8/12 w-full">
            {cardData.map((data) => (
                <Card {...data}></Card>
              )
            )}

            {/* // <Card {...cardData}></Card>
            // <Card {...cardData}></Card>
            // <Card {...cardData}></Card>
            // <Card {...cardData}></Card> */}

          </div>
          <div className="relative w-full sm:w-4/12 ml-5">
            <Filters getfilteredData = {getfilteredData}></Filters>
          </div>
        </div>
      </main>
    </div>
  );
}
