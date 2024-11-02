"use client";

import useWebSocket from "@/app/hooks/useWebSocket";

const Home = () => {
  const { messages, sendMessage } = useWebSocket(
    "ws://iot.crustea.id:1880/surabaya/control"
  );

  const handleOpenRelay = () => {
    sendMessage("open_relay");
  };

  const handleCloseRelay = () => {
    sendMessage("close_relay");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Aerator Control</h1>
      <div className="space-x-4 mb-6">
        <button
          onClick={handleOpenRelay}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Aerator ON
        </button>
        <button
          onClick={handleCloseRelay}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Aerator OFF
        </button>
      </div>
    </div>
  );
};

export default Home;
