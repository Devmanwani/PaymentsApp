import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

export default function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    function transfer() {
        axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            // Transfer successful
            window.alert("Transfer successful!");
        })
        .catch(error => {
            // Transfer failed
            window.alert("Transfer failed. Please try again later.");
            console.error("Transfer error:", error);
        });
    }
    
    

    return (
        <>
            <Header/>
            <div className="flex flex-col justify-center items-center border-black border-2 p-8 rounded-xl w-80 bg-blue-100">
            <div className="border-2 border-black rounded-full h-20 w-20 flex justify-center items-center text-5xl">{name[0]}</div>
            <h3 className="text-2xl mt-3 font-semibold mb-5"> {name}</h3>
            <input className="rounded-md border border-gray-400 mb-4 h-10 px-4" type="text" placeholder="Amount in Rs." onChange={(e)=>setAmount(e.target.value)}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={transfer}> Send Money</button>
            </div>
        
        </>
    )
}