import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const LessonThirteen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <h1>How to write an effect</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "Pause" : "Play"}</button>
      <br />
      <VideoPlayer isPlaying={isPlaying} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
    </div>
  );
};
export default LessonThirteen;
