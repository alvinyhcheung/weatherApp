const request = require("postman-request");

const weatherApiKey = "75ea1d3ea16e448f2d0a4c858cd58de0";

const weatherGrabber = (data, callback) => {
	const urlWeather = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${data.long},${data.lat}`;
	request(urlWeather, { json: true }, (error, {body}) => {
		if (error) {
			callback("No access to API", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			const degree = body.current.temperature;
			const feelsLike = body.current.feelslike;
			callback(
				undefined,
				{
					temperature: degree,
					feelsLike : feelsLike,
					location: body.location.name
				} 
			);
		}
	});
};

module.exports = weatherGrabber;
