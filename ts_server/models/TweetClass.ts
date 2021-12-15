import { Job } from "node-schedule";
import { ScheduleClass } from "./ScheduleClass";

const Twit = require("twit");
const { v4: uuidv4 } = require("uuid");
const fetch64 = require("fetch-base64");
const schedule = require("node-schedule");

const catchAsync = require("../utils/catchAsync");

const TweetClassServices = require("../services/tweetClassServices");
const DatabaseServices = require("../services/databaseServices");
const MediaController = require("../controllers/mediaController");

export class TweetJobClass {
  private twitterID: number;
  id: string | null;
  message: string;
  date: Date;
  imageURL: string | null;
  imageName: string;
  private accessToken: string;
  private refreshToken: string;
  private scheduleManager: ScheduleClass;
  private scheduledData: Job | null;
  private isNew: boolean;

  constructor(
    scheduleManager: ScheduleClass,
    twitterID: number,
    message: string,
    date: Date,
    imageURL: string | null,
    imageName: string,
    access: string,
    refresh: string,
    isNew: boolean,
    id: string | null
  ) {
    this.isNew = isNew;
    this.message = message;
    this.twitterID = twitterID;
    this.id = id ? id : uuidv4();
    this.date = date;
    this.imageURL = imageURL;
    this.imageName = imageName;
    this.accessToken = access;
    this.refreshToken = refresh;
    this.scheduleManager = scheduleManager;
    this.scheduledData = null;
    this.createScedule(this);
  }

  // ------------------------------------------------------------------------------
  // Future notes
  // ------------------------------------------------------------------------------
  // Tried using classes here but should have kept with functional programming.
  // I need to learn about OOP / others before I try to implement code like this..
  // Future plan.
  // ------------------------------------------------------------------------------

  // Change status in the database to failed and remove it from the job que (if there)..
  private failedAttempt = async (error: any) => {
    console.log("ERROR FROM FAILED ATTEMPT FUNCTION");
    console.log(error);
    await DatabaseServices.changeJobStatus(this.id, "failed");
    await this.scheduleManager.deleteJobFromQueue(this.id!);
  };

  // Cancel a job from the scheulder..
  cancelJob = () => {
    // Cancel job so stop any re activations..
    this.scheduledData!.cancel();
  };

  // Create the job into the scheduler..
  private createScedule = catchAsync(async (self: TweetJobClass) => {
    // Convert date to CRON format - from the DB and front end is a normal date.
    const formattedDate = TweetClassServices.convertDateToCronDate(this.date);

    // If this is a NEW creation, then we need to save it to the database..
    if (this.isNew) {
      TweetClassServices.createNewDBJob(this, this.date, this.twitterID);
    }

    // Create the schedule object..
    this.scheduledData = schedule.scheduleJob(formattedDate, async function () {
      const Twitter = TweetClassServices.NewTwit(self.accessToken, self.refreshToken);
      if (!self.imageURL) return await self.twitterPostTweet(Twitter);
      if (self.imageURL) return await self.postImageTweet(Twitter);
    });
  });

  // Promise for uploading media file before posting the tweet..
  private twitterMediaUpload = async (Twitter: typeof Twit) => {
    const imageBase64 = await fetch64.remote(this.imageURL);
    const twitterMediaUpload = await Twitter.post("media/upload", { media_data: imageBase64 });
    return twitterMediaUpload;
  };

  // Promise to post the tweet with media..
  private twitterPostTweetWithImage = async (mediaData: any, Twitter: typeof Twit) => {
    const twitterPostWithImage = Twitter.post("statuses/update", {
      status: `${this.message}`,
      media_ids: mediaData.data.media_id_string,
    });
    return twitterPostWithImage;
  };

  //! Posting a single tweet
  private twitterPostTweet = async (Twitter: typeof Twit) => {
    console.log("Posting NON image tweet");
    try {
      // Attempt to send a tweet.
      const tweetPost = await Twitter.post("statuses/update", { status: `${this.message}` });
      if (tweetPost.resp.statusMessage !== "OK") this.failedAttempt(tweetPost.resp);

      // Set the status on the DB to success and delete from the servers object..
      await DatabaseServices.changeJobStatus(this, "success");

      // Delete from queue in schedule manager..
      this.scheduleManager.deleteJobFromQueue(this.id!);
    } catch (error) {
      return this.failedAttempt(error);
    }
  };

  //!  Main function to post image tweet..
  private postImageTweet = async (Twitter: typeof Twit) => {
    console.log("Posting image tweet");
    try {
      // Post and upload the media

      const mediaUploadAttempt: any = await this.twitterMediaUpload(Twitter);
      if (mediaUploadAttempt.resp.statusMessage !== "OK") this.failedAttempt(mediaUploadAttempt.resp);

      // Using the media above, post a text tweet with the image
      const postAttempt: any = await this.twitterPostTweetWithImage(mediaUploadAttempt, Twitter);
      if (postAttempt.resp.statusMessage !== "OK") this.failedAttempt(postAttempt.resp);

      // If okay, change on the DB
      await DatabaseServices.changeJobStatus(this, "success");

      // Delete from the image space..
      await MediaController.deleteFileFromSpace(this.id);

      // Delete from queue in schedule manager..
      this.scheduleManager.deleteJobFromQueue(this.id!);
    } catch (error) {
      return this.failedAttempt(error);
    }
  };
}
