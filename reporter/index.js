const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const report = require("./result_object.js");

var app = express();

app.engine("hbs", exphbs());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));

app.get("/", function(req, res) {
    res.render("index", report);
});

app.use(express.static(path.resolve(__dirname, "../dist")));

app.listen(3000);
