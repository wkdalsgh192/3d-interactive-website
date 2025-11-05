import React, { useEffect } from "react";
import LiveChatClient from "../../components/LiveChatClient";

const LiveChatOverlayPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  const containerStyle = {
    margin: "10% 20px",
  };

  return (
    <div style={containerStyle}>
      <nav>
        <p>
          <a href="/">Minho's</a> / <a href="/projects">Projects</a> / Live Chat Overlay
        </p>
      </nav>

      <h1>🎥 Live Chat Overlay</h1>

      <h2>Overview</h2>
      <p>
        The <b>Live Chat Overlay</b> is a lightweight real-time chat system built to emulate
        the interactive chat features of live-streaming platforms like Twitch or YouTube Live.
        It enables messages from multiple viewers to appear instantly on screen with smooth
        animations and a transparent background suitable for integration into OBS or web-based
        streaming overlays.
      </p>

      <h2>Motivation</h2>
      <p>
        I developed this project as a quick, one-day demo to showcase my understanding of
        <b> real-time communication systems</b>, <b>frontend rendering optimization</b>, and
        <b> websocket-based architecture</b> in the context of modern live-streaming applications.
      </p>

      <h2>My Contributions</h2>
      <ul>
        <li>Implemented a real-time chat backend using Flask-SocketIO with event-based message broadcasting.</li>
        <li>Built a React + TypeScript frontend with animated message rendering and responsive layout for OBS embedding.</li>
        <li>Designed a modular chat component that supports auto-fading old messages and random user colors for visual distinction.</li>
        <li>Integrated cross-tab synchronization via WebSocket channels to demonstrate low-latency updates.</li>
      </ul>

      <h2>Technical Highlights</h2>
      <ul>
        <li>Used <b>Socket.IO</b> for bi-directional message delivery between clients and the Flask server.</li>
        <li>Implemented message throttling and animation effects for better UX and visual polish.</li>
        <li>Deployed frontend on <b>Vercel</b> and backend on <b>Render</b> for end-to-end live demo hosting.</li>
      </ul>

      <h2>Demo</h2>

      <div
        style={{
          border: "1px solid gray",
          borderRadius: "12px",
          overflow: "hidden",
          height: "400px",
          width: "100%",
          maxWidth: "600px",
          marginTop: "30px",
        }}
      >
        <LiveChatClient />
      </div>
      

      <h2>Technologies Used</h2>
      <p>
        Flask, Flask-SocketIO, React, TypeScript, TailwindCSS, Socket.IO, Render, Vercel
      </p>
    </div>
  );
};

export default LiveChatOverlayPage;
