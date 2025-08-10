import { mountOverlay } from "./components/PlayPauseButton/mount";

console.log("PlotParty content script loaded on:", window.location.href);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("Content script received message:", message);
  
  if (message.action === "toggleOverlay") {
    console.log("Toggling overlay...");
    mountOverlay();
    sendResponse({ success: true, action: "toggleOverlay" });
  }
  
  if (message.action === "checkOverlayState") {
    const isMounted = document.getElementById("yt-overlay-root") !== null;
    console.log("Overlay state checked:", isMounted);
    sendResponse({ overlayMounted: isMounted });
  }
  
  // Always return true to indicate we'll send a response asynchronously
  return true;
});

function initIfVideoExists() {
  console.log("initIfVideoExists");
  const video = document.querySelector("video");
  if (video) {
    // Don't auto-mount on page load anymore
    // mountOverlay();
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