import * as admin from "firebase-admin";

export default (req, res) => {
  console.log("HERE");
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: "Phone and code must be provided" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref(`users/${phone}`);

      ref.on("value", snapshot => {
        ref.off();
        if (!snapshot) return;

        const user = snapshot.val();

        if (!user || user.code !== code || !user.codeValid)
          return res.status(422).send({ error: "Code is not valid" });

        ref
          .update({ codeValid: false })
          .then(() => {
            admin
              .auth()
              .createCustomToken(phone)
              .then(token => res.send({ token }))
              .catch(error => res.status(422).send({ error })); // Don't use in production
          })
          .catch(error => res.status(422).send({ error }));
      });
    })
    .catch(error => {
      res.status(422).send({ error }); // Don't use in production
    });
};
