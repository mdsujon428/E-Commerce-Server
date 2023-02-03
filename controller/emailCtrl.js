const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {

  let testAccount = await nodeMailer.createTestAccount();
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    // host: "gmail",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MP,     // generated ethereal password
    },
    tls: {
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"E-Commerce app 👻" <mdsujon00392@gmail.com>', // process.env.MAIL_ID 
    to: data.to, 
    subject: data.subject, 
    text: data.text, 
    html: data.html, 
  });

  // console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info.messageId));
  console.log(nodeMailer.getTestMessageUrl(info));
});

module.exports = { sendEmail };
