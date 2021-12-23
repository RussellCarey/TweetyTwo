import axios from "axios";

export const sendWelcomeEmail = async () => {
  const email = await axios.request({
    method: "POST",
    withCredentials: true,
    url: "https://api.elasticemail.com/v2/email/send",
    data: {
      apikey: process.env.EMAIL_API_KEY,
      subject: "Test Email",
      from: "Russell",
      to: "russell_carey@hotmail.co.uk",
      bodyText: "Test",
      isTransactional: false,
    },
  });

  console.log(email);
};
