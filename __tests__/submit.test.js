import fs from "fs";
import path from "path";
import handler from "../pages/api/submit";

jest.mock("fs");

describe("handler function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should save form data to userData.json file when method is POST", () => {
    const req = { method: "POST", body: { name: "John", age: 30 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    handler(req, res);

    const filePath = path.join(process.cwd(), "userData.json");

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(req.body)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Form data saved successfully",
    });
  });

  test("should return 405 status if method is not POST", () => {
    const req = { method: "GET" };
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() };

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
