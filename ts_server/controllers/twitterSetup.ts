import { Strategy } from "passport-twitter";
import { ITwitterProfile } from "../types/types";
import { checkUserExists, createNewUser } from "../services/createNewUser";

const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

// THIS is a bit funny about URLs - make sure you go to http://127.0.0.1:5000 --- INCLUDE THE HTTP..
const newTwitterStrategy: Strategy = new TwitterStrategy(
  {
    consumerKey: process.env.CONSUMER_API,
    consumerSecret: process.env.CONSUMER_SECRET_KEY,
    callbackURL: process.env.CALLBACK_URL,
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
