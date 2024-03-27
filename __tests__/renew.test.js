import fs from "fs";
import handler from "../pages/api/renew";

jest.mock("fs");

describe("handler function", () => {
  let req, res;

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        "Next Renewal Date": "2024-04-01",
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

  it("should modify userData.json and respond with success message", () => {
    fs.readFileSync.mockReturnValueOnce(JSON.stringify({}));
    fs.writeFileSync.mockImplementationOnce((path, data) => {
      expect(path).toBe("./userData.json");
      expect(JSON.parse(data)).toEqual({ "Next Renewal Date": "2024-04-01" });
    });

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Data modified successfully",
      newData: { "Next Renewal Date": "2024-04-01" },
    });
  });
});
