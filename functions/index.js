const functions = require("firebase-functions");

exports.submitForm = functions
  .region("asia-south1")
  // every weekday at 6:00 PM
  .pubsub.schedule("30 6 * * 1-5")
  // Asia Kolkata
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {
    const res = await fetch("https://lemme-in.vercel.app/api/automated-form", {
      method: "POST",
    });
    const data = await res.json();
    functions.logger.log(data);
    return null;
  });
