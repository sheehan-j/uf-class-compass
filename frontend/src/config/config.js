const prod = {
	API_BASE_URL: "https://ufcc.jordansheehan.com/api",
};

const dev = {
	API_BASE_URL: "http://localhost:6205/api",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
