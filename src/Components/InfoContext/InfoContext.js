import React, { useState, createContext } from "react";
export const InfoContext = createContext();
const InfoContextProvider = ({ children }) => {
  const [Socket, setSocket] = useState("");
  const [RoomId, setRoomId] = useState("");
  return (
    <InfoContext.Provider value={{ Socket, setSocket, RoomId, setRoomId }}>
      {children}
    </InfoContext.Provider>
  );
};
export default InfoContextProvider;
