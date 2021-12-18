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

const { ENode } = require("./types/enums");

const localArray = ["http://127.0.0.1:3000", "https://www.russell-carey.com"];
const productionArray = ["https://www.russell-carey.com", "https://russell-carey.com"];

app.use(
  cors({
    credentials: true, // allow session cookie from browser to pass through
    origin: process.env.NODE_ENV === ENode.prod ? productionArray : localArray,
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
      secure: process.env.NODE_ENV === ENode.dev ? false : false,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.NODE_ENV === ENode.dev ? false : false,
      sameSite: process.env.NODE_ENV === ENode.dev ? "lax" : "lax",
    },
  })
);
app.use(passportServer.initialize());
app.use(passportServer.session());

app.use("/tweetyapi/auth", authRoutes);
app.use("/tweetyapi/post", postRoutes);

app.use(ErrorController);

process.on("uncaughtException", function (err) {
  console.log(err);
});

//? App listen start
app.listen(process.env.PORT, () => {
  console.log("Connected to server!");
});
