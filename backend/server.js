const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries"); // Correctly importing from queries.js
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/clients", db.getClients);  // Calling db.getClients here
app.post("/createClient", db.createClient);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
