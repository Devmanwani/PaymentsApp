import { useState, useEffect } from "react"
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';



export default function Singup(){

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/dashboard");
        }
    }, []); 

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate  = useNavigate();


    async function sendData(){
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username,
            firstName,
            lastName,
            password           
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard")
    }

    const inputClasses = "rounded-md border-black border-2 mb-4 h-10 w-60 text-center";

    return(
        <>  
        <div className="flex flex-col justify-center items-center border-black border-2 p-8 rounded-xl w-80 bg-blue-100">
            <span className="text-xl font-medium mb-10 rounded-md border-2 p-3 bg-blue-300 shadow-md"> Payments App</span>
            <div className="flex flex-col justify-center items-center ">
            <input className={inputClasses} type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} ></input>
            <input className={inputClasses} type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} ></input>
            <input className={inputClasses} type="email" placeholder="Email" onChange={(e)=>setUsername(e.target.value)} ></input>
            <input className={inputClasses} type="password"  placeholder="Password" onChange={(e)=>setPassword(e.target.value)} ></input>
            <button className="rounded-md border-black border-2 px-4 py-2 bg-blue-500 text-white mb-4 mt-2" type="submit" onClick={sendData}>Sign Up</button>

            </div>

            <div>
                <span className="font-medium">Already a member, <Link className="text-blue-600 underline" to={"/signIn"}> Sign In</Link></span>
            </div>
        </div>
        </>
    )
}