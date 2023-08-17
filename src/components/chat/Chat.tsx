import React, { useEffect, useState } from 'react';
import "./Chat.scss";
import ChatHeader from './ChatHeader';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { CollectionReference, DocumentData, DocumentReference, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import storage, { db } from '../../firebase';
import useSubCollection from '../../hooks/useSubCllection';
import { uploadBytes,ref } from 'firebase/storage';
import { Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';





const Chat = () => {
    const [inputText,setInputText]= useState<string>("");
    const [images,setImages]=useState<File | null>(null);
    const channelId = useAppSelector((state)=>state.channel.channelId);
    const channelName =useAppSelector((state)=>state.channel.channelName);
    const user = useAppSelector((state)=>state.user.user)
    const {subDocuments:messages}=useSubCollection("channels","messages")

    const sendMessage =async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        // /*cahnnelsコレクションの中にあるmessagesコレクションの中にメッセージ情報を入れる */
        const collectionRef:CollectionReference<DocumentData> = collection(
            db,
            "channels",
            String(channelId)
            ,"messages"
        );
        // if(images){
        //     const S = 
        //     "abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        //     const N =16;
        //     const ramdomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        //         .map((n)=>S[n%S.length])
        //         .join("");
        //     const fireName=ramdomChar + "_" + images.name;
        //     const uploadImg = storage.app.ref
        //     uploadImg.on(

        //     )
        // }
        const docRef:DocumentReference<DocumentData>=await addDoc(collectionRef,{
            message:inputText,
            image:images,
            timestamp:serverTimestamp(),
            user:user,
        })
        console.log(docRef)
        setInputText("");
        
    }
    const OnFileUpload = (e:any) =>{
        // console.log(e.target.files[0].name)
        const file = e.target.files[0]
        const storageRef = ref(storage,"image/"+file.name)
        uploadBytes(storageRef,file).then((snapshot)=>{
            console.log("Upload")
        })
    } 




  return (
    <div className='chat'>
        {/*chatHeader*/}
        <ChatHeader channelName={channelName}/>
        {/*chatMessage*/}
        <div className="chatMessage">
            {messages.map((message,index)=>(
                <ChatMessage
                key={index}
                message={message.message}
                timestamp={message.timestamp}
                user={message.user}/>
            ))}
            {/* <ChatMessage/>
            <ChatMessage/>
            <ChatMessage/> */}
        </div>
        {/*chatInput*/}
        <div className="chatInput">
            <form >
            <div className="outerBox">

                <label>
                <AddAPhotoIcon className='photo'/>
                <input className="imageUploadInput" type="file" accept=".png, .jpeg, .jpg"
                onChange={OnFileUpload}/>
                </label>
            </div>
                <input type="text"
                className='messageInput'
                placeholder='メッセージを送信'
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                setInputText(e.target.value)
                }
                value={inputText}/>
                <button type='submit' className='chatInputButton' onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>sendMessage(e)}>
                    送信
                </button>
            </form>

            <div className='chatInputIcons'>
                <CardGiftcardIcon/>
                <GifIcon/>
                <InsertEmoticonIcon/>

            </div>
        </div>
    </div>
  )
}

export default Chat
