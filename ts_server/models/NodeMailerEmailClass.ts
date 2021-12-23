const path = require("path");
const nodemailer = require("nodemailer");
const AppErr = require("../utils/AppError");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  to: string;
  username: string;
  from: string;

  constructor(email: string, name: string, url: string) {
    this.to = email;
    this.username = name;
    this.from = `Tweety <${process.env.EMAIL_EMAILFROM}>`;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        // To activate use gmail 'less secure app' option.
        // Sendrid and mailgun are good options.
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject: string, template: string) {
    try {
      // 1) Render HTML based on a pug template
      const html = await pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
        username: this.username,
        subject,
      });

      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: subject,
        html: html,
        text: htmlToText(html),
      };

      // 3) Create a transport and send email
      return await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async sendForgotPasswordEmail() {
    await this.send("forgotPasswordEmail", "Forgot your password?");
  }
};
