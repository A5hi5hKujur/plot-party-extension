import ReactDOM from "react-dom/client";
import { PlayPauseButton } from "./PlayPauseButton";

let currentRoot: ReactDOM.Root | null = null;

export const mountOverlay = () => {
  // If overlay is already mounted, unmount it
  if (document.getElementById("yt-overlay-root")) {
    unmountOverlay();
    return;
  }

  const container = document.createElement("div");
  container.id = "yt-overlay-root";
  document.body.appendChild(container);

  currentRoot = ReactDOM.createRoot(container);
  currentRoot.render(<PlayPauseButton party_id="2" />);
};

export const unmountOverlay = () => {
  const container = document.getElementById("yt-overlay-root");
  if (container && currentRoot) {
    currentRoot.unmount();
    container.remove();
    currentRoot = null;
  }
};

export const isOverlayMounted = () => {
  return document.getElementById("yt-overlay-root") !== null;
};