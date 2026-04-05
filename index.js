const express    = require("express");
const bodyParser = require("body-parser");
const fs         = require("node:fs");

const app  = express();
const port = 3000;

const urlEncoded = bodyParser.urlencoded();

const conf = require("./config.json");

app.set("view engine", "ejs");
app.set("views",       "pages");
app.use(express.static("static"));

app.get("/", (req, res) => {
	res.render("index", {});
});

app.get("/engine", (req, res) => {
	res.render("engine", {});
})

app.get("/games", (req, res) => {
	let games = JSON.parse(fs.readFileSync("games.json", "utf8"));

	res.render("games", {games});
});

app.get("/register", (req, res) => {
	res.render("register", {conf: conf});
});

app.get("/login", (req, res) => {
	res.render("login", {conf: conf});
});

app.get("/games/:id", (req, res) => {
	let id = parseInt(req.params["id"]);

	if (id == NaN) {
		res.status(404).send("404");
		return;
	}

	let games = JSON.parse(fs.readFileSync("games.json", "utf8"));

	if (id - 1 >= games.length) {
		res.status(404).send("404");
		return;
	}

	res.render("game", {id: id, game: games[id - 1]});
})

if (conf.accounts) {
	app.post("/api/register", urlEncoded, (req, res) => {
		console.log(req.body);
		res.send("unimplemented");
	});

	app.post("/api/login", urlEncoded, (req, res) => {
		console.log(req.body);
	});
}

app.listen(port, () => {
	console.log(`arkas world running on port ${port}`)
});
