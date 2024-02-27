import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Users(){
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUsers(){
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                setUsers(response.data.user);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        getUsers();
        
    }, [filter]);

    return(
        <>
            <div className="container mx-auto mt-5 p-8">
                <input className="rounded-md border border-gray-400 mb-4 h-10 w-full px-4" type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Search for User"/>
                <div className="grid grid-cols-1 gap-4">
                    {users.map(user => (
                        <div key={user.id} className="border border-gray-400 p-4 flex justify-between items-center">
                            <div>{user.firstName} {user.lastName}</div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(`/send?id=${user.id}&name=${user.firstName+ ` `+user.lastName}`)}>Send Money</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
