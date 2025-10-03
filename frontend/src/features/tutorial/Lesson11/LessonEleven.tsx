import Button from "./Button";

const LessonEleven = () => {
  const handlePlayMovie = () => {
    alert("Playing movie...");
  };
  const handleUploading = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert("Uploading...");
    e.stopPropagation();
  };

  return (
    <div>
      <h1>Responding to event</h1>
      <div
        style={{ display: "flex", gap: "10px", backgroundColor: "#ffff00", padding: "10px", borderRadius: "5px" }}
        onClick={() => alert("You clicked the yellow container!")}
      >
        <Button onSmash={handlePlayMovie}>Play movie</Button>
        <Button onSmash={handleUploading}>Upload</Button>
      </div>
      <a href="https://react.dev/learn/responding-to-events" target="_blank" onClick={(e) => (e.preventDefault(), alert("Link clicked"))}>
        Read more
      </a>
      <br />
      <a href="https://react.dev/learn/responding-to-events" target="_blank" onClick={() => alert("Link clicked")}>
        Read more
      </a>
    </div>
  );
};
export default LessonEleven;
