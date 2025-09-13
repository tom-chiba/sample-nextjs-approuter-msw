"use client";

import { useState } from "react";

interface Data {
  message: string;
}

interface ClientComponentProps {
  serverData: Data;
}

export default function ClientComponent({ serverData }: ClientComponentProps) {
  const [clientData, setClientData] = useState<Data | null>(null);

  const handleClientFetch = async () => {
    const res = await fetch("/api/hello");
    const data: Data = await res.json();
    setClientData(data);
    alert(`Client-side fetch: ${data.message}`);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">API Request Samples</h1>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">Server-Side Data</h2>
        <p>Message: {serverData.message}</p>
        <p className="text-sm text-gray-500">
          (This data was fetched on the server.)
        </p>
      </div>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">Client-Side Data</h2>
        <button
          onClick={handleClientFetch}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[200px] mx-auto"
        >
          Fetch Client-Side Data
        </button>
        {clientData && (
          <p className="mt-4">Last client-side message: {clientData.message}</p>
        )}
      </div>
    </div>
  );
}
