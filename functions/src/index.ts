import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import createUserFt from "./create_user";
import requestOneTimePasswordFt from "./request_one_time_password";
import verifyOneTimePasswordFt from "./verify_one_time_password";

const serviceAccount = require("../service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-native-authenticat-a761d.firebaseio.com"
});

export const createUser = functions.https.onRequest(createUserFt);
export const requestOneTimePassword = functions.https.onRequest(
  requestOneTimePasswordFt
);
export const verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePasswordFt
);
