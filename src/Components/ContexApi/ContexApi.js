import React from "react";
const Context = React.createContext({
  Socket: null,
  setSocket: (soc) => {},
  RoomId: "",
  setRoomId: () => {},
});
export default Context;
