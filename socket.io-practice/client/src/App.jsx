import React, { useEffect, useMemo, useState } from "react";

import { io } from "socket.io-client";
function App() {
  const [message, setMessage] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });
    socket.on("new-message", (d) => {
      console.log(d);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <div className="bg-red-100 w-210 h-300">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex w-100 h-100 items-center"
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-black"
        ></textarea>
        <button type="submit" className="bg-black text-white">
          send
        </button>
      </form>
    </div>
  );
}

export default App;
