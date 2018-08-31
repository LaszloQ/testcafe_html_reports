const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const report = require("../reports/result.json");

var app = express();

app.engine("hbs", exphbs());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/", function(req, res) {
  res.render("index", report);
});

app.listen(3000);