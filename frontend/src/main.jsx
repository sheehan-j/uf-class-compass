import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./screens/Home";
import SchedulePage from "./screens/SchedulePage";
import UserPage from "./screens/UserPage";
import CourseSearch from "./screens/CourseSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/SchedulePage" element={<SchedulePage />} />
				<Route path="/UserPage" element={<UserPage />} />
				<Route path="/CourseSearch" element={<CourseSearch />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
