import axios from "axios";
import * as Cookies from "js-cookie";
import { ERequestOutcomes } from "../../../types/errors";
import { ITweetObject, IUploadAttempt } from "../types/types";

export const uploadImageFile = async (image: File) => {
  // Upload image to server
  const data: FormData = new FormData();
  data.append("image", image, `${image.name}`);

  try {
    const imagePost = await axios.request({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:3333/api/post/addImage`,
      data,
      headers: {
        authorization: `${Cookies.get("token")}`,
      },
    });

    return imagePost.data;
  } catch (error) {
    return ERequestOutcomes.hasError;
  }
};

export const uploadTweet = async (tweet: ITweetObject, uploadAttempt: IUploadAttempt) => {
  try {
    const post = await axios.request({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:3333/api/post/message`,
      data: {
        date: tweet.date,
        time: tweet.time,
        message: tweet.message,
        imageURL: uploadAttempt ? uploadAttempt.url : null,
        imageName: uploadAttempt ? uploadAttempt.name : null,
      },
      headers: {
        authorization: `${Cookies.get("token")}`,
      },
    });

    return post;
  } catch (error) {
    console.log(error);
    return ERequestOutcomes.hasError;
  }
};
