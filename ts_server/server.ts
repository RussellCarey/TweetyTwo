const express = require("express");
const session = require("express-session");
const passportServer = require("passport");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./controllers/twitterSetup.ts");

const ErrorController = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const { ENode } = require("./types/enums");
import isDev from "./utils/isDev";

const localArray = ["http://127.0.0.1:3000", "https://www.russell-carey.com"];
const productionArray = ["https://www.tweety.russell-carey.com", "https://tweety.russell-carey.com"];

app.use(
  cors({
    credentials: true, // allow session cookie from browser to pass through
    origin: process.env.NODE_ENV === ENode.prod ? productionArray : localArray,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, parameterLimit: 10, limit: "10mb" }));

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

app.use(!isDev() ? "/tweetyapi/auth" : "/api/auth", authRoutes);
app.use(!isDev() ? "/tweetyapi/post" : "/api/post", postRoutes);

app.use(ErrorController);

//? App listen start
app.listen(process.env.PORT, () => {
  console.log("Connected to server!");
});
