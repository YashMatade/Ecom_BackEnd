const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectionDB } = require("./db/connection")
const indexRoutes = require("./routes/index");


app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/", indexRoutes);
app.get("/", (req, res) => {
    res.send("Server is running");
})

connectionDB(); const port = 5000
app.listen(port, () => {
    console.log("server is running on 5000");
});
