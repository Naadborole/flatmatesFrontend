import axios from "axios";
import React , {useState} from "react";
import { useEffect } from "react";
import ImgCompForUpdate from "../Components/ImgCompForUpdate";
import app from "../firebase";
import Select from "react-select";
import {ValidateSignupData} from "../Shared/Validation/validation2";
import { useHistory } from 'react-router';
import "../tailwind.css";

export default function UpdatePost(props) {

    // console.log("hii")
    // console.log("mai huu props",props.location.state.data);
    const [data, setData] = useState(props.location.state.data);

    useEffect(()=>{
        console.log("data",data);
    },[data]);

    const [gender , setGender] = useState(data.gender);
    const [vacancy , setVacancy] = useState(data.vacancy);
    const [firstname, setfirstname] = useState(data.firstname);
    const [lastname, setlastname] = useState(data.lastname);
    const [description, setDescription] = useState(data.description);
    const [city, setCity] = useState(data.city);
    const [addressline1, setAddressline1] = useState(data.addressline1);
    const [addressline2, setAddressline2] = useState('');
    const [rent, setRent] = useState(data.rent);
    const [profession, setProfession] = useState(data.profession);
    const [postalCode, setpostalCode] = useState(data.postalCode);
    const [STATE, setSTATE] = useState(data.state);

    const Genderoptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "other", value: "other" },
    ];

    const [fileUrl, setFileUrl] = useState(data.ImgUrl);

    const [token, settoken] = useState("");

    let history = useHistory();

    useEffect(()=>{
        console.log("fileurl in update post",fileUrl);
    },[fileUrl]);

    const updation = async () => {

        let obj = {
          //first_name: firstname,
          //last_name: lastname,
          gender: gender,
          //postalCode: postalCode,
          //area: addressline1,
          //addressline: addressline2,
          vacancy: vacancy,
          rent: rent,
          profession: profession,
          description: description,
        };
        console.log(obj);
        
        const check = ValidateSignupData(obj);

        if(!check.valid)
        {
          let str ="";
          console.log("In check", check);

          if(check.errors.vacancy != null)
            document.getElementById("vacancy").style.display = "initial";
            //str+=check.errors.email + "\n";

          if(check.errors.rent != null)
            document.getElementById("rent").style.display = "initial";
            // str+=check.errors.password + "\n";
            
          if(check.errors.profession != null)
            document.getElementById("profession").style.display = "initial";
            // str+=check.errors.MobileNumber;
            

          // if(check.errors.first_name != null){
          //   document.getElementById("firstname").style.display = "initial";
          //   console.log("inside firstname")
          // }

          // if(check.errors.last_name != null)
          //   document.getElementById("lastname").style.display = "initial";

          if(check.errors.description != null)
            document.getElementById("description").style.display = "initial";

          if(check.errors.gender != null)
            document.getElementById("gender").style.display = "initial";

          // if(check.errors.postalCode != null)
          //   document.getElementById("length6").style.display = "initial";
          
          // if(check.errors.area != null)
          //   document.getElementById("area").style.display = "initial";

          // if(check.errors.addressline != null)
          //   document.getElementById("addrline").style.display = "initial";

          if(str !== null && str!== "" /*&& str!== "undefined"*/){
            alert(str);
          }
          return;
        }
        const token = await app.auth().currentUser.getIdToken(true);
        settoken(token);

        const res = await axios.put("http://localhost:5000/user/updatePost", {
            firstname : firstname,
            lastname : lastname,
            gender : gender,
            vacancy : vacancy,
            description : description,
            city : city,
            addressline1 : addressline1,
            rent : rent,
            profession : profession,
            // token : token,
            pid : data.pid
        })
        .then(res =>{
            alert(res.data);
            history.push('/MyPost');
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


    return(
        <div className="container mx-auto px-4 py-10 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="relative rounded-t flex mb-0 px-6 py-6 self-center">
                  <div className="relative text-center">
                    <h6 className="text-blueGray-700 text-5xl uppercase font-semibold">
                      Edit Post
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                  <form>
                    <h6 className="text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase">
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
                            defaultValue={data.firstname}
                            onChange={(e)=>{setfirstname(e.target.value)}}
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
                            onChange={(e)=>{setlastname(e.target.value)}}
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
                            Vacancy
                          </label>
                          <input
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.vacancy}
                            onChange={(e)=>{setVacancy(e.target.value)}}
                            onKeyUp={()=>{removeWarning("vacancy")}}
                          />
                          <label
                            id="vacancy"
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

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Rent
                          </label>
                          <input
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.rent}
                            onChange={(e)=>{setRent(e.target.value)}}
                            onKeyUp={()=>{removeWarning("rent")}}
                           />
                           <label
                            id="rent"
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
                            Profession
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.profession}
                            onChange={(e)=>{setProfession(e.target.value)}}
                            onKeyUp={()=>{removeWarning("profession")}}
                          />
                          <label
                            id="profession"
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
                            Address line 1
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.addressline1}
                            onChange={(e)=>{setAddressline1(e.target.value)}}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Address line 2
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.addressline2}
                            onChange={(e)=>{setAddressline2(e.target.value)}}
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
                            City
                          </label>
                          <input
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
                            onChange={(e)=>{setpostalCode(e.target.value)}}
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
                            State
                          </label>
                          <input
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
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Description
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            >
                            Description
                            </label>
                            <textarea
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.description}
                            rows="4"
                            onChange={(e)=>{setDescription(e.target.value)}}
                            onKeyUp={()=>{removeWarning("description")}}
                            ></textarea>
                            <label
                            id="description"
                            style={{color : "red" , fontSize : "12px" , display : "none"}}
                            >
                            *This field should not be empty!
                            </label>
                        </div>
                        </div>
                    </div>
                    <br />
                    <div className="w-full lg:w-full px-4">
                        <div className="relative w-full mb-3">
                            <ImgCompForUpdate data={data} />  
                        </div>
                    </div>

                    <center>
                      <div className="text-center mt-6 w-6/12 self-center">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={updation}
                        >
                          Edit Post
                        </button>
                      </div>
                    </center>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
    
}

