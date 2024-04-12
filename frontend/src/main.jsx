import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./screens/Home";
import SchedulePage from "./screens/SchedulePage";
import LoginPage from "./screens/LoginPage";
import CourseSearch from "./screens/CourseSearch";
import DataEntry from "./screens/DataEntry";
import AuthProvider from "./hooks/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import PrivateRoute from "./router/PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route element={<PrivateRoute />}>
						<Route path="/schedule" element={<SchedulePage />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/search" element={<CourseSearch />} />
					<Route path="/DataEntry" element={<DataEntry />} />
				</Routes>
			</AuthProvider>
		</Router>
	</React.StrictMode>
);
