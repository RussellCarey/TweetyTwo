const Twit = require("twit");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const DatabaseServices = require("../services/databaseServices");
import { TweetJobClass } from "../models/TweetClass";
import { Schedule } from "../models/ScheduleClass";

// Creates a new twitter 'controller' with users details..
export const NewTwit = (access: string, refresh: string) => {
  return new Twit({
    consumer_key: process.env.CONSUMER_API,
    consumer_secret: process.env.CONSUMER_SECRET_KEY,
    access_token: access,
    access_token_secret: refresh,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  });
};

// Creates the JOB onto the DB..
export const createNewDBJob = async (self: TweetJobClass, date: Date, twitterID: number) => {
  try {
    // Upload to the DB.
    const uploadedJob = DatabaseServices.uploadOneJob(self, date, twitterID);
    return uploadedJob;
  } catch (error) {
    await Schedule.deleteJobFromQueue(self.id!);
    return new AppError("Error creating tweet schedule", 500);
  }
};

// Change date to cron timing from a date string..
export const convertDateToCronDate = (date: Date) => {
  const year: number = +date.getFullYear();
  const month: number = +date.getMonth();
  const day: number = +date.getDate();
  const hour: number = +date.getHours();
  const minute: number = +date.getMinutes();
  const newDate = new Date(year, month, day, hour, minute, 0);
  return newDate;
};
