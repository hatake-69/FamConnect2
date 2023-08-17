import { Button } from "@mui/material";
import React from "react";
import "./ImageApploads.scss";
import storage from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

const ImageUploader = () => {
    const OnFileUpload = (e:any) =>{
        // console.log(e.target.files)]
        const file = e.target.files[0]
        const storageRef = ref(storage,"image/"+file.name)
        uploadBytes(storageRef,file).then((snapshot)=>{
            console.log("Upload")
        })
    } 
  return (
    <div className="outerBox">
      <Button variant="contained">
        <input className="imageUploadInput" type="file" accept=".png, .jpeg, .jpg"
        onChange={OnFileUpload} />
      </Button>
    </div>
  );
};

export default ImageUploader;