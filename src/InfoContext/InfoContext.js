import React, { useState, createContext } from "react";
import io from "socket.io-client";
export const InfoContext = createContext();
const InfoContextProvider = ({ children }) => {
  const [isHoster, setIsHoster] = useState(false);
  const [Socket, setSocket] = useState(
    io("https://backend-dice-game.herokuapp.com/")
  );
  const [RoomId, setRoomId] = useState("");
  const [HosterName, setHosterName] = useState("");
  const [FriendName, setFriendName] = useState("");
  const [FriendId, setFriendId] = useState("");

  return (
    <InfoContext.Provider
      value={{
        Socket,
        RoomId,
        setRoomId,
        setHosterName,
        HosterName,
        setFriendName,
        FriendName,
        isHoster,
        setIsHoster,
        FriendId,
        setFriendId,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
export default InfoContextProvider;
