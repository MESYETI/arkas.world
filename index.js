const express = require("express");
const fs      = require("node:fs");

const app  = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views",       "pages");
app.use(express.static("static"));

app.get("/", (req, res) => {
	res.render("index", {});
});

app.get("/games", (req, res) => {
	let games = JSON.parse(fs.readFileSync("games.json", "utf8"));

	res.render("games", {games});
});

app.listen(port, () => {
	console.log(`arkas world running on port ${port}`)
});
