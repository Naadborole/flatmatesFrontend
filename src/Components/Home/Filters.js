import "../../tailwind.css";
import React, { useState , useEffect, useRef} from "react";
import Select from "react-select";
import "./styles.css";
import "../../assets/styles/button.css";
import axios from 'axios';
import ReactLoading from "react-loading";
// import Button from '@material-ui/core/Button';


export default function Filters(props) {
  
  const Genderoptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "other", value: "other" },
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
  const [tempdata, settempData] = useState([]);
  const [Cityoptions,setCityoptions] = useState([]);
  const [AllAreaoptions,setAllAreaoptions] = useState([]);
  const [pending, setPending] = useState(true);
  const [areaValue, setareaValue] = useState('');
  const [genderValue, setgenderValue] = useState('');
  const [rentValue, setrentValue] = useState('');
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
      fetchdata();
      console.log("piyush")
  },[]);

  useEffect(() => {
    setfilteredData(filteredData => [...filteredData, ...data])
  }, [data]);

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
    //setfilteredData(res.data);
    settempData(res.data);
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
    setareaValue('');
  }

  if (pending) {
    return  (
        <center><ReactLoading
          type={"spokes"}
          color={"#00008B"}
          height={30}
          width={30}
        /></center>
      );
  }
  

  const GenderComponent = () => <Select onChange={(e)=>{setgenderValue(e.value)}} options={Genderoptions} value={Genderoptions.filter(function(option) {
    return option.value === genderValue;
  })}/>;

  const CityComponent = () => <Select  onChange={handlechange} options={Cityoptions} value={Cityoptions.filter(function(option) {
    return option.value === cityvalue;
  })}/>;

  // const MyComponent = () => <Select options={Rentoptions} />;

  const AreaComponent = () => <Select onChange={(e)=>{setareaValue(e.value)}} options={AllAreaoptions} value={AllAreaoptions.filter(function(option) {
    return option.value === areaValue;
  })}/>;

  //const [selected, setSelected] = useState([]);


  const checkallvalues = async () => {
    console.log("city : ",cityvalue);
    console.log("area : ",areaValue);
    console.log("gender : ",genderValue);
    console.log("rent : ",rentValue);

    if(cityvalue !== "")
    {
      filteredData.forEach(doc => {
        const index = filteredData.indexOf(doc);
        if(doc.city !== cityvalue)
          filteredData[index] = {};
      })
    }
    if(areaValue !== "")
    {
      filteredData.forEach(doc => {
        const index = filteredData.indexOf(doc);
        if(doc.addressline1 !== areaValue)
          filteredData[index] = {};
      })
    }
    if(genderValue !== "")
    {
      filteredData.forEach(doc => {
        const index = filteredData.indexOf(doc);
        if(doc.gender !== genderValue)
          filteredData[index] = {};
      })
    }
    if(rentValue !== "")
    {
      // console.log("filtereddata first",JSON.stringify(filteredData));
      filteredData.forEach(doc => {
        const tp = doc.rent;
        console.log(tp);
        switch(rentValue)
        {
          case "range1" :
            const index = filteredData.indexOf(doc);
            if(tp >= 3000)
            {
              if (index > -1) 
              filteredData[index] = {};
            }
            break;
          case "range2" :
            const index2 = filteredData.indexOf(doc);
            if(tp < 3000 || tp >= 5000)
            {
              if (index2 > -1) 
              filteredData[index2] = {};
            }
            break;
          case "range3" :
            const index3 = filteredData.indexOf(doc);
            if(tp < 5000 || tp >= 7000)
            {
              if (index3 > -1) 
              filteredData[index3] = {};
            }
            break;
          case "range4" :
            const index4 = filteredData.indexOf(doc);
            console.log("index4",index4);
            if(tp < 7000 || tp >= 10000)
            {
              console.log("shende delete?",doc.rent);
              if (index4 > -1) 
                filteredData[index4] = {};
            }
            break;
          case "range5" :
            const index5 = filteredData.indexOf(doc);
            if(tp < 10000)
            {
              if (index5 > -1) 
              filteredData[index5] = {};
            }
            break;
          default :
            break;
        }
      })
    }
    if(cityvalue === "" && areaValue === "" && genderValue === "" && rentValue === "")
    {
      alert("Please select any filter!")
    }
    console.log("filtered Data in filters.js: ", filteredData);
    const finallyfiltered = filteredData.filter(value => Object.keys(value).length !== 0);
    props.getfilteredData(finallyfiltered);
    filteredData.length = 0;
    setfilteredData(filtereData => [...filteredData, ...data])
    if(finallyfiltered.length === 0)
    {
        alert("No matched details found")
    }
    console.log("in fetch data");
    // fetchdata();
  }

  const refreshPage = () => {
    window.location.reload();
  }



  

  return (
    <div className="filter" id="divFilter">
    <div className="relative w-full px-5 border rounded-xl patternfilter pt-5">
      <center className="w-full mb-4">
        <div className="relative flex flex-col bg-cyan">
          <h1
            className="text-black text-3xl text-bold"
          >
            <span Style="margin-left : 0"> Filters </span>
            <i class="fas fa-filter"></i>
          </h1>
          
        </div>
      </center>
      <hr/>
      <br />
      <br />

      <div className="relative flex flex-col break-words bg-dodgerblue w-full shadow-xl rounded-lg px-10">

        <h1 className="text-black mb-2 text-lg">Filter by City :</h1>
        <CityComponent />
        <br />


        {/* <h1 className="text-black mb-2 text-lg">Filter by Profession :</h1>
        <MyComponent />
        <br /> */}

        <h1 className="text-black mb-2 text-lg">Filter by Area :</h1>
        <AreaComponent />
        <br />

        <h1 className="text-black mb-2 text-lg">Filter by Gender</h1>
        <div className = "w-full self-center">
          <GenderComponent />
        </div>
        <br />

        <h1 className="text-black mb-2 text-lg">Rent :</h1>
        <div className = "w-full self-center" onChange={(e) => setrentValue(e.target.value)}>
          <input type="radio" id="r1" name="r" value="range1"/>
          <label for="r1"> less than 3000</label><br/>
          <input type="radio" id="r2" name="r" value="range2"/>
          <label for="r2"> 3000-5000</label><br/>
          <input type="radio" id="r3" name="r" value="range3"/>
          <label for="r3"> 5000-7000</label><br/>
          <input type="radio" id="r4" name="r" value="range4"/>
          <label for="r4"> 7000-10000</label><br/>
          <input type="radio" id="r5" name="r" value="range5"/>
          <label for="r5"> more than 10000</label><br/>
        </div>
        <br />
        <hr />
        <br />
        <center>
          <button className="button button2" onClick={() => checkallvalues()}>Apply</button>
          <button className="button button2" onClick={() => refreshPage()}>
            <i Style="font-size:24px" className="fa">&#xf021;</i>
          </button>
        </center>
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

