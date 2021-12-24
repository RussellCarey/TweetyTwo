const nodemailer = require("nodemailer");
const AppErr = require("../utils/AppError");
// const pug = require("pug");
// const { htmlToText } = require("html-to-text");

export const createTransport = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendWelcomeEmail = async (username: string, email: string) => {
  try {
    // 1) Render HTML based on a pug template
    // const html = await pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
    //   username: this.username,
    //   subject,
    // });

    const html = "<p> This is a test email!!!! </p>";

    // 2) Define email options
    const mailOptions = {
      from: `Admin <${process.env.EMAIL_FROM}>`,
      to: "russell_carey@hotmail.co.uk",
      subject: "Welcome to Tweety!",
      html: html,
      text: html,
    };

    // 3) Create a transport and send email
    return await createTransport().sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
