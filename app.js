const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectionDB } = require("./db/connection")
const indexRoutes = require("./routes/index");
require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/", indexRoutes)

connectionDB();
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server is running on 5000");
});