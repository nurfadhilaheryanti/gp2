// import React, { useEffect, useRef, useState } from "react";
// import Peer from "simple-peer";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import io from "socket.io-client";
import "./App.css";
import { RoomProvider } from "./Meet/RoomProvider";

// const socket = io.connect("http://localhost:5001");

function App() {
  return (
    <>
      {/* <RoomProvider> */}
        <RouterProvider router={router}></RouterProvider>
      {/* </RoomProvider> */}
    </>
  );
}

export default App;
