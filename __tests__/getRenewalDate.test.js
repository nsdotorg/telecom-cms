import { getRenewalDate } from "../utils/getRenewalDate";
import UserData from "../userData.json";

describe("getRenewalDate", () => {
  test("should return the correct renewal date", () => {
    const mockUserData = {
      ...UserData,
      "Registration Date": "2024-03-29",
      "Current Plan": "Gold180 / ₹ 299 / Validity: 180 days",
    };

    jest.mock("../userData.json", () => mockUserData, { virtual: true });

    const mockCurrentDate = new Date("2024-03-29");
    Date.now = jest.fn(() => mockCurrentDate.getTime());

    const renewalDate = getRenewalDate();

    expect(renewalDate).toBe("2024-08-29");
  });
});
