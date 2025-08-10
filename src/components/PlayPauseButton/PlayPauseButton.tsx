export const PlayPauseButton = () => {
  const handleButtonClick = async () => {
    // Toggle video
    const video = document.querySelector("video");
    if (video) {
      video.paused ? video.play() : video.pause();
    }

    // Make dummy API call
    try {
      console.log('Making API call...');
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      console.log('API Response:', data);
      
      // You can also show an alert with the data
      alert(`API Call Successful!\nTitle: ${data.title}\nBody: ${data.body.substring(0, 50)}...`);
    } catch (error) {
      console.error('API Error:', error);
      alert('API call failed!');
    }
  };

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