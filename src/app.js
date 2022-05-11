const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const weatherGrabber = require("./utils/weatherGrabber");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Alvin Cheung",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		message: "This is the help message",
		name: "Alvin Cheung",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Alvin Cheung",
	});
});


app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address term",
		});
	}

	geocode(req.query.address, (error, data) => {
		if (error) {
			return res.send({
				error: error,
			});
		}
		weatherGrabber(data, (error, weatherData) => {
			if (error) {
				return res.send({
					error: error,
				});
			}
			return res.send(weatherData);
		});
	});
});

app.get("/help/*", (requ, res) => {
	res.render("404", {
		title: "404 Help Article Not Found",
		name: "Alvin Cheung",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404 Page Not Found",
		name: "Alvin Cheung",
	});
});

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});
