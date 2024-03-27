import fs from "fs";
import handler from "../pages/api/modify";

jest.mock("fs");

describe("handler function", () => {
  let req, res;

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        "Current Plan": "newPlan",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should modify userData.json and return success message when method is POST", () => {
    const jsonData = {
      "Current Plan": "newPlan",
    };

    fs.readFileSync.mockReturnValue(JSON.stringify(jsonData));

    handler(req, res);

    expect(fs.readFileSync).toHaveBeenCalledWith("./userData.json", "utf-8");
    expect(jsonData["Current Plan"]).toBe("newPlan");
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "./userData.json",
      JSON.stringify(jsonData, null, 2)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Data modified successfully",
      newData: jsonData,
    });
  });
});
