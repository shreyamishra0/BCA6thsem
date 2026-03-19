import { useState } from "react";
import Java from "./Java";
import Networking from "./Networking";
import "./App.css";
import Mobile from "./MobileProgramming";
import DS from "./DS";
import Eco from "./economics";

export default function App() {
  const [activeSubject, setActiveSubject] = useState("java");

  const subjects = {
    java: <Java />,
    networking: <Networking />,
    mobile: <Mobile />,
    ds: <DS />,
    eco: <Eco />
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Notes</h1>
      <div style={styles.nav}>
        <button onClick={() => setActiveSubject("java")}>Java</button>
        <button onClick={() => setActiveSubject("networking")}>Networking</button>
        <button onClick={() => setActiveSubject("mobile")}>Mobile Programming</button>
        <button onClick={() => setActiveSubject("ds")}>DS</button>
        <button onClick={() => setActiveSubject("eco")}>Economics</button>
      </div>

      <div>
        {subjects[activeSubject]}
      </div>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial",
    padding: "20px",
  },
  title: {
    textAlign: "center",
  },
  nav: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  content: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
};
