import Link from "next/link";
import UserData from "../../userData.json";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold bg-violet-100 p-6">User Dashboard</h1>
        <div className="p-6 bg-gray-100">
          {Object.entries(UserData).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center mb-2">
              <div className="w-[20rem] font-bold">{key}</div>
              <div className="w-[20rem]">{value}</div>
            </div>
          ))}
        </div>
        <div className="bg-violet-200 p-6">
          <Link
            className="mt-12 text-center px-12 py-2 rounded bg-violet-900 text-white hover:bg-black transition"
            href="/profile"
          >
            Edit Plan
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
