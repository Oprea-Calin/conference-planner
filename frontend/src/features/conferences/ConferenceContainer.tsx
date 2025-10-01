import React from "react";
import { mockData } from "./mockData";
import ConferenceList from "./ConferenceList";
import ConferenceListFilters from "./ConferenceListFilters";

const ConferenceContainer: React.FC = () => {
  return (
    <>
      <ConferenceListFilters />
      <ConferenceList conference={mockData} />
    </>
  );
};

export default ConferenceContainer;
