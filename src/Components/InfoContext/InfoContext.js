import React, { useState, createContext, useEffect } from "react";
import io from "socket.io-client";
export const InfoContext = createContext();
const InfoContextProvider = ({ children }) => {
  const [Socket, setSocket] = useState(io("http://localhost:5000"));
  const [RoomId, setRoomId] = useState("");

  useEffect(() => {
    console.log(
      "==================================================================================="
    );
  }, []);
  return (
    <InfoContext.Provider value={{ Socket, RoomId, setRoomId }}>
      {children}
    </InfoContext.Provider>
  );
};
export default InfoContextProvider;
