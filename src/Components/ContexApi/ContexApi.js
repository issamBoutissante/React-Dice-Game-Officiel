import React from "react";
export const Context = React.createContext({
  Socket: null,
  setSocket: (soc) => {},
  RoomId: "",
  setRoomId: () => {},
});

export default Context;
