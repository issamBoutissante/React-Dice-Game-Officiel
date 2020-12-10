import React, { useState } from "react";
import OnlineGame from "./Components/OnlinePlay/OnlinePlay";
import InfoContextProvider from "./Components/InfoContext/InfoContext";

function App() {
  return (
    <div>
      <InfoContextProvider>
        <OnlineGame></OnlineGame>
      </InfoContextProvider>
    </div>
  );
}

export default App;
