// @ts-nocheck
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SampleDrawer1 from "./SampleDrawer1";
// @ts-ignore
import FirebaseAuth from "./firebaseAuth";
import React, { useEffect, useState } from "react";
import "firebaseui/dist/firebaseui.css";
import { app } from "./firebaseConfig";
import SignIn from "./signIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SignOut from "./SignOut";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentPortal from "./components/StudentPortal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SampleDrawer1 />
      </ThemeProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />{" "}
    </div>
  );
}

export default App;
