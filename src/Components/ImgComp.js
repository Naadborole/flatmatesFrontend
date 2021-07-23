import React, { useEffect , useState } from "react";
import app from "../firebase";


function ImgComp(props) {
  const [fileUrl, setFileUrl] = useState([]);
  const [Img, setImg] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect( () => {
    console.log("fileUrl changed");
},[fileUrl]);

// useEffect( () => {
//   console.log("Img changed");
// },[Img]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };   

  const handleChange = async (e) => {
    if(Img.length !== 0)
      setImg([]);

    for(let i = 0 ; i < e.target.files.length ; i++)
    {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random;
      const ext = newImage.name.split(".")[newImage.name.split(".").length - 1];
      console.log(ext);
      if(ext.localeCompare("jpeg") != 0 && ext.localeCompare("png") != 0)
      {
        alert("error Wrong file type submitted");
        //array clear karneka
        setImg([]);
        setFileUrl([]);
        return;
      }
      setImg((prevState) => [...prevState , newImage]);
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if(Img.length === 0)
    {
      alert('please choose images');
      return ;
    }
    const promises = [];
    Img.map((image) => {
        //Naming
        const ext = image.name.split(".")[image.name.split(".").length - 1];
        let temp = `${Math.round(Math.random() * 1000000000000).toString()}.${ext}`
        
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(temp);
        const task = fileRef.put(image);
        promises.push(task);
        task.on('state_changed', 
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
          alert("ERROR image size greater than 1MB, Failed to upload!");
          setImg([]);
          return;
        },
        async () => {
          await fileRef.getDownloadURL().then(url =>{
            setFileUrl((prevState) => [...prevState , url])
          }); 
        });
    });
    Promise.all(promises)
      .then(() => {
        alert("All images uploaded");
        setImg([]);
      })
      .catch((err) => console.log(err));       
  }

  const handleDelete = async (url , name) => {
        let temp = app.storage();
        let pictureRef = temp.refFromURL(url);
        pictureRef.delete()
          .then(() => {
            alert("Picture is deleted successfully!");
            //deleting from array
            const index = fileUrl.indexOf(url);
            if (index > -1) {
              const temparr = [...fileUrl];
              temparr.splice(index, 1);
              setFileUrl(temparr);
            }
          
          })
          .catch((err) => {
            console.log(err);
            alert("Error in deleting image!");
          });
      console.log("urls : " , fileUrl);
  };


  console.log("images : " , Img);
  console.log("urls : " , fileUrl);
  props.getImgUrl(fileUrl)

  return (
    <>
      <form onSubmit={ onSubmit }>
        <input type="file" multiple onChange={ handleChange } />
        <progress value={ progress } max="100" />
        <button className="button button2" onClick={ handleUpload }>
         <span>Upload </span><i class="fas fa-upload" style={{fontSize:"18px"}}></i>
        </button>
      </form>
      <br /><br />
      {fileUrl.map((url) => (
        <div>
          <center>
            <img style={{ width: "500px" , height: "500px" }} src={url || "http://via.placeholder.com/300"} alt="img" />
            <button type="button" className="bg-blueGray-100" onClick={() => handleDelete(url) } style={{padding:"10px", color:"white"}}> 
              <i class='far fa-trash-alt' style={{fontSize:"24px" , color:"red"}}></i>
            </button> 
          </center>
          <br /><br />
        </div>
        )
      )}
    </>
  );
}


export default ImgComp;

