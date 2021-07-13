import Card from '../Shared/Cards/Card';
import Filters from "../Components/Home/Filters";
import "../Shared/Cards/patternCss.css"
import "../assets/styles/button.css";
import axios from 'axios';
import React, {useState , useEffect} from "react";
import { Link , Route, Router } from 'react-router-dom'
import { useHistory } from 'react-router';
import app from "../firebase";
import UpdatePost from "./UpdatePost";

export default function MyPost(props) {

    const [cardData, setCardData] = useState([]);
    const [token, settoken] = useState("");

    const fetchdata = async () => {
        const token = await app.auth().currentUser.getIdToken(true);
        settoken(token);

        const res = await axios.post("http://localhost:5000/user/userGetPost", {
            token : token
        });
        console.log("res.data",res.data);
        setCardData(res.data)
    }  
    
    useEffect( () => {
      fetchdata();
    }, []);

    let history = useHistory();

    const handleEdit = (data) => {
        console.log("In Edit",data);
        history.push({
            pathname: '/UpdatePost',
            state : { data }
        });
    };

    const deleteImage = async (id) => {
      cardData.map((data) => {
        if(data.pid === id)
        {
          data.ImgUrl.map((url) => {
            let temp = app.storage();
            let pictureRef = temp.refFromURL(url);
            pictureRef.delete()
            console.log("image deleted from bucket!");
          });
        }
      })

    }

    const handleDelete = async (id) => {
        console.log("In Delete",id);
        deleteImage(id);
        const res = await axios.delete("http://localhost:5000/user/deletePost/" + id);
        alert(res.data);
        window.location.reload();
    };

    return (
        <div>
          <main className="bg-transparent">
            <div className="w-full py-6 mt-5 px-5 flex flex-row">
              <div className="realtive sm:w-8/12 w-full">
                {cardData.map((data) => (
                    <div>
                        <Card {...data}></Card>
                        <center>
                            <button type="button" className="button button2" id="EditButton" onClick={()=>handleEdit(data)}>  
                                <i Style='font-size:24px' className='fas'>&#xf304;</i>
                            </button>
                            <button className="button button2" id="DeleteButton" onClick={()=> handleDelete(data.pid)}>
                                <i Style='font-size:24px' className='far'>&#xf2ed;</i>
                            </button>
                        </center> 
                    </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      );
}