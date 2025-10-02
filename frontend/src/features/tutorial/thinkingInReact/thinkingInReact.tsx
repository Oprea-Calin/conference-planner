import FilterableProductTable from "./FilterableProductTable";
import { mockup } from "./mockup";

const ThinkingInReact: React.FC = () => {
  return (
    <>
      <h1>Lesson Thinking In React</h1>
      <FilterableProductTable products={mockup} />
      <div></div>
    </>
  );
};

export default ThinkingInReact;
