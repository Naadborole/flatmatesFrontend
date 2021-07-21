import React, { useState} from "react";
import background from "../assets/img/register_bg_2.png";
import app from "../firebase";
import axios from "axios";
import { useEffect } from "react";
import { ForgotPassword } from "../Shared/ForgotPassword";
import Select from "react-select";
import {ValidateSignupData} from "../Shared/Validation/validation2";
import { useHistory } from 'react-router';
import { useRef } from "react";

export default function MyProfile() {

    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    const [postalCode, setPostalCode] = useState(data.postalCode);
    const [STATE, setSTATE] = useState(data.state);
    const [email , setemail] = useState(data.email);
    const [password , setpassword] = useState('');
    const [firstname, setfirstname] = useState(data.firstname);
    const [lastname, setlastname] = useState(data.lastname);
    const [username, setUsername] = useState('');
    const [DOB, setDOB] = useState(data.DOB);
    const [MobileNumber, setMobileNumber] = useState(data.MobileNumber);
    const [city, setCity] = useState(data.city);
    const [addressline1, setAddressline1] = useState(data.addressline1);
    const [gender , setGender] = useState('');
    const [addressline2, setAddressline2] = useState(data.addressline2);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchdata(); 
        console.log("start")
    },[])

    useEffect(() => {
        console.log("data fetched");
        console.log(data);
        settingValues();
    },[data])
    
    useEffect(()=>{
      console.log("values changed");
    },[pending])

    const fetchdata = async () => {
      const token = await app.auth().currentUser.getIdToken(true);
      setToken(token);

      const res = await axios.post("http://localhost:5000/user/getUserbytoken", {
          token : token
      });
      console.log("res",res.data);
      setData(res.data);
      // setPending(false);
      //checking();
    };

    const settingValues = () => {
      setGender(data.gender);
      setUsername(data.username);
      setPostalCode(data.postalCode);
      setAddressline1(data.addressline1);
      setAddressline2(data.addressline2);
      setDOB(data.DOB);
      setMobileNumber(data.MobileNumber);
      setPending(false);
    }

  // useEffect(()=>{
  //   console.log("after :")
  //   checking();
  // },[username]);
  
  // const checking = () => {
  //   console.log("username",username);
  //   console.log("MobileNumber",MobileNumber);
  //   console.log("gender",gender);
  // }
  const Genderoptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "other", value: "other" },
  ];

  const check = useRef(true);

  let history = useHistory();

  useEffect(() => {
    console.log(postalCode);
    if(!check.current)
      funcName("https://api.postalpincode.in/pincode/" + postalCode);
    else  
      check.current = false;
  },[postalCode])

  const funcName = async (url) => {
    try{
      console.log("urls",url);
      const response = await axios.get(url);
      //var data = await response.json();
      console.log("city and state", response.data[0].PostOffice[0].District, response.data[0].PostOffice[0].State);
      setCity(response.data[0].PostOffice[0].District);
      setSTATE(response.data[0].PostOffice[0].State);
      document.getElementById('city12').defaultValue = response.data[0].PostOffice[0].District;
      document.getElementById('state12').defaultValue = response.data[0].PostOffice[0].State;
      if(postalCode !== undefined && postalCode.length === 6)
        document.getElementById("length6").style.display = "none";
    }
    catch(err)
    {
      console.log(err);
      if(postalCode !== undefined && postalCode.length === 6)
      {  
        if(err)
        {
          console.log("ignore err",err);
          alert("Enter correct postal code");
          document.getElementById('city12').defaultValue = "";
          document.getElementById('state12').defaultValue = "";
          setCity('');
          setSTATE('');
        }
      }
      else
      {
        console.log(postalCode.length);
        document.getElementById("length6").style.display = "initial";
        document.getElementById('city12').defaultValue = "";
        document.getElementById('state12').defaultValue = "";
        setCity('');
        setSTATE('');
      }
    }
  }


  const EditProfile = async() => {
    let obj = {
      postalCode: postalCode,
      area: addressline1,
      addressline: addressline2,
      gender: gender,
      MobileNumber: MobileNumber,
      user_name: username,
      dob: DOB
    };
    console.log(obj);
    
    const checks = ValidateSignupData(obj);

    if(!checks.valid)
    {
      let str ="";
      console.log("In check", checks);

      // if(check.errors.vacancy != null)
      //   document.getElementById("vacancy").style.display = "initial";
      //   str+=check.errors.email + "\n";

      // if(check.errors.rent != null)
      //   document.getElementById("rent").style.display = "initial";
      //   str+=check.errors.password + "\n";
        
      // if(check.errors.profession != null)
      //   document.getElementById("profession").style.display = "initial";
      //   str+=check.errors.MobileNumber;
        

      // if(check.errors.first_name != null){
      //   document.getElementById("firstname").style.display = "initial";
      //   console.log("inside firstname")
      // }

      // if(check.errors.last_name != null)
      //   document.getElementById("lastname").style.display = "initial";

      // if(check.errors.description != null)
      //   document.getElementById("description").style.display = "initial";

      if(checks.errors.gender != null)
        document.getElementById("gender").style.display = "initial";

      if(checks.errors.postalCode != null)
        document.getElementById("length6").style.display = "initial";
      
      if(checks.errors.area != null)
        document.getElementById("area").style.display = "initial";

      if(checks.errors.addressline != null)
        document.getElementById("addrline").style.display = "initial";

      if(checks.errors.user_name != null)
        document.getElementById("UserName").style.display = "initial";

      if(checks.errors.dob != null)
        document.getElementById("dob").style.display = "initial";

      if(checks.errors.MobileNumber != null)
        document.getElementById("MobileNumber").style.display = "initial";

      if(str !== null && str!== "" /*&& str!== "undefined"*/){
        alert(str);
      }
      return;
    }


    const res = await axios.put("http://localhost:5000/user/UpdateUser", {
        user : {
          //firstname : firstname,
          //lastname: lastname,
        //   email: email,
          username : username,
          DOB: DOB,
          MobileNumber: MobileNumber,
          gender: gender,
          addressline1: addressline1,
          addressline2: addressline2,
          city: city,
          postalCode: postalCode,
          state: STATE
        },
        token : token
      });
    alert(res.data);
    window.location.reload();
  }
  
//   const signup = async ()=>{

//       await app.auth().createUserWithEmailAndPassword(email , password)
//       .then((userCredential)=>{
//           // send verification mail.
//         userCredential.user.sendEmailVerification();
//         temp = userCredential.user.uid;
//         app.auth().signOut();
//         alert("Verification link has been send to your registered email-id");
//         //alert("Email sent");
//       })
//       .catch(alert);

      
//       //setUserID(temp);
//       console.log(temp);

//       await axios.post("http://localhost:5000/user/signup", {
//         user : {
//           firstname : firstname,
//           lastname: lastname,
//           email: email,
//           username : username,
//           DOB: DOB,
//           MobileNumber: MobileNumber,
//           gender: gender,
//           addressline1: addressline1,
//           addressline2: addressline2,
//           city: city,
//           postalCode: postalCode,
//           state: state,
//           country: country
//         },
//         uid : temp
//       });
//   }

const removeWarning = (id) => {
  console.log("id",id);
  if(id !== null)
    document.getElementById(id).style.display = "none";
}

const forGender = (e) => {
  setGender(e.value)
  removeWarning("gender");
}

  return (
    <>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{ backgroundImage: "url(" + background + ")" }}
        ></div>

        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="relative rounded-t flex mb-0 px-6 py-6 self-center">
                  <div className="relative text-center">
                    <h6 className="text-blueGray-700 text-5xl uppercase font-semibold">
                      My Profile
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                  <form>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      User Information
                    </h6>
                    <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.email}
                            readOnly
                            // onChange={(e)=>{setemail(e.target.value)}}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.firstname}
                            //onChange={(e)=>{setfirstname(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.lastname}
                            //onChange={(e)=>{setlastname(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.username}
                            //name="username"
                            onSelect={(e)=>{setUsername(e.target.value)}}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            onKeyUp={()=>{removeWarning("UserName")}}
                          />
                          <label
                            id="UserName"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *This field should not be empty!
                          </label>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            DOB
                          </label>
                          <input
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.DOB}
                            onChange={(e)=>{setDOB(e.target.value)}}
                            onKeyUp={()=>{removeWarning("dob")}}
                          />
                          <label
                            id="dob"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *This field should not be empty!
                          </label>
                        </div>
                      </div>
                      
                      
                      
                      {/* <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue=""
                            // onChange={(e)=>{setpassword(e.target.value)}}
                          />
                        </div>
                      </div> */}

                      
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.MobileNumber}
                            onSelect={(e)=>{setMobileNumber(e.target.value)}}
                            onChange={(e)=>{setMobileNumber(e.target.value)}}
                            onKeyUp={()=>{removeWarning("MobileNumber")}}
                          />
                          <label
                            id="MobileNumber"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *Mobile Number should be 10 digits only.
                          </label>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Gender
                          </label>
                          {/* <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.gender}
                            onChange={(e)=>{setGender(e.target.value)}}
                          /> */}
                          <Select 
                            //onChange={(e)=>{setGender(e.value)}  ()=>{removeWarning("gender")}} 
                            defaultValue={data.gender}
                            onChange={(e)=>{forGender(e)}}
                            options={Genderoptions} value={Genderoptions.filter(function(option) {return option.value === gender})} 
                           />
                          <label
                            id="gender"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *This field should not be empty!
                          </label>
                        </div>
                      </div>

                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Contact Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Area
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.addressline1}
                            onSelect={(e)=>{setAddressline1(e.target.value)}}
                            onChange={(e)=>{setAddressline1(e.target.value)}}
                            onKeyUp={()=>{removeWarning("area")}}
                          />
                          <label
                            id="area"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *This field should not be empty!
                          </label>
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Address line 
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.addressline2}
                            onSelect={(e)=>{setAddressline2(e.target.value)}}
                            onChange={(e)=>{setAddressline2(e.target.value)}}
                            onKeyUp={()=>{removeWarning("addrline")}}
                          />
                          <label
                            id="addrline"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *This field should not be empty!
                          </label>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            City
                          </label>
                          <input
                            id="city12"
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.city}
                            onChange={(e)=>{setCity(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Postal Code
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.postalCode}
                            onSelect={(e)=>{setPostalCode(e.target.value)}}
                            onChange={(e)=>{setPostalCode(e.target.value)}}
                          />
                          <label
                            id="length6"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                          >
                            *Length of postal code should be 6!
                          </label>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            State
                          </label>
                          <input
                            id="state12"
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.state}
                            onChange={(e)=>{setSTATE(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="India"
                            //onChange={(e)=>{setCountry(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <br />
                    
                    <div>
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={EditProfile}
                      >
                        Update
                      </button>
                    </div>
                    <div>
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=> ForgotPassword(data.email)}
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
