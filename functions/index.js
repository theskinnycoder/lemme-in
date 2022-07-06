const functions = require("firebase-functions");
const fetch = require("isomorphic-unfetch");

exports.submitForm = functions
  .region("asia-south1")
  // Sunday to Thursday at 6:00 PM
  .pubsub.schedule("0 18 * * 0-4")
  // Asia Kolkata
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {
    try {
      const res = await fetch(
        "https://lemme-in.vercel.app/api/automated-form",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      functions.logger.log(data);
    } catch (error) {
      functions.logger.error(error);
    } finally {
      return null;
    }
  });
