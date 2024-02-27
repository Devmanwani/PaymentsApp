import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Header(){

    return (
        <>
            <Link to="/" className="text-3xl font-medium mb-10 rounded-md border-2 p-3 bg-blue-300 shadow-md w-screen absolute top-0">
            Payments App
        </Link>
            <Logout/>
            <div className="mt-20 sm:mt-35"></div>       
        </>
    )
}