import React, { useState } from "react";

const ApiTester: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Example test meetingId (replace with a real one from DB)
  const testMeetingId = "d427b9d5-46c3-4008-8642-4ae320f5ed4e";

  const callApi = async (url: string, method: string = "GET", body?: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">API Tester</h2>

      {/* Create Meeting */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">Create Meeting</h3>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() =>
            callApi("meetings/", "POST", {
              name: "Frontend Test Meeting",
              time_options: [
                {
                  start_time: "2025-08-21T10:00:00Z",
                  end_time: "2025-08-21T11:00:00Z",
                },
                {
                  start_time: "2025-08-21T12:00:00Z",
                  end_time: "2025-08-21T13:00:00Z",
                },
              ],
            })
          }
        >
          Create
        </button>
      </div>

      {/* Get Meeting Details */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">Get Meeting Details</h3>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded"
          onClick={() => callApi(`meetings/${testMeetingId}/`)}
        >
          Fetch Details
        </button>
      </div>

      {/* Get Availability Responses */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">Get Availability Responses</h3>
        <button
          className="px-3 py-1 bg-purple-500 text-white rounded"
          onClick={() =>
            callApi(`meetings/${testMeetingId}/availability-responses/`)
          }
        >
          Fetch Responses
        </button>
      </div>

      {/* Get Availability Summary */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold">Get Availability Summary</h3>
        <button
          className="px-3 py-1 bg-orange-500 text-white rounded"
          onClick={() =>
            callApi(`meetings/${testMeetingId}/availability-summary/`)
          }
        >
          Fetch Summary
        </button>
      </div>

      {/* Results */}
      <div className="border p-4 rounded bg-gray-50">
        <h3 className="font-semibold">Results</h3>
        {error && <p className="text-red-500">Error: {error}</p>}
        {data && <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default ApiTester;
