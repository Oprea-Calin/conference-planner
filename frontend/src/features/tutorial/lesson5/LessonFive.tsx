import { useState } from "react";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

const LessonFive: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let content: React.ReactElement;
  if (isLoggedIn) content = <AdminPanel />;
  else content = <UserPanel />;

  return (
    <>
      <h1>Lesson FIVE</h1>
      <hr />
      <h2> Varianta 1 : if </h2>
      <div>{content}</div>
      <div>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? "Log out" : "Log in"}</button>
        <hr />
      </div>
      <h2>Varianta 2: ternary operator (inline if)</h2>
      {isLoggedIn ? <AdminPanel /> : <UserPanel />}
      <hr />
      <h2>Varianta 3: &&</h2>
      {isLoggedIn && <AdminPanel />}
      {!isLoggedIn && <UserPanel />}
    </>
  );
};

export default LessonFive;
