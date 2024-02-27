import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){

const navigate  = useNavigate();

    function handleLogout(){
        const confirmed = window.confirm("Are you Sure you Want to Logout?");
        if(confirmed){
            localStorage.removeItem("token");
            navigate("/signin");
        }
    }

    return(
        <>
            <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-5" 
            onClick={handleLogout}>Logout</button>
        </>
    )
}