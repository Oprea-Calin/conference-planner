import { useState } from "react";
import MyButton from "../lesson9/MyButton";

const LessonNine: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const handleClick = () => setCount(count + 1);
  return (
    <>
      <h1>Lesson Nine</h1>
      <div>
        <MyButton counter={count} onClick={handleClick} />
        <br />
        <MyButton counter={count} onClick={handleClick} />
      </div>
    </>
  );
};

export default LessonNine;
