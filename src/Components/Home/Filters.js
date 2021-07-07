import "../../tailwind.css";
import React, { useState , useEffect, useRef} from "react";
import Select from "react-select";
import "./styles.css";
import "../../assets/styles/button.css";
import axios from 'axios';
// import Button from '@material-ui/core/Button';


export default function Filters() {
  
  const Genderoptions = [
    { label: "other", value: "other" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const Rentoptions = [
    { value: "less than 3000", label: "less than 3000" },
    { value: "3000-5000", label: "3000-5000" },
    { value: "5000-7000", label: "5000-7000" },
    { value: "7000-10000", label: "7000-10000" },
    { value: "more than 10000", label: "more than 10000" },
  ];

  const [cityvalue, setcityvalue] = useState('');
  const [data, setData] = useState([]);
  const [Cityoptions,setCityoptions] = useState([]);
  const [AllAreaoptions,setAllAreaoptions] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
      fetchdata();
      console.log("piyush")
  },[]);

  useEffect(() => {
    console.log("city",Cityoptions);
    console.log("CityOptions rendered")
  }, [Cityoptions]);

  useEffect(() => {
    console.log("area",AllAreaoptions);
    console.log("AllAreaOptions rendered");
  },[AllAreaoptions]);

  useEffect(() => {
    console.log("pending done!");
  },[pending]);

  useEffect(() => {
    console.log("city value changes", cityvalue);
    fetcharea();
  },[cityvalue]);

  const fetchdata = async () => {
    const temp = [];
    const temp2 = [];
    const res = await axios.get("http://localhost:5000/user/getAllPost");
    console.log("res.data",res.data);
    setData(res.data);
    res.data.forEach(doc =>{
        if(temp.indexOf({ label: doc.city, value: doc.city }) === -1){
            temp.push({ label: doc.city, value: doc.city });
        }
        if(temp2.indexOf({ label: doc.addressline1, value: doc.addressline1 }) === -1){
            temp2.push({ label: doc.addressline1, value: doc.addressline1 });
        }
    })
    setCityoptions(temp);
    setAllAreaoptions(temp2);
    console.log("om");
    setPending(false);
  }

  const fetcharea = async () => {
    console.log("data",data);
    AllAreaoptions.length = 0;
    data.forEach(doc => {
        if(doc.city === cityvalue)
        {
            AllAreaoptions.push({ label: doc.addressline1, value: doc.addressline1 });
        }
    })
  }
 
  const handlechange = e => {
    console.log(e.value)
    setcityvalue(e.value);
    
  }

  if (pending) {
    return (<><div>Loading....</div></>);
  }
  

  const GenderComponent = () => <Select options={Genderoptions} />;

  const CityComponent = () => <Select  onChange={handlechange} options={Cityoptions} value={Cityoptions.filter(function(option) {
    return option.value === cityvalue;
  })}/>;

  const MyComponent = () => <Select options={Rentoptions} />;

  const AreaComponent = () => <Select options={AllAreaoptions} />;

  //const [selected, setSelected] = useState([]);


  



  

  return (
    <div className="filter" id="divFilter">
    <div className="relative w-full px-5 border rounded-xl patternfilter pt-5">
      <center className="w-full mb-4">
        <div className="relative flex flex-col bg-cyan">
          <h1
            className="text-black text-3xl text-bold"
          >
            Filters
          </h1>
        </div>
      </center>
      <hr/>
      <br />
      <br />

      <div className="relative flex flex-col break-words bg-dodgerblue w-full shadow-xl rounded-lg px-10">
        <h1 className="text-black mb-2 text-lg">Filter by Gender</h1>
        <div className = "w-full self-center">
          <GenderComponent />
        </div>
        <br />

        <h1 className="text-black mb-2 text-lg">Filter by City :</h1>
        <CityComponent />
        <br />


        <h1 className="text-black mb-2 text-lg">Filter by Profession :</h1>
        <MyComponent />
        <br />

        <h1 className="text-black mb-2 text-lg">Filter by Area :</h1>
        <AreaComponent />
        <br />

        <h1 className="text-black mb-2 text-lg">Rent :</h1>
        <div className = "w-full self-center">
        <input type="checkbox" id="r1" name="r1" value="range1"/>
        <label for="r1"> less than 3000</label><br/>
        <input type="checkbox" id="r2" name="r2" value="range2"/>
        <label for="r2"> 3000-5000</label><br/>
        <input type="checkbox" id="r3" name="r3" value="range3"/>
        <label for="r3"> 5000-7000</label><br/>
        <input type="checkbox" id="r4" name="r4" value="range4"/>
        <label for="r4"> 7000-10000</label><br/>
        <input type="checkbox" id="r5" name="r5" value="range5"/>
        <label for="r5"> more than 10000</label><br/>
        </div>
        <br />
        <hr />
        <br />
        <center><button className="button button2" >Apply</button></center>
        {/* <Button variant="contained" color="primary">
        Search
      </Button> */}
        <div className="pb-20"> </div>
      </div>
    </div>
    </div>
  );
    
}

