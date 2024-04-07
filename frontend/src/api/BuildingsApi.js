import { config } from "../config/config";

const getBuildingByCode = async (code) => {
	const response = await fetch(config.API_BASE_URL + `/buildings?code=${code}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	let result = null;
	if (response.status == 200) {
		result = response.json();
	}
	return result;
};

export const BuildingsApi = {
	getBuildingByCode,
};
