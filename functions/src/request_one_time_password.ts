import * as admin from "firebase-admin";
import twilio from "./twilio";

const FROM_PHONE = "+12015488017";

export default (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must provide the phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create(
        {
          from: FROM_PHONE,
          to: phone,
          body: `Your code is ${code}`
        },
        err => {
          if (err) return res.status(422).send(err); // For testing purposes

          admin
            .database()
            .ref(`users/${phone}`)
            .update({ code, codeValid: true })
            .then(() => {
              res.send({ success: true });
            })
            .catch(err2 => {
              res.status(422).send(err2); // For testing purposes
            });
        }
      );
    })
    .catch(err => {
      res.status(422).send({ error: "User not found" });
    });
};
