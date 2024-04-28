import { config } from "../config/config";

/**
 * @param {Object} params
 * All fields can be used but all fields are optional.
 * If using no fields, pass in an empty object {}
 * Ex:
 * {
 *    class: String,
 *    number: String,
 *    title: String,
 * }
 */
const search = async (params) => {
	// let queryParams =
	// 	JSON.stringify(params) === "{}"
	// 		? ""
	// 		: "?" +
	// 		  Object.keys(params)
	// 				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	// 				.join("&");

	const response = await fetch(`${config.API_BASE_URL}/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(params),
	});
	const result = await response.json();
	return { result: result, status: response.status };
};

export const SearchApi = {
	search,
};
