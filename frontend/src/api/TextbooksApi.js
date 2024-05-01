import { config } from "../config/config";

const getTextbooksBySection = async (section) => {
	const response = await fetch(config.API_BASE_URL + `/classes/textbooks?section=${section}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

export const TextbooksApi = {
	getTextbooksBySection,
};
