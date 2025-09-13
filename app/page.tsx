import ClientComponent from "./components/ClientComponent";

interface Data {
  message: string;
}

async function getData(): Promise<Data> {
  // This fetch runs on the server.
  // We use `no-store` to ensure it's fetched on every request.
  const res = await fetch("http://localhost:3000/api/hello", {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary.
    throw new Error("Failed to fetch data from server");
  }

  return res.json();
}

export default async function Page() {
  const serverData = await getData();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ClientComponent serverData={serverData} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">Sample by Gemini</p>
      </footer>
    </div>
  );
}
