import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import StyleColors from "../constants/StyleColors";
import { useAuth } from "../hooks/AuthProvider";
const UserPage = () => {
    const auth = useAuth();
    console.log(auth);
    return(
        <div className="w-full">
            <Navbar/>
            {auth?.user ? (
            <div className="w-full flex justify-center mt-10 ">
                <div className="w-full sm:w-10/12">
                        <div className="bg-[#eef8fc] p-3">
                            <p className="text-2xl">Hi</p>
                            <p>Welcome to your acount. Here, You can change your name, password, and email.</p>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="firstName" className="font-bold">First name</label>
                            <input type="text" id="first_name" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={auth.user.firstName} required={true}/>
                        </div>

                        <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="firstName" className="font-bold">Last Name</label>
                            <input type="text" id="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={auth.user.lastName} required={true}/>
                        </div>

                        <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="firstName" className="font-bold">Email</label>
                            <input type="text" id="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={auth.user.email} required={true}/>
                        </div>

                        <div className="w-full flex justify-end">
                            <button className="bg-customOrange text-white px-5 py-3 rounded-xl mt-5">
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