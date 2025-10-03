import { useState } from "react";

const LessonTwelve = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <h1>Rendering takes a snapshot in time</h1>
      <div style={{ columnCount: 2, columnGap: "20px", justifyContent: "left", display: "flex" }}>
        <h2>{count}</h2>
        <button
          onClick={() => {
            setCount(count + 1);
            setCount(count + 1);
            setCount(count + 1);
          }}
        >
          +3
        </button>
        <button
          onClick={() => {
            setCount((c) => c + 1);
            setCount((c) => c + 1);
            setCount((c) => c + 1);
          }}
        >
          +3
        </button>
      </div>
    </div>
  );
};
export default LessonTwelve;
