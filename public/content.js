function createOverlayButton() {
    // Avoid duplicate buttons
    if (document.getElementById("yt-overlay-btn")) return;
  
    const btn = document.createElement("button");
    btn.id = "yt-overlay-btn";
    btn.textContent = "⏯️";
  
    btn.onclick = () => {
      const video = document.querySelector("video");
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();s
        }
      }
    };
  
    document.body.appendChild(btn);
}
  
function initIfVideoExists() {
    const video = document.querySelector("video");
    if (video) {
      createOverlayButton();
    }
}
  
// For SPA behavior on YouTube — re-run logic when URL changes
let lastUrl = location.href;
new MutationObserver(() => {
const currentUrl = location.href;
if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    setTimeout(initIfVideoExists, 1000); // delay to wait for video element
}
}).observe(document, { subtree: true, childList: true });

// Also run on first load
window.addEventListener("load", () => {
setTimeout(initIfVideoExists, 1000);
});
  