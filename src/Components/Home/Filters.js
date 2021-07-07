import "../../tailwind.css";
import React, { useState } from "react";
import Select from "react-select";
import "./styles.css";
// import Button from '@material-ui/core/Button';

export default function Filters() {
  const Genderoptions = [
    { label: "other", value: "other" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const Cityoptions = [
    { label: "Mumbai", value: "mumbai" },
    { label: "Pune", value: "pune" },
    { label: "Nagpur", value: "nagpur" },
    { label: "Delhi", value: "delhi" },
  ];

  const options = [
    { value: "student", label: "Student" },
    { value: "job", label: "Job" },
  ];

  const GenderComponent = () => <Select options={Genderoptions} />;

  const CityComponent = () => <Select options={Cityoptions} />;

  const MyComponent = () => <Select options={options} />;

  const [selected, setSelected] = useState([]);

  return (
    <div className="filter" id="divFilter">
    <div className="relative w-full px-5 border rounded-xl patternfilter pt-5">
      <center className="w-full mb-4">
        <div className="relative flex flex-col bg-cyan">
          <h1
            className="text-white text-3xl text-bold"
          >
            Filters
          </h1>
        </div>
      </center>
      <hr/>
      {/* */}
      
      {/* */}
      <div className="relative flex flex-col break-words bg-dodgerblue w-full shadow-xl rounded-lg px-10">
        <h1 className="text-white mb-2 text-lg">Filter by Gender</h1>
        <div className = "w-6/12 self-center">
          <GenderComponent />
        </div>
        <br />

        <h1>Filter by City :</h1>
        <CityComponent />
        <br />

        <h1>Filter by Profession :</h1>
        <MyComponent />
        <br />

        {/* <Button variant="contained" color="primary">
        Search
      </Button> */}
        <div className="pb-20"> </div>
      </div>
    </div>
    </div>
  );
}
