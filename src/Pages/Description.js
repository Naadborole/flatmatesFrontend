import app from "../firebase";
import React, {useState, useEffect} from "react";
import "../assets/styles/Carousel.css";
import "../tailwind.css";
import "../Shared/Cards/patternCss.css"
import "../assets/styles/button.css";
import DescriptionCard from "../Components/DescriptionCard";
import axios from "axios";
import CarouselComp from "../Components/CarouselComp/CarouselComp";
import ImageCarousel from "../Shared/ImageCarousel/ImageCarousel";
import { send } from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_SmIBtduLIrhUgxxbogOxy");


export default function Description() {

    const [value, setValue] = useState({ ImgUrl:[] });
    let senderEmail;
    let receiverEmail;
    let senderfn;
    let senderln;
    let sendermn;

    console.log("Rathod");
    const fetchdata = async () => {

        
        var tempurl = window.location.pathname;
        var id = tempurl.substring(tempurl.lastIndexOf('/') + 1);

        const res = await axios.get("http://localhost:5000/user/getPost/" + id)
        console.log("res",res);
        setValue(res.data);

    }

    

    useEffect( () => {
        fetchdata();
      console.log("data changed");
      
  },[]);
  
  const [token, settoken] = useState("");
  

  const fetchUserbyid = async () => {
    const res = await axios.get("http://localhost:5000/user/getUserid/" + value.uid)
    console.log("res",res.data);
    receiverEmail = res.data.email;    
  }

  const fetchUserbytoken = async () => {
        const token = await app.auth().currentUser.getIdToken(true);
        settoken(token);

        const res2 = await axios.post("http://localhost:5000/user/getUserbytoken", {
            token : token
        })
        console.log("res2",res2.data);
        senderEmail = res2.data.email;
        senderfn = res2.data.firstname;
        senderln = res2.data.lastname;
        sendermn = res2.data.MobileNumber;
        
  }

  const SendRequest = async (e) => {
    // e.preventDefault();
    await fetchUserbyid();
    await fetchUserbytoken();

    try{
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
        
        <section className="relative w-full h-full py-10 min-h-screen patternbg">
            {/* <Carousel /> */}
            <ImageCarousel ImgUrl={value.ImgUrl} />
            {/* <CarouselComp ImgUrl={value.ImgUrl} /> */}
            <DescriptionCard value={value}/>
            <center><button className="button button2" onClick={() => { SendRequest() }}>Send Request</button></center>
        </section>
        
    </>
    );
}