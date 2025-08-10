import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [overlayActive, setOverlayActive] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Dummy API call to JSONPlaceholder
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        const data = await response.json()
        setApiData(data)
      } catch (err) {
        setError('Failed to fetch data')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    const checkOverlayState = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab.id && tab.url && tab.url.includes("youtube.com")) {
          try {
            // Try to check if overlay is mounted by sending a message
            const response = await chrome.tabs.sendMessage(tab.id, { action: "checkOverlayState" });
            if (response && response.overlayMounted) {
              setOverlayActive(true);
            }
          } catch (messageError) {
            console.log("Content script not ready during state check");
            setOverlayActive(false);
          }
        }
      } catch (error) {
        // Content script not ready or not on YouTube
        setOverlayActive(false);
      }
    };

    fetchData()
    checkOverlayState()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button 
          className="overlay-toggle" 
          onClick={async () => {
            try {
              // Get the current active tab
              const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
              console.log("Tab:", tab);
              
              if (tab.id && tab.url && tab.url.includes("youtube.com")) {
                try {
                  // First, try to send message to existing content script
                  const response = await chrome.tabs.sendMessage(tab.id, { action: "toggleOverlay" });
                  console.log("Overlay toggled:", response);
                  setOverlayActive(!overlayActive);
                } catch (messageError) {
                  console.log("Content script not ready, injecting...");
                  
                  // If message fails, inject the content script programmatically
                  await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['src/content.tsx']
                  });
                  
                  // Wait a bit for the script to initialize, then try again
                  setTimeout(async () => {
                    try {
                      const response = await chrome.tabs.sendMessage(tab.id!, { action: "toggleOverlay" });
                      console.log("Overlay toggled after injection:", response);
                      setOverlayActive(!overlayActive);
                    } catch (retryError) {
                      console.error("Still failed after injection:", retryError);
                    }
                  }, 500);
                }
              } else {
                // If not on YouTube, open YouTube
                chrome.tabs.create({ url: "https://www.youtube.com" });
              }
            } catch (error) {
              console.error("Error toggling overlay:", error);
              // If there's an error, open YouTube
              chrome.tabs.create({ url: "https://www.youtube.com" });
            }
          }}
          style={{
            backgroundColor: overlayActive ? '#4CAF50' : '#ff0000',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {overlayActive ? 'Overlay Active' : 'Toggle Overlay'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {loading ? (
          'Loading API data...'
        ) : error ? (
          `Error: ${error}`
        ) : (
          <pre style={{ textAlign: 'left', fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(apiData, null, 2)}
          </pre>
        )}
      </p>
    </>
  )
}

export default App
