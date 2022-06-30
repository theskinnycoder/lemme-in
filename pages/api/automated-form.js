import supabaseClient from "../../lib/supabase";
import { startOfTomorrow } from "date-fns";
import { GOOGLE_FORM_ID } from "../../utils/constants";

// const fieldToAriaLabelMapDummy = (data) => ({
//   "entry.942276055": data.name,
//   "entry.291449440": data.vehicle,
//   "entry.1809066800": data.designation,
//   "entry.1106193601": data.mobile,
//   "entry.692644159": data.email,
//   "entry.558859842": data.startup,
//   "entry.553731245": data.purpose,
//   "entry.1414513857_year": `20${year}`,
//   "entry.1414513857_month": month,
//   "entry.1414513857_day": day,
// });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const tomorrow = startOfTomorrow();

    const [day, month, year] = tomorrow
      .toLocaleDateString("en-IN", {
        dateStyle: "short",
      })
      .split("/");

    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

    const fieldToAriaLabelMap = (data) => ({
      "entry.1745402405": data.name,
      "entry.492083175": data.vehicle,
      "entry.1237549859": data.designation,
      "entry.177901760": data.mobile,
      "entry.2119305336": data.email,
      "entry.926963984": data.startup,
      "entry.251023569": data.purpose,
      "entry.380008406_year": `20${year}`,
      "entry.380008406_month": month,
      "entry.380008406_day": day,
    });

    const { data: allForms, error } = await supabaseClient
      .from("forms")
      .select("*");

    if (!error) {
      const promises = allForms.map((form) =>
        fetch(
          `${formUrl}?${Object.entries(fieldToAriaLabelMap(form))
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      );

      const responses = await Promise.all(promises);
      const statuses = responses.map((res) => res.status);

      const unsubmittedForms = allForms.filter(
        (_, index) => statuses[index] !== 200
      );

      const submittedForms = allForms.filter(
        (_, index) => statuses[index] === 200
      );

      const output = {
        date: tomorrow.toLocaleDateString(),
        allForms,
        submittedForms,
        unsubmittedForms,
      };

      console.log(output);

      res.status(200).json(output);
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
