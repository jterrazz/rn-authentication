import * as admin from "firebase-admin";

export default (req, res) => {
  if (!req.body.phone) return res.status(422).send({ error: "Bad input" });

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin
    .auth()
    .createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
};
