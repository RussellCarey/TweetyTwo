import { EEmailType } from "../types/enums";
const AppErr = require("../utils/AppError");
const pug = require("pug");

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export const setWelcomeEmail = async (username: string) => {
  const html = await pug.renderFile(`${__dirname}/templates/testEmail.pug`, { username: username });
  return html;
};

export const setFailedMessage = async (username: string, message: string, date: string) => {
  const html = await pug.renderFile(`${__dirname}/templates/testEmail.pug`, { username: username });
  return html;
};

export const setEmailFullContent = async (subject: string, html: string) => {
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
};

export const sendEmail = async (
  type: EEmailType,
  subject: string,
  to: string,
  username: string,
  message: string,
  date: string
) => {
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.sender = { name: "Twetty Admin", email: "tweety@russell-carey.com" };
  sendSmtpEmail.to = [{ email: to, name: username }];

  if (type === EEmailType.isWelcome) {
    sendSmtpEmail.htmlContent = await setWelcomeEmail(username);
  }

  if (type === EEmailType.isFailed) {
    sendSmtpEmail.htmlContent = await setFailedMessage(username, message, date);
  }

  await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data: Object) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    },
    function (error: Error) {
      console.error(error);
    }
  );
};
