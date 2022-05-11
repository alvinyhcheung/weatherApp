const request = require('postman-request');
const mapBoxApiKey =
	"pk.eyJ1IjoiaGFtaXdvb2QiLCJhIjoiY2wyc2lqa2d1MGhzNzNjcXJmMzA0MXM2ZiJ9.xlnbCBD755PMEc5JFa_eTw";


const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapBoxApiKey}&limit=1`;
	request({ url: url, json: true, limit: 1 }, (error, {body}) => {
		if (error) {
			callback("Unable to connect to location services", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location", undefined);
		} else {
			const data = {
				lat: body.features[0].center[0],
				long: body.features[0].center[1],
			};
			callback(undefined, data);
		}
	});
};

module.exports = geocode;