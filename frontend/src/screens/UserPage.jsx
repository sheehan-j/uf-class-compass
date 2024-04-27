import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyleColors from "../constants/StyleColors";
import { UserApi } from "../api/UserApi";
import { useAuth } from "../hooks/AuthProvider";
const UserPage = () => {
    const auth = useAuth();
    const [token] = useState(localStorage.getItem("site") || "");
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(auth.user);
        console.log("AUTH UPDATED: ", auth.user);
    }, [auth])
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await UserApi.updateUser(token, user);
            console.log("PASSWORD AFTER:", response)
            setUser(response);
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    };

    return(
        <div className="w-full">
            <Navbar/>
            {user ? (
            <div className="w-full flex justify-center mt-10 ">
                <div className="w-full sm:w-10/12">
                        <div className="bg-[#eef8fc] p-3">
                            <p className="text-2xl">Hi</p>
                            <p>Welcome to your acount. Here, You can change your name, password, and email.</p>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="firstName" className="font-bold">First name</label>
                            <input type="text" id="first_name" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                        </div>

                        <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="lastName" className="font-bold">Last Name</label>
                            <input type="text" id="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})} required={true}/>
                        </div>

                        <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="Email" className="font-bold">Email</label>
                            <input type="text" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required={true}/>
                        </div>

                        <div className="flex flex-col gap-3 mt-5">
                            <p className="font-bold">Icon Color</p>
                            <div>
                                <p>Selected</p>
                                <div className={`h-10 w-10 rounded-full`} style={{backgroundColor : StyleColors[user.iconColor]}}></div>
                            </div>
                            <div className="colors flex gap-3">
                                {StyleColors.map((color, index) => {
                                    return(
                                        <button type="button" key={"color"+index} className={`h-10 w-10 rounded-full `} style={{backgroundColor : color}} onClick={() => setUser({ ...user, iconColor: index })}/>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="w-full flex justify-end">
                            <button className="bg-customOrange text-white px-5 py-3 rounded-xl mt-5" type="submit" onClick={handleUpdate}>
                                Save Changes 
                            </button>
                        </div>
                </div>
           </div>) : 
           (
            <div>
                How did you get here? Oops
            </div>
           )}
        </div>
    )
}

export default UserPage;