import { useState } from "react";
import "./App.css";
import Notification from "./components/Notification";

function App() {
  return (
    <main className=" grid place-items-center md:py-16">
      <Notification />
    </main>
  );
}

export default App;
