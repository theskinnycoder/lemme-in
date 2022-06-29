import supabaseClient from "../../lib/supabase";

export default async function handler(req, res) {
  let tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);

  const formId = "1FAIpQLScxbZ9DxBFP_bbj-TmBJx1985UrBlk5lTOjORcqFab-xY28Nw";
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

  const fieldToAriaLabelMap = (data) => ({
    "entry.1745402405": data.name,
    "entry.492083175": data.vehicle,
    "entry.1237549859": data.designation,
    "entry.177901760": data.mobile,
    "entry.2119305336": data.email,
    "entry.926963984": data.startup,
    "entry.251023569": data.purpose,
    "entry.380008406_year": tomorrowsDate.getFullYear(),
    "entry.380008406_month": tomorrowsDate.getMonth(),
    "entry.380008406_day": tomorrowsDate.getDate(),
  });

  if (req.method === "POST") {
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
      await Promise.all(promises);
      res.status(200).json({
        message: `A total of ${
          promises.length
        } CIE Entry Access Forms for ${tomorrowsDate.toDateString()} are submitted successfully`,
        submittedForms: allForms.map((form) => form.name),
      });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
