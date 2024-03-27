import { useState, useEffect } from "react";
import UserData from "../../userData.json";
import { getRenewalDate } from "@/utils/getRenewalDate";
import { getNextRenewalDate } from "@/utils/getNextRenewalDate";

export default function Login() {
  const [ischangePlan, setIsChangePlan] = useState(false);
  const [isRenewPlan, setIsRenewPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [renewalDate, setRenewalDate] = useState("");

  useEffect(() => {
    setRenewalDate(getRenewalDate());
  }, []);

  const handlePlanChange = (e) => {
    const newPlan = e.target.value;
    setSelectedPlan(newPlan);
  };

  const upgradeDowngradeHandler = () => {
    if (!isRenewPlan) {
      setIsChangePlan(!ischangePlan);
    }
  };

  const closeHandler = () => {
    setIsChangePlan(!ischangePlan);
    setIsUpdated(!isUpdated);
  };

  const renewHandler = () => {
    if (!ischangePlan) {
      setIsRenewPlan(!isRenewPlan);
    }
  };

  const handleRenew = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/renew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ["Next Renewal Date"]: getNextRenewalDate(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // setIsUpdated(true);
        console.log("Data modified successfully:", data.newData);
      } else {
        console.error("Failed to modify data:", response.statusText);
      }
    } catch (error) {
      console.error("Error modifying data:", error);
    }

    setRenewalDate(getNextRenewalDate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/modify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ["Current Plan"]: selectedPlan,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsUpdated(true);
        console.log("Data modified successfully:", data.newData);
      } else {
        console.error("Failed to modify data:", response.statusText);
      }
    } catch (error) {
      console.error("Error modifying data:", error);
    }
  };

  return (
    <div className="bg-white relative overflow-hidden">
      <div className="flex flex-col">
        <h1 className="font-bold bg-violet-100 p-6">User Details</h1>
        <div className="p-6 bg-gray-100">
          {Object.entries(UserData).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center mb-2">
              <div className="w-[20rem] font-bold">{key}</div>
              <div className="w-[20rem]">{value}</div>
            </div>
          ))}
          <div className="flex justify-between items-center mb-2">
            <div className="w-[20rem] font-bold">Renewal Date</div>
            <div className="w-[20rem]">{renewalDate}</div>
          </div>
        </div>
        <div className="bg-violet-100 w-full p-4 flex items-center justify-center gap-5">
          <button
            className="px-12 py-2 rounded bg-violet-900 text-white hover:bg-black transition"
            onClick={upgradeDowngradeHandler}
          >
            Upgrade/Downgrade
          </button>
          <button
            className="px-12 py-2 rounded bg-violet-900 text-white hover:bg-black transition"
            onClick={renewHandler}
          >
            Renew Plan
          </button>
        </div>
      </div>

      {ischangePlan && (
        <div className="bg-violet-200 p-6">
          <form onSubmit={handleSubmit}>
            <label className="flex justify-between items-center">
              <p className="font-bold">Select New Plan:</p>
              <div className="flex flex-col">
                <select
                  name="plan"
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  className="border border-gray-300 mt-2 w-[20rem] bg-gray-200 h-10"
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
                <button
                  type="submit"
                  className="px-12 py-2 mt-4 rounded bg-violet-900 text-white hover:bg-black transition"
                >
                  Save New Plan
                </button>
                {isUpdated && (
                  <div className="flex items-center justify-between mt-2">
                    <p className="mt-2 text-green-700">Updated.</p>
                    <button
                      type="button"
                      className="bg-black text-white rounded px-2"
                      onClick={closeHandler}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </label>
          </form>
        </div>
      )}

      {isRenewPlan && (
        <div className="bg-violet-200 p-6">
          <form onSubmit={handleRenew}>
            <label className="flex justify-between items-center">
              <p className="font-bold">Please confirm if you want to renew</p>
              <button
                type="submit"
                className="px-12 py-2 ml-6 rounded bg-violet-900 text-white hover:bg-black transition"
              >
                Renew Now
              </button>
            </label>
          </form>
        </div>
      )}
    </div>
  );
}
