import axios from "axios";
import React , {useState} from "react";
import { useEffect } from "react";
import ImgComp from "../Components/ImgComp";
import app from "../firebase";
import { useHistory } from 'react-router';


export default function CreatePost() {

    const [gender , setGender] = useState('');
    const [vacancy , setVacancy] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [addressline1, setAddressline1] = useState('');
    const [rent, setRent] = useState();
    const [profession, setProfession] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [STATE, setSTATE] = useState('');

    const [fileUrl, setFileUrl] = useState([]);

    const [token, settoken] = useState("");
    const [pending, setPending] = useState(true);

    let history = useHistory();

   

    useEffect( () => {
      gettoken();
      console.log("hehehehe"); 
    },[]);

    useEffect(() => {
      funcName("https://api.postalpincode.in/pincode/" + postalCode);
    },[postalCode])

    const funcName = async (url) => {
      try{
        const response = await axios.get(url);
        //var data = await response.json();
        console.log("city and state", response.data[0].PostOffice[0].District, response.data[0].PostOffice[0].State);
        setCity(response.data[0].PostOffice[0].District);
        setSTATE(response.data[0].PostOffice[0].State);
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
            setSTATE('');
          }
        }
        else
        {
          console.log(postalCode.length);
          document.getElementById("length6").style.display = "initial";
          setCity('');
          setSTATE('');
        }
      }
    }

    const getImgUrl = (data) => {
        console.log("data",data)
        setFileUrl(data);
    }

    const gettoken = async () => {
      try{
        const tokens = await app.auth().currentUser.getIdToken(true);
        //console.log("token : ",tokens);
        settoken(tokens);
        //setPending(false);
      }
      catch(err)
      {
        console.log("err",err);
        console.log("token is null bhailog!");
        alert("Please login first!");
        history.push("/Login");
        return;
      }
    }

    const creation = async () => {

        if(fileUrl.length === 0)
        {
          alert("Please Upload atleast one image!");
          return;
        }

         await axios.post("http://localhost:5000/user/createPost", {
            Post : {
                firstname : firstname,
                lastname : lastname,
                gender : gender,
                vacancy : vacancy,
                description : description,
                city : city,
                addressline1 : addressline1,
                rent : rent,
                profession : profession,
                ImgUrl : fileUrl
            },
            token : token
        })
        .then(res =>{
            alert(res.data);
        });
    } 

    


    return(
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="relative rounded-t flex mb-0 px-6 py-6 self-center">
                  <div className="relative text-center">
                    <h6 className="text-blueGray-700 text-5xl uppercase font-semibold">
                      Create Post
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
                            defaultValue=""
                            onChange={(e)=>{setlastname(e.target.value)}}
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
                            defaultValue="vacancy"
                            onChange={(e)=>{setVacancy(e.target.value)}}
                          />
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
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="gender"
                            onChange={(e)=>{setGender(e.target.value)}}
                          />
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
                            defaultValue="rent"
                            onChange={(e)=>{setRent(e.target.value)}}
                          />
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
                            defaultValue="profession"
                            onChange={(e)=>{setProfession(e.target.value)}}
                          />
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
                            //defaultValue="City"
                            value={city}
                            //onChange={(e)=>{setCity(e.target.value)}}
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
                            defaultValue="XXXXXX"
                            onChange={(e)=>{setpostalCode(e.target.value)}}
                          />
                          <br />
                          <label
                            id="length6"
                            style={{color : "red" , fontSize : "12px"}}
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
                            //defaultValue="State"
                            value={STATE}
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
                            defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                            rows="4"
                            onChange={(e)=>{setDescription(e.target.value)}}
                            ></textarea>
                        </div>
                        </div>
                    </div>
                    <br />
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <ImgComp getImgUrl = {getImgUrl} />  
                        </div>
                    </div>

                    <div>
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={creation}
                      >
                        Create Post
                      </button>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
    
}
