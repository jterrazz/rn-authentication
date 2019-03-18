import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import createUserFt from "./create_user";
const serviceAccount = require("../service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-native-authenticat-a761d.firebaseio.com"
});

export const createUser = functions.https.onRequest(createUserFt);
