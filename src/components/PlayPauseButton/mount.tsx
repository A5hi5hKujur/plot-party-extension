import ReactDOM from "react-dom/client";
import { PlayPauseButton } from "./PlayPauseButton";

export const mountOverlay = () => {
  if (document.getElementById("yt-overlay-root")) return;

  const container = document.createElement("div");
  container.id = "yt-overlay-root";
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<PlayPauseButton />);
};