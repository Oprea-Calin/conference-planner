import Cup from "./Cup";
import Recipe from "./Recipe";
import PureCup from "./PureCup";

const LessonTen = () => {
  const cups = [];
  for (let i = 0; i < 3; i++) {
    cups.push(<PureCup guest={i} key={i} />);
  }
  return (
    <div>
      <div>
        <section>
          <h1>Spiced chai recipe</h1>
          <h2> For two: </h2>
          <Recipe drinkers={2} />
          <h2>For a gathering:</h2>
          <Recipe drinkers={4} />
        </section>
      </div>

      <section>
        <Cup />
        <Cup />
        <Cup />
      </section>
      <section>{cups}</section>
    </div>
  );
};
export default LessonTen;
