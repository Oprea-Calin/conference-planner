const LessonSeven: React.FC = () => {
  const handleClick = () => {
    alert("button clicked");
  };

  return (
    <>
      <h1>Lesson Seven</h1>
      <div>
        <h2>Responding to events</h2>
        <button onClick={handleClick}>Click?</button>
      </div>
    </>
  );
};

export default LessonSeven;
