import React from "react";
import "../../tailwind.css";
import './patternCss.css';
import Description from "../../Pages/Description";
import { Link , Route } from 'react-router-dom'
export default function Card(props) {
  const imgStyle = {
    height: '275px',
    width: "300px",
  };
  let tempurl = "/Description/" + props.pid;

  return (
    <>
    <Link to={tempurl}>
      <div className="relative flex flex-row break-words bg-white w-full mb-8 shadow-3xl hover:shadow-lg rounded-lg border-t-8 border-bluenav p-4 pattern">
        <div className="h-full">
          <img
            //src="https://picsum.photos/id/1000/600/500"
            src = {props.ImgUrl[0]}
            alt="pic"
            className="object-fit rounded-lg"
            style={imgStyle}
          ></img>
        </div>
        <div className="relative h-full flex flex-col w-full px-14">
          <div className="self-center text-2xl font-bold mb-4  ">
            {props.firstname + " " +props.lastname + ", " + props.age}
          </div>
          <div className="relative justify-between flex flex-row font-semibold mb-2">
            <div className = "mr-14">
              <span className="text-muted text-gray-400 mr-2 uppercase text-sm">Area{"  "}</span>
              <span className = "text-lg ">{props.addressline1}</span>
            </div>
            <div>
              <span className="text-muted text-gray-400 mr-2 uppercase text-sm">City{"  "}</span>
              <span className = "">{props.city}</span>
            </div>
          </div>
          <div className = "self-start font-semibold mb-3">
            <span className="text-muted text-gray-400 mr-2 uppercase text-sm">Organization</span>
            <span className = "text-lg ">{props.Institution}</span>
          </div>
          <div className = "self-start font-semibold mb-3">
            <span className="text-muted text-gray-400 mr-2 uppercase text-sm">Profession</span>
            <span className = "text-lg ">{props.profession}</span>
          </div>
          <hr className="mb-2"/>
          <div className="relative justify-between flex flex-row font-semibold mb-7">
            <div className = "mr-14">
              <span className="text-muted text-gray-400 mr-2 uppercase text-sm">Gender</span>
              <span className = "text-lg ">{props.gender}</span>
            </div>
            <div>
              <span className="text-muted text-gray-400 mr-2 uppercase text-sm">Vacancy</span>
              <span className = "">{props.vacancy}</span>
            </div>
          </div>
          <div className = "self-start font-semibold mb-3">
            <span className="text-muted text-gray-400 uppercase text-sm mr-5">Rent</span>
            <span className = "text-2xl text-blue-500"><i className="fas fa-rupee-sign mr-2"></i>{props.rent}</span>
          </div>
        </div>
      </div>
      </Link>
    </>
  );
}
