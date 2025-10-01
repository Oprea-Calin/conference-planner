import React from "react";
import { mockData } from "./mockData";
import ConferenceList from "./ConferenceList";

const ConferenceContainer: React.FC = () => {
  return (
    <>
      <div>Conference Container</div>
      <ConferenceList conference={mockData} />
    </>
  );
};

export default ConferenceContainer;
