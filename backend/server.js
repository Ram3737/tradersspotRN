const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const analysisResultRoutes = require("./routes/analysisResultRoutes");
const courseContentRoutes = require("./routes/courseContentRoutes");

dotenv.config();
const MONGODB_URI = process.env.MONGO_CONNECTION;

console.log(MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MIDDLEWARE
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/book", pdfRoutes);
app.use("/api/analysis", analysisResultRoutes);
app.use("/api/course", courseContentRoutes);

//ERROR MIDDLEWARE
app.use((error, req, res, next) => {
  console.log("here", error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occured" });
});

const PORT = process.env.PORT || 3001;

mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => {
    app.listen(PORT, () => console.log("Server listening on port", PORT));
  })
  .catch((err) => {
    console.log("failed to connect", err);
  });
