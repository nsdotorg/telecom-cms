import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Registration() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    userName: "",
    dateOfBirth: "",
    emailId: "",
    aadhaarNumber: "",
    registrationDate: "",
    assignedMobileNumber: "",
    plan: "",
    planStatus: "Inactive",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleUserDataInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.userName &&
      userData.dateOfBirth &&
      userData.emailId &&
      userData.aadhaarNumber &&
      userData.registrationDate &&
      userData.assignedMobileNumber &&
      userData.plan
    ) {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ["Name"]: userData.userName,
            ["Date of Birth"]: userData.dateOfBirth,
            ["Email ID"]: userData.emailId,
            ["Aadhaar Number"]: userData.aadhaarNumber,
            ["Registration Date"]: userData.registrationDate,
            ["Mobile Number"]: userData.assignedMobileNumber,
            ["Current Plan"]: userData.plan,
            ["Plan Status"]: "Active",
          }),
        });

        if (response.ok) {
          console.log("Form data saved successfully");
          router.push("/dashboard");
        } else {
          console.error("Failed to save form data");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setErrorMessage("One or more fields are missing...");
    }
  };

  return (
    <div className="border border-violet-200 shadow-xl">
      <h1 className="font-bold bg-violet-200 text-center p-2">
        Telecom Customer Management System
      </h1>
      <div className="bg-violet-100 p-6">Registration</div>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 w-[40rem]">
        <div>
          <label className="flex justify-between items-center">
            Name:
            <input
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center">
            Date of Birth
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center">
            Email Id:
            <input
              type="email"
              name="emailId"
              value={userData.emailId}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center">
            Aadhaar Number:
            <input
              type="text"
              name="aadhaarNumber"
              pattern="[0-9]{12}"
              value={userData.aadhaarNumber}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center">
            Registration Date:
            <input
              type="date"
              name="registrationDate"
              value={userData.registrationDate}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center">
            Assigned Mobile Number:
            <input
              type="tel"
              name="assignedMobileNumber"
              pattern="[0-9]{10}"
              value={userData.assignedMobileNumber}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center">
            Select Plan:
            <select
              name="plan"
              value={userData.plan}
              onChange={handleUserDataInputChange}
              className="border border-gray-300 mt-2 w-[20rem] bg-gray-200"
            >
              <option value="">Select Plan</option>
              <option value="Platinum365 / ₹ 499 / Validity: 365 days">
                Platinum365 / ₹ 499 / Validity: 365 days
              </option>
              <option value="Gold180 / ₹ 299 / Validity: 180 days">
                Gold180 / ₹ 299 / Validity: 180 days
              </option>
              <option value="Silver90 / ₹ 199 / Validity: 90 days">
                Silver90 / ₹ 199 / Validity: 90 days
              </option>
            </select>
          </label>
        </div>
        <div className="text-red-500 text-center mt-6">{errorMessage}</div>
        <button
          type="submit"
          className="mt-6 text-center px-12 py-2 rounded bg-violet-900 text-white hover:bg-black transition w-full"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default Registration;
