import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDXt1ZOAzmbxZobXv8j56TbQbCKv16_TMk",
  authDomain: "cloudapp-819d2.firebaseapp.com",
  projectId: "cloudapp-819d2",
  storageBucket: "cloudapp-819d2.appspot.com",
  messagingSenderId: "758025858134",
  appId: "1:758025858134:web:4caaa7444eb3daf7bd9ff7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export{auth,provider,db,app};
export default storage;
