//1.
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//2. routes
const adsRoutes = require("./routes/ads");

//3.connect
const connect = require("./config/db");

//4. port
const PORT = process.env.PORT;

//5.create
const app = express();

//6.use
app.use(express.json());
app.use(cors());
app.use("/ads", adsRoutes);

//7. GetApi
app.get("/", async (req, res) => {
    res.send("Hello From Backend");
})

//7.listen
app.listen(PORT, async () => {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`);
});
