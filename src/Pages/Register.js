import React, { useState , useEffect} from "react";
import background from "../assets/img/register_bg_2.png";
import app from "../firebase";
import axios from "axios";
import {ValidateSignupData} from "../Shared/Validation/validation";
import Select from "react-select";

export default function Register() {

  const [email , setemail] = useState('');
  const [password , setpassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setUsername] = useState('');
  const [DOB, setDOB] = useState('');
  const [MobileNumber, setMobileNumber] = useState(0);
  const [city, setCity] = useState('');
  const [addressline1, setAddressline1] = useState('');
  const [gender , setGender] = useState('');
  const [addressline2, setAddressline2] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [postalCode, setPostalCode] = useState('');
  const Genderoptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "other", value: "other" },
  ];
  //const [userID, setUserID] = useState('abcd');
  let temp;

  useEffect(() => {
    funcName("https://api.postalpincode.in/pincode/" + postalCode);
  },[postalCode])

  const funcName = async (url) => {
    try{
      const response = await axios.get(url);
      //var data = await response.json();
      console.log("city and state", response.data[0].PostOffice[0].District, response.data[0].PostOffice[0].State);
      setCity(response.data[0].PostOffice[0].District);
      setState(response.data[0].PostOffice[0].State);
      if(postalCode.length === 6)
        document.getElementById("length6").style.display = "none";
    }
    catch(err)
    {
      if(postalCode.length === 6)
      {  
        if(err)
        {
          console.log("ignore err",err);
          alert("Enter correct postal code");
          setCity('');
          setState('');
        }
      }
      else
      {
        console.log(postalCode.length);
        document.getElementById("length6").style.display = "initial";
        setCity('');
        setState('');
      }
    }
  }

  
  const signup = async ()=>{

      let obj = {
        email:email,
        password:password,
        MobileNumber: MobileNumber,
        first_name: firstname,
        last_name: lastname,
        user_name: username,
        dob: DOB,
        gender: gender,
        postalCode: postalCode
      };
      console.log(obj);
      
      const check = ValidateSignupData(obj);

      if(!check.valid)
      {
        let str ="";
        console.log("In check", check);

        if(check.errors.email != null)
        {
          document.getElementById("emailaddr").innerHTML = check.errors.email;
          document.getElementById("emailaddr").style.display = "initial";
          //str+=check.errors.email + "\n";
        }

        if(check.errors.password != null)
        {
          document.getElementById("passw").innerHTML = check.errors.password;
          document.getElementById("passw").style.display = "initial";
          // str+=check.errors.password + "\n";
        }
          
        if(check.errors.MobileNumber != null)
        {
          document.getElementById("mobileno").innerHTML = check.errors.MobileNumber;
          document.getElementById("mobileno").style.display = "initial";
          // str+=check.errors.MobileNumber;
        }
          

        if(check.errors.first_name != null){
          document.getElementById("firstname").style.display = "initial";
          console.log("inside firstname")
        }

        if(check.errors.last_name != null)
          document.getElementById("lastname").style.display = "initial";

        if(check.errors.user_name != null)
          document.getElementById("UserName").style.display = "initial";

        if(check.errors.dob != null)
          document.getElementById("dob").style.display = "initial";

        if(check.errors.gender != null)
          document.getElementById("gender").style.display = "initial";

        if(check.errors.postalCode != null)
          document.getElementById("length6").style.display = "initial";

        if(str !== null && str!== "" /*&& str!== "undefined"*/){
          alert(str);
        }
        return;
      }
      
      await app.auth().createUserWithEmailAndPassword(email , password)
      .then((userCredential)=>{
          // send verification mail.
        userCredential.user.sendEmailVerification();
        temp = userCredential.user.uid;
        app.auth().signOut();
        alert("Verification link has been send to your registered email-id");
        //alert("Email sent");
      })
      .catch(alert);

      
      //setUserID(temp);
      console.log(temp);

      await axios.post("http://localhost:5000/user/signup", {
        user : {
          firstname : firstname,
          lastname: lastname,
          email: email,
          username : username,
          DOB: DOB,
          MobileNumber: MobileNumber,
          gender: gender,
          addressline1: addressline1,
          addressline2: addressline2,
          city: city,
          postalCode: postalCode,
          state: state,
          country: country
        },
        uid : temp
      });
  }

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
                      Register
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                  <form>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      User Information
                    </h6>
                    <div className="flex flex-wrap">
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
                            defaultValue=""
                            onChange={(e)=>{setfirstname(e.target.value)}}
                            onKeyUp={()=>{removeWarning("firstname")}}
                            required
                          />
                          <label
                            id="firstname"
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
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue=""
                            onChange={(e)=>{setlastname(e.target.value)}}
                            onKeyUp={()=>{removeWarning("lastname")}}
                            required
                          />
                          <label
                            id="lastname"
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
                            Username
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue=""
                            name="username"
                            onChange={(e)=>{setUsername(e.target.value)}}
                            onKeyUp={()=>{removeWarning("UserName")}}
                            required
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
                            onChange={(e)=>{setDOB(e.target.value)}}
                            onSelect={()=>{removeWarning("dob")}}
                            required
                          />
                          <label
                            id="dob"
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
                            Email address
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="jesse@example.com"
                            onChange={(e)=>{setemail(e.target.value)}}
                            onKeyUp={()=>{removeWarning("emailaddr")}}
                          />
                          <label
                            id="emailaddr"
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
                            Password
                          </label>
                          <input
                            type="password"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="password"
                            onChange={(e)=>{setpassword(e.target.value)}}
                            onKeyUp={()=>{removeWarning("passw")}}
                          />
                          <label
                            id="passw"
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
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Mobile Number"
                            onChange={(e)=>{setMobileNumber(e.target.value)}}
                            onKeyUp={()=>{removeWarning("mobileno")}}
                          />
                          <label
                            id="mobileno"
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
                            Gender
                          </label>
                          {/* <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="gender"
                            onChange={(e)=>{setGender(e.target.value)}}
                            required
                          /> */}
                          <Select 
                            //onChange={(e)=>{setGender(e.value)}  ()=>{removeWarning("gender")}} 
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
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            onChange={(e)=>{setAddressline1(e.target.value)}}
                            required
                          />
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
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            onChange={(e)=>{setAddressline2(e.target.value)}}
                            required
                          />
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
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="New York"
                            //onChange={(e)=>{setCity(e.target.value)}}
                            value={city}
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
                            defaultValue=""
                            onChange={(e)=>{setPostalCode(e.target.value)}}
                            required
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
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Texas"
                            //onChange={(e)=>{setState(e.target.value)}}
                            value={state}
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
                            onChange={(e)=>{setCountry(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <br />
                    <div>
                      {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Contact Information</h6> */}
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          I agree with the Privacy Policy
                        </span>
                      </label>
                    </div>
                    <br />
                    <div>
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={signup}
                      >
                        Create Account
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
