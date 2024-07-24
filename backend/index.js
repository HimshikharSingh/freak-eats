const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// Set up CORS to allow requests only from the Netlify deployment
const allowedOrigin = "https://freakeats.netlify.app/";

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === allowedOrigin) {
        // Allow requests with no origin (like mobile apps or Postman)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
