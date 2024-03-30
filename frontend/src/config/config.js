const prod = {
	API_BASE_URL: "https://ufcc.jordansheehan.com/api",
};

const dev = {
	API_BASE_URL: "http://localhost:6205/api",
};

// No need to add NODE_ENV to .env for this, it is auto-configured with Vite
export const config = process.env.NODE_ENV === "development" ? dev : prod;
