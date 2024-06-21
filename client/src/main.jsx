import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "toastify-js/src/toastify.css";
import { ContextProvider } from "./context/Context.jsx";
import { RoomProvider } from "./Meet/RoomProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId='395741714104-doh4ctgpolm86c7125nk055lfh2rejhs.apps.googleusercontent.com'> */}
    <RoomProvider>
      <App />
    </RoomProvider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
