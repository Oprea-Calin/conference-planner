import { useState } from "react";
import type { Conference } from "././mockData";

const FilterableConferences: React.FC<{ conferences: Conference[] }> = ({ conferences }) => {
  const [filterText, setFilterText] = useState<string>("");

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <ProductTable conferences={conferences} filterText={filterText} />
    </div>
  );
};
export default FilterableConferences;
