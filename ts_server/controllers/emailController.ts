const AppErr = require("../utils/AppError");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

export const sendWelcomeEmail = async (username: string, email: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: "russell_carey@hotmail.co.uk", // Change to your verified sender
    subject: `Welcome to Tweety ${username}!`,
    text: `Welcome! ${username}`,
    html: `<strong>Welcome! ${username}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: Error) => {
      console.error(error);
    });
};
