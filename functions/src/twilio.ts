const twilio = require("twilio");
const env = require("../env.json");

const accountSid = "AC285f5163ec8e8cf25faf86564657b82f";
const authToken = env.TWILIO_SECRET;

const twilioClient = new twilio(accountSid, authToken);

export default twilioClient;
