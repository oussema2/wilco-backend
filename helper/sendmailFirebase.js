const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oussema.dabboussi99@gmail.com",
    pass: "123456789QQq?saskBroo147852",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;

    const mailOptions = {
      from: "Your Account Name <yourgmailaccount@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
      to: "saskoussdabbsask@gmail.com",
      subject: "test", // email subject
      html: `<p style="font-size: 16px;">test it!!</p>
                <br />
            `, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
