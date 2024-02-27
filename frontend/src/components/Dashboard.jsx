import { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios';
import Users from "./Users";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("token")){
        navigate("/signin");
    }
}, []); 

  const [balance, setBalance] = useState(null);

  useEffect(()=>{
    async function fetchBalance() {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from storage
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the headers
          }
        });
        setBalance(parseFloat(response.data.balance).toFixed(2));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    fetchBalance();
  },[]);

  return(
    <>
    <Header/>
    <div className="h-full w-full flex flex-col">
    
      <span className="text-xl font-medium ml-7"> Balance: {balance}₹</span>
      <Users/>
      </div>
    </>
  );
}
