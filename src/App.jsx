import "./App.css";
import React from "react";
import profilePic from "./hsnice16.png";
import openInNew from "./open-in-new.svg";

function App() {
  function handleFullViewClick() {
    window.open(window.chrome.runtime.getURL("index.html"));
  }

  async function handleChangeTextClick() {
    const [tab] = await window.chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const message = {
      for: "BACKGROUND",
      body: "Life is shitt.",
    };

    window.chrome.runtime.sendMessage({ message, tab });
  }

  return (
    <div className="app">
      <button onClick={handleFullViewClick}>
        Full View <img src={openInNew} alt="open in new" />
      </button>
      <h1 data-testing-id="h1-ele">You're staring at my extension</h1>
      <div />
      <button onClick={handleChangeTextClick}>
        Change the paragraph text of the page
      </button>
      <a href="https://twitter.com/hsnice16" target="_blank" rel="noreferrer">
        <img src={profilePic} alt="profile pic" /> @hsnice16
      </a>
    </div>
  );
}

export default App;
