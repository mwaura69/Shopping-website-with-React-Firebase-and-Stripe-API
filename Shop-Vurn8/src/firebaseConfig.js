import { initializeApp } from "firebase/app"


const firebaseConfig = {
    databaseURL: "enter your firebase database URL here"
    
}
const app = initializeApp(firebaseConfig)

export default app