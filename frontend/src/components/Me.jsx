import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Me(){
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/dashboard");
        } else {
            navigate("/signin");
        }
    }, []); 
    return null;
}
