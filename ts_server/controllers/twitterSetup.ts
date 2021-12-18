import { Strategy } from "passport-twitter";
import { ITwitterProfile } from "../types/types";
import { checkUserExists, createNewUser } from "../services/createNewUser";
import isDev from "../utils/isDev";

const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

// THIS is a bit funny about URLs - make sure you go to http://127.0.0.1:5000 --- INCLUDE THE HTTP.....
const newTwitterStrategy: Strategy = new TwitterStrategy(
  {
    consumerKey: isDev() ? process.env.CONSUMER_API : process.env.PROD_CONSUMER_API,
    consumerSecret: isDev() ? process.env.CONSUMER_SECRET_KEY : process.env.PROD_CONSUMER_SECRET_KEY,
    callbackURL: isDev() ? process.env.CALLBACK_URL_DEV : process.env.PROD_CALLBACK_URL,
    userProfileURL: process.env.PROFILE_URL,
  },
  async (accessToken: string, refreshToken: string, profile: ITwitterProfile, done: any) => {
    // Check if user exists and create if needed..
    const foundProfile = await checkUserExists(profile.id);
    if (!foundProfile) await createNewUser(profile, accessToken, refreshToken);
    return done(null, profile);
  }
);

passport.use(newTwitterStrategy);

passport.serializeUser((user: Object, done: any) => {
  return done(null, user);
});

passport.deserializeUser((user: Object, done: any) => {
  return done(null, user);
});
