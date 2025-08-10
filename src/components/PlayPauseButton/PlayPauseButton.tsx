import { useState, useEffect } from "react";

type PlayPauseButtonProps = {
  party_id: string;
}

export const PlayPauseButton = (props: PlayPauseButtonProps) => {

  const { party_id } = props;

  const [ws, setWs] = useState<WebSocket | null>(null);

  const handleButtonClick = async () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        "action": "toggle_pause",
        "party_id": party_id,
        "user_id": "1", // TODO: get user id from localStorage
      }))
    } else {
      console.log("WebSocket connection not open");
    }
  };

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('pp-access-token');
    
    if (!token) {
      console.error("No auth token found in localStorage");
      return;
    }
    
    const ws = new WebSocket(`ws://localhost:8000/ws/party/?token=${token}&party_id=${party_id}`);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setWs(ws);
    };

    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const video = document.querySelector("video");
      if (video) {
        video.paused ? video.play() : video.pause();
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket connection error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };

    return () => {
      ws.close();
    };
  }, [party_id]);

  return (
    <button
      id="yt-overlay-btn"
      onClick={handleButtonClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        fontSize: "24px",
        padding: "10px",
        borderRadius: "50%",
        backgroundColor: "#ff0000",
        color: "white",
        border: "none",
        cursor: "pointer"
      }}
    >
      ⏯️
    </button>
  );
};