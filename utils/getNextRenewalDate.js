import { getRenewalDate } from "./getRenewalDate";
import UserData from "../userData.json";

export const getNextRenewalDate = () => {
  const currentRenewalDate = getRenewalDate();
  const getCurrentPlan = UserData["Current Plan"];
  const numberOfDaysToExtend = getCurrentPlan.split("/")[2].split(" ")[2];

  console.log(numberOfDaysToExtend);

  var result = new Date(currentRenewalDate);
  result.setDate(result.getDate() + numberOfDaysToExtend);

  return result.toISOString().split("T")[0];
};
