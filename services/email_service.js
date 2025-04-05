import { emailClient } from "../config/azure_config.js";

export const sendOTPEmail = async (OTP, email) => {
  const emailMessage = {
    senderAddress: process.env.AZURE_EMAIL,
    content: {
      subject: "CVHAT forget password OTP",
      plainText: "",
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Code</title>
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
         
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                           <div style="text-align: left;">
                    <div><img
                        src="https://cvhat.blob.core.windows.net/uploads/data/logo.png" alt="CVHAT Logo"
                        style="width: 56px;"></div>
                  </div>
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">OTP code</h1>
                      <p style="padding-bottom: 16px">Please use this OTP code below to reset your password.</p>
                      <p style="padding-bottom: 16px"><strong style="font-size: 130%">${OTP}</strong></p>
                      <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>CVHAT Team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                    <p style="padding-bottom: 16px">Made with ♥ in Gaza</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
`,
    },
    recipients: {
      to: [{ address: email }],
    },
  };
  const poller = await emailClient.beginSend(emailMessage);
  const result = await poller.pollUntilDone();
};
