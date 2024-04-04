import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import { UserApi } from "../api/UserApi";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("site") || "");
	const navigate = useNavigate();
	const login = async (loginData) => {
		const response = await UserApi.login(loginData);

		if (response.status === 200) {
			setUser(response.user);
			setToken(response.token);
			localStorage.setItem("site", response.token);
			navigate("/schedule");
			return;
		}

		throw new Error(response.error);
	};

	const logout = () => {
		setUser(null);
		setToken("");
		localStorage.removeItem("site");
		navigate("/login");
	};

	useEffect(() => {
		const loadUser = async () => {
			if (!user && token) {
				const response = await UserApi.getUser(token);
				if (response.status === 200) {
					setUser(response);
				}
			}
		};

		loadUser();
	}, []);

	return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
