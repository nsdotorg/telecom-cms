## Telecom Customer Management System

The app consists of 4 main pages

1. Homepage - 2 options (New and Existing Customer)
2. Registration Page - User can enter their details and register with a plan
3. Dashboard Page - Displays the user details submitted while registration
4. Profile Page - To change or renew plan

### API endpoint to manage new user registration

```js
// /pages/api/submit.js
// to submit user data while registration
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const userData = req.body;
    const filePath = path.join(process.cwd(), "userData.json");

    fs.writeFileSync(filePath, JSON.stringify(userData));
    res.status(200).json({ message: "Form data saved successfully" });
  } else {
    res.status(405).end();
  }
}
```

### API endpoint to manage modification of existing plan

```js
// /pages/api/modify.js
// To modify existing plan
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
```

### API endpoint to manage renewal of existing plan

```js
// /pages/api/renew.js
// To renew plan and update the next renewal date
import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const jsonData = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));
    const result = req.body;

    console.log(result);
    jsonData["Next Renewal Date"] = result["Next Renewal Date"];

    fs.writeFileSync("./userData.json", JSON.stringify(jsonData, null, 2));
    res
      .status(200)
      .json({ message: "Data modified successfully", newData: jsonData });
    res.status(200).json({ message: "Form data saved successfully" });
  } else {
    res.status(405).end();
  }
}
```

The User Data upon a new registration gets store in userData.json file in the root directory

```json
{
  "Name": "Nishant",
  "Date of Birth": "2024-03-01",
  "Email ID": "connect@nishantsingh.org",
  "Aadhaar Number": "111111111111",
  "Registration Date": "2024-03-02",
  "Mobile Number": "9004499945",
  "Current Plan": "Gold180 / ₹ 299 / Validity: 180 days",
  "Plan Status": "Active"
}
```

### Two methods in /utils directory are used to get the current renewal date and to get the next renewal date upon renewal

```js
// getRenewalDate
import UserData from "../userData.json";

export const getRenewalDate = () => {
  const registrationDate = new Date(UserData["Registration Date"]);
  const currentDate = new Date();
  const difference = currentDate.getTime() - registrationDate.getTime();
  const remainingDays =
    UserData["Current Plan"].split("/")[2].split(" ")[2] -
    Math.floor(difference / (1000 * 3600 * 24));
  const nextRenewalDate = new Date(
    currentDate.getTime() + remainingDays * (1000 * 3600 * 24)
  );
  const year = nextRenewalDate.getFullYear();
  const month = String(nextRenewalDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextRenewalDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
```

```js
// getNextRenewalDate
import { getRenewalDate } from "./getRenewalDate";
import UserData from "../userData.json";

export const getNextRenewalDate = () => {
  const currentRenewalDate = getRenewalDate(); // 2024-05-07
  const getCurrentPlan = UserData["Current Plan"]; // Silver90 / ₹ 199 / Validity: 90 days
  const numberOfDaysToExtend = getCurrentPlan.split("/")[2].split(" ")[2]; // 90

  console.log(numberOfDaysToExtend);

  var result = new Date(currentRenewalDate);
  result.setDate(result.getDate() + numberOfDaysToExtend);

  return result.toISOString().split("T")[0];
};
```

### Testing

`__test__` consists of all tests

**Test files for api endpoints**

```
modify.test.js
renew.test.js
submit.test.js
```

**Test file for getRenewalDate.js method**

```
getRenewalDate.test.js
```

`Note`: Unable to complete the renew plan feature completely.
