import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import { UserApi } from "../api/UserApi";

const LoginPage = () => {
	const [isSignIn, setSignIn] = useState(true);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const auth = useAuth();

	const handleSignUp = async (event) => {
		event.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords must match.");
			return;
		}

		const signUpResponse = await UserApi.register({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			userIcon: 0,
		});

		if (signUpResponse.status === 201) {
			handleSignIn(null);
		} else {
			setError(signUpResponse.error);
		}
	};

	const handleSignIn = async (event) => {
		event?.preventDefault();
		setError("");

		try {
			await auth.login({ email: email, password: password });
		} catch (err) {
			setError(err.message);
		}
	};

	const switchForms = (changeToSignIn) => {
		setSignIn(changeToSignIn);
		setError("");
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setError("");
	};

	const handleSubmit = isSignIn ? handleSignIn : handleSignUp;

	return (
		<>
			<Navbar />
			<div className="w-full h-full flex pt-10">
				<div className="w-full flex justify-center">
					<div className="w-full sm:w-3/4 lg:w-4/6 h-fit pb-10 rounded-lg shadow dark:border text-white bg-customBlue">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-white">
							<div className="signInButtons flex justify-center">
								<button
									className={`rounded-l-lg p-3 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-black ${
										isSignIn ? "bg-customOrange !text-white" : "bg-white text-black"
									}`}
									onClick={() => {
										switchForms(true);
									}}
									id={isSignIn ? "active" : ""}
								>
									Sign in
								</button>
								<button
									className={`rounded-r-lg p-3 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-black ${
										isSignIn ? "bg-white text-black" : "bg-customOrange !text-white"
									}`}
									onClick={() => {
										switchForms(false);
									}}
									id={!isSignIn ? "active" : ""}
								>
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
								{!isSignIn && (
									<div className="flex gap-4">
										<div className="grow">
											<label htmlFor="firstName" className="block mb-2 text-sm font-medium ">
												Firstname
											</label>
											<input
												type="text"
												name="firstName"
												id="firstName"
												value={firstName}
												autoComplete="given-name"
												onChange={(e) => setFirstName(e.target.value)}
												className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
												placeholder=""
												required
											/>
										</div>
										<div className="grow">
											<label htmlFor="lastName" className="block mb-2 text-sm font-medium ">
												Lastname
											</label>
											<input
												type="text"
												name="lastName"
												id="lastName"
												autoComplete="family-name"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
												placeholder=""
												required
											/>
										</div>
									</div>
								)}
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium ">
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										value={email}
										autoComplete="email"
										onChange={(e) => setEmail(e.target.value)}
										className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
										placeholder=""
										required
									/>
								</div>
								<div>
									<label htmlFor="password" className="block mb-2 text-sm font-medium">
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										autoComplete={isSignIn ? "current-password" : "new-password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
										required
									/>
								</div>
								{!isSignIn && (
									<div>
										<label htmlFor="password" className="block mb-2 text-sm font-medium">
											Confirm Password
										</label>
										<input
											type="password"
											name="password"
											id="confirmPassword"
											value={confirmPassword}
											autoComplete="new-password"
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
											required
										/>
									</div>
								)}
								{error && <div>Error: {error}</div>}
								<div className="flex justify-center submitButtons">
									{isSignIn ? (
										<button
											type="submit"
											className="bg-customOrange hover:bg-customOrange-dark rounded-lg  w-1/2 p-3 text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white"
										>
											Sign in
										</button>
									) : (
										<button
											type="submit"
											className="bg-customOrange hover:bg-customOrange-dark w-1/2 rounded-lg p-3 text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white"
										>
											Sign up
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
