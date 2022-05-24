const express = require("express");
const app = express();
var morgan = require("morgan");
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

app.use(morgan("common"));
app.get("/check/:zip", validateZip, (req, res) => {
  const zip = req.params.zip;
  if (!getZoos(zip)) {
    res.send("12345 does not exist in our records.");
  } else {
    res.send("07502 exists in our records.");
  }
});
app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;
  if (admin === "true") {
    const zoos = getZoos();
    const zoosFormatted = Object.keys(zoos)
      .map(function (k) {
        return zoos[k];
      })
      .join("; ");
    res.send(`All zoos: ${zoosFormatted}`);
  } else {
    next("You do not have access to that route.");
  }
});
app.get("/zoos/:zip", validateZip, (req, res) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  const zoosFormatted = Object.keys(zoos)
    .map(function (k) {
      return zoos[k];
    })
    .join("; ");

  if (zoos.length >= 1) {
    res.send(`${zip} zoos: ${zoosFormatted}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

app.use((req, res, next) => {
  res.send("That route could not be found!");
});

//error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
