const express = require("express");
const session = require("express-session");
const passportServer = require("passport");
const schedule = require("node-schedule");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./controllers/twitterSetup.ts");

const ErrorController = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const localArray = [
  "http://127.0.0.1:3000",
  "localhost:3000",
  "http://localhost:3000",
  "localhost:3000",
  "http://localhost:3000/",
];
const productionArray = ["https://www.russell-carey.com", "https://russell-carey.com"];

app.use(
  cors({
    credentials: true, // allow session cookie from browser to pass through
    origin: process.env.NODE_ENV === "production" ? productionArray : localArray,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false, parameterLimit: 100000, limit: "2mb" }));

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "Lax",
    },
  })
);
app.use(passportServer.initialize());
app.use(passportServer.session());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.use(ErrorController);

process.on("uncaughtException", function (err) {
  console.log(err);
});

//? App listen start
app.listen(3333, () => {
  console.log("Connected to server on port ");
});
