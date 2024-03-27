import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const jsonData = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));
    const plan = req.body;

    jsonData["Current Plan"] = plan["Current Plan"];

    fs.writeFileSync("./userData.json", JSON.stringify(jsonData, null, 2));
    res
      .status(200)
      .json({ message: "Data modified successfully", newData: jsonData });
    res.status(200).json({ message: "Form data saved successfully" });
  } else {
    res.status(405).end();
  }
}
