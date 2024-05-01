import React from "react";
import Home from "../screens/Home";
import SchedulePage from "../screens/SchedulePage";
import LoginPage from "../screens/LoginPage";
import CourseSearch from "../screens/CourseSearch";
import DataEntry from "../screens/DataEntry";
import AuthProvider from "../hooks/AuthProvider";
import UserPage from "../screens/UserPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";
import "../index.css";
import PrivateRoute from "../router/PrivateRoute";
import { useState, useEffect } from "react";

const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	const cacheImages = async (images) => {
		const promises = await images.map((image) => {
			return new Promise((resolve, reject) => {
				const cachedImage = new Image();

				cachedImage.src = image;
				cachedImage.onload = resolve();
				cachedImage.onerror = reject();
			});
		});

		await Promise.all(promises);

		setIsLoading(false);
	};

	useEffect(() => {
		const images = [
			"https://ufcc.jordansheehan.com/mockup.webp",
			"https://ufcc.jordansheehan.com/CourseCompassLogo.png",
		];
		cacheImages(images);
	}, []);

	return !isLoading ? (
		<React.StrictMode>
			<Router>
				<APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
					<AuthProvider>
						<Routes>
							<Route path="/*" element={<Home />} />
							<Route element={<PrivateRoute />}>
								<Route path="/schedule" element={<SchedulePage />} />
							</Route>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/search" element={<CourseSearch />} />
							<Route path="/DataEntry" element={<DataEntry />} />
							<Route path="/UserPage" element={<UserPage />} />
						</Routes>
					</AuthProvider>
				</APIProvider>
			</Router>
		</React.StrictMode>
	) : (
		<></>
	);
};

export default App;
