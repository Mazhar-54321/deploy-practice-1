import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoUrl }) => {
  const videoId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();

  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: "100%",
        playerVars: { autoplay: 1, controls: 1 },
      }}
    />
  );
};

export default YouTubePlayer;
