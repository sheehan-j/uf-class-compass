import React, {useState} from "react";
import "../styles/UserPage.css";
import Navbar from "../components/Navbar";
const UserPage = () => {
    const [isSignIn, setSignIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSignUp = async (event) => {
        event.preventDefault();
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        // try {
        //   const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password }),
        //   });
    
        //   if (response.ok) {
        //     console.log('Login successful');
        //   } else {
        //     const errorData = await response.json();
        //     console.error('Login failed:', errorData.message);
        //   }
        // } catch (error) {
        //   console.error('Login error:', error);
        // }
      };

      const handleSubmit = isSignIn ? handleSignIn : handleSignUp;



	return (
        <>
        <Navbar />
		<div className="w-full h-full flex pt-10">
			<div className="w-full flex justify-center ">
                <div className="w-1/2 h-fit pb-10 rounded-lg shadow dark:border loginWrapper">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-white">
                        <div className="signInButtons flex justify-center">
                            <button className="rounded-l-lg bg-white p-3 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-black" onClick={() => setSignIn(true)} id={isSignIn ? "active" : ""}>
                                    Sign in
                            </button>
                            <button className="rounded-r-lg bg-white p-3 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-black" onClick={() => setSignIn(false)} id={!isSignIn ? "active" : ""}>
                                    Sign Up
                            </button>
                        </div>
                        <div className="w-full flex justify-center">
                            {isSignIn ? (
                                <div className="p-3 text-xl font-bold leading-tight tracking-tight  md:text-l flex">
                                    Welcome Back!
                                </div>
                            ) : (
                                <div className="p-3 text-xl font-bold leading-tight tracking-tight md:text-l text-white">
                                    Create an Account
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium ">Username</label>
                                <input type="username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black" placeholder="" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black" required=""/>
                            </div>
                            {!isSignIn && (
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium">Confirm Password</label>
                                <input type="password" name="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black" required=""/>
                            </div>
                            )}
                            <div className="flex justify-center submitButtons">
                                {isSignIn ? (
                                    <button type="submit" className="bg-teal-500 rounded-lg  w-1/2 p-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign in
                                </button>                  ) : (
                                    <button type="submit" className="bg-teal-500 w-1/2 rounded-lg p-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign up
                                </button>                  )}
                            </div>
                            
                        </form>
                    </div>
                </div>
			</div>
		</div>
        </>
	);
};

export default UserPage;
