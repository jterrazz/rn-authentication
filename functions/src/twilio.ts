const twilio = require("twilio");
const env = require("../env.json");

const twilioClient = new twilio.Twilio(env.TWILIO_SID, env.TWILIO_SECRET);

export default twilioClient;
