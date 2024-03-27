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
