import app from "../firebase";
import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../assets/styles/Carousel.css";
import "../tailwind.css";
import "../Shared/Cards/patternCss.css"
import "../assets/styles/button.css";
import DescriptionCard from "../Components/DescriptionCard";
import axios from "axios";
import ImageCarousel from "../Shared/ImageCarousel/ImageCarousel";
import { send } from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_SmIBtduLIrhUgxxbogOxy");


export default function Description() {

    const [value, setValue] = useState({ ImgUrl:[] });
    const [pending, setPending] = useState(true);
    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [senderfn, setSenderfn] = useState('');
    const [senderln, setSenderln] = useState('');
    const [sendermn, setSendermn] = useState(true);
    //let senderEmail;
    //let receiverEmail;
    // let senderfn;
    // let senderln;
    // let sendermn;
    let history = useHistory();

    console.log("Rathod");
    const fetchdata = async () => {

        
        var tempurl = window.location.pathname;
        var id = tempurl.substring(tempurl.lastIndexOf('/') + 1);

        const res = await axios.get("http://localhost:5000/user/getPost/" + id)
        console.log("res",res);
        setValue(res.data);
    }

    useEffect(() => {
        fetchdata();
    },[])

    useEffect( () => { 
        console.log("value changed");
        fetchonly()
        //checkIfSame();
  },[value]);

    useEffect( () => {
        checkIfSame()
    },[pending])

  
  
  const [token, settoken] = useState("");

//   useEffect(() => {
//     console.log("token changed");
//     console.log("token",token);
// },[token]);
  

  const fetchUserbyid = async () => {
    const res = await axios.get("http://localhost:5000/user/getUserid/" + value.uid)
    console.log("res",res.data);
    setReceiverEmail(res.data.email);
    // receiverEmail = res.data.email;    
  }

  const fetchUserbytoken = async () => {
      try{
        const token = await app.auth().currentUser.getIdToken(true);
        settoken(token);

        const res2 = await axios.post("http://localhost:5000/user/getUserbytoken", {
            token : token
        })
        console.log("res2",res2.data);
        setSenderEmail(res2.data.email);
        setSenderfn(res2.data.firstname);
        setSenderln(res2.data.lastname);
        setSendermn(res2.data.MobileNumber);
        setPending(false);
        // senderEmail = res2.data.email;
        // senderfn = res2.data.firstname;
        // senderln = res2.data.lastname;
        // sendermn = res2.data.MobileNumber;
      }  
      catch(err){
          console.log("err",err);
      }
        
  }

  const fetchonly = async () => {
    await fetchUserbyid();
    await fetchUserbytoken();
  }

  const checkIfSame = async () => {

    console.log(senderEmail+ " " +receiverEmail);
    if(senderEmail === receiverEmail && senderEmail !== "" && receiverEmail !== "")
    {
        console.log(senderEmail+ "hello inside" +receiverEmail);
        document.getElementById("RequestButton").style.visibility = "hidden";
    }

  }

  

  const SendRequest = async (e) => {
    // e.preventDefault();
    // console.log("token",token);
    // if(token === "")
    // {
    //     history.push("/login");
    //     return;
    // }

    try{
        if(token === "")
        {
            alert("Please login first!");
            history.push("/Login");
            return;
        }
        console.log(senderEmail+ " " +receiverEmail);
        const response = await send(
            'service_x0m61ql',
            'template_0r5dkul',
            {   from_name: senderEmail,
                to_name: receiverEmail,
                message: "Tuzha flat aawadhla mala.....yeu ka re?\n" + "My Details :\n" + "Name : " + senderfn + " " + senderln + "\nMobile Number : " + sendermn,
                reply_to: senderEmail,
            },
            'user_SmIBtduLIrhUgxxbogOxy'
          )
          console.log('SUCCESS!', response.status, response.text);
    }
    catch(err)
    {
        console.log('Failed...',err)
    }
    
  };


    return (
    <>
        
        <section className="relative w-full h-full py-10 min-h-screen">
            {/* <Carousel /> */}
            <ImageCarousel ImgUrl={value.ImgUrl} />
            {/* <CarouselComp ImgUrl={value.ImgUrl} /> */}
            <DescriptionCard value={value}/>
            <center><button className="button button2" id="RequestButton" onClick={() => { SendRequest() }}>Send Request</button></center>
        </section>
        
    </>
    );
}