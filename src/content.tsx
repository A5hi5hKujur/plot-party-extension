import { mountOverlay } from "./components/PlayPauseButton/mount";

function initIfVideoExists() {
  const video = document.querySelector("video");
  if (video) {
    mountOverlay();
  }
}

// For SPA-like behavior on YouTube
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    setTimeout(initIfVideoExists, 1000);
  }
}).observe(document, { subtree: true, childList: true });

window.addEventListener("load", () => {
  setTimeout(initIfVideoExists, 1000);
});