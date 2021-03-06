import axios from "axios";
import * as Cookies from "js-cookie";
import { ERequestOutcomes } from "../../../types/errors";
import { ITweetObject, IUploadAttempt, IReqError } from "../types/types";

import { projectURLS } from "../../../utils/urls";
import isDev from "../../../utils/is-dev";

export const uploadImageFile = async (image: File) => {
  // Upload image to server
  const data: FormData = new FormData();
  data.append("image", image, `${image.name}`);

  try {
    const imagePost = await axios.request({
      method: "POST",
      withCredentials: true,
      url: isDev() ? `${projectURLS.development}/api/post/addImage` : `${projectURLS.productionWithAPI}/post/addImage`,
      data,
      headers: {
        authorization: `${Cookies.get("token")}`,
      },
    });

    return imagePost.data;
  } catch (error: any) {
    if (error.response?.status! === 429) return ERequestOutcomes.hasLimitError;
    return ERequestOutcomes.hasError;
  }
};

export const uploadTweet = async (tweet: ITweetObject, uploadAttempt: IUploadAttempt) => {
  console.log(tweet);
  console.log(tweet.unix);
  try {
    const post = await axios.request({
      method: "POST",
      withCredentials: true,
      url: isDev() ? `${projectURLS.development}/api/post/message` : `${projectURLS.productionWithAPI}/post/message`,
      data: {
        unix: tweet.unix,
        message: tweet.message,
        imageURL: uploadAttempt ? uploadAttempt.url : null,
        imageName: uploadAttempt ? uploadAttempt.name : null,
      },
      headers: {
        authorization: `${Cookies.get("token")}`,
      },
    });

    return post;
  } catch (error: any) {
    if (error.response?.status! === 429) return ERequestOutcomes.hasLimitError;
    return ERequestOutcomes.hasError;
  }
};
