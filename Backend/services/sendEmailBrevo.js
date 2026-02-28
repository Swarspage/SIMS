const brevo = require("@getbrevo/brevo");

// Initialize API instance ONCE (not inside function)
const apiInstance = new brevo.TransactionalEmailsApi();

// Safety check
if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY is missing in environment variables");
}

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmailBrevo = async ({ toEmail, subject, htmlContent }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME,
      email: process.env.BREVO_SENDER_EMAIL,
    };

    sendSmtpEmail.to = [{ email: toEmail }];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully:", response.messageId);

    return response;
  } catch (error) {
    console.error(
      "Brevo Email Error:",
      error.response?.body || error.message
    );
    throw error;
  }
};

module.exports = sendEmailBrevo;
