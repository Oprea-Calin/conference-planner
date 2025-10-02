import React, { useState } from "react";
import { mockData } from "./mockData";
import ConferenceList from "./ConferenceList";
import ConferenceListFilters from "./ConferenceListFilters";

const ConferenceContainer: React.FC = () => {
  const [filterText, setFilterText] = useState<string>("");

  return (
    <>
      <ConferenceListFilters filterText={filterText} onFilterTextChange={setFilterText} />
      <ConferenceList conferences={mockData} filterText={filterText} />
    </>
  );
};

export default ConferenceContainer;
