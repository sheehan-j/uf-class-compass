const { Client } = require("@googlemaps/google-maps-services-js");

exports.getDistance = async (req, res) => {
	const client = new Client({});
	console.log(process.env.GOOGLE_MAPS_API_KEY);

	client
		.distancematrix({
			params: {
				origins: [`place_id:${req.query.origin}`],
				destinations: [`place_id:${req.query.destination}`],
				key: process.env.GOOGLE_MAPS_API_KEY,
				mode: "walking",
			},
			timeout: 1000, // milliseconds
		})
		.then((r) => {
			console.log(JSON.stringify(r.data.rows[0].elements[0].duration.text));
			return res.status(200).json({
				distance: r.data.rows[0].elements[0].duration.text,
			});
		})
		.catch((e) => {
			return res.status(500).json({ message: "Internal server error calculating distance." });
		});
};
