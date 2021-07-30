const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");

connectDB();

// Import Routes
const users = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Woohoo!!");
});

app.use("/api/v1/user", users);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is runnign on PORT ${PORT}`));
