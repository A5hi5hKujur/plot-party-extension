chrome.action.onClicked.addListener((_tab) => {
    console.log("Toolbar icon clicked. Opening YouTube...");
  
    chrome.tabs.create({
      url: "https://www.youtube.com"
    });
  });