import { type Conference } from "./mockData";
import { Grid } from "@mui/material";
import ConferenceCard from "./ConferenceCard";
import type { JSX } from "react";

const ConferenceList: React.FC<{ conferences: Conference[]; filterText: string }> = ({ conferences, filterText }) => {
  const rows: JSX.Element[] = [];
  conferences.forEach((conference) => {
    if (conference.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    rows.push(<ConferenceCard item={conference} key={conference.id} />);
  });

  return (
    <Grid container spacing={2} size={{ xs: 6, md: 4 }} overflow={"auto"} justifyContent="center">
      {rows}
    </Grid>
  );
};

export default ConferenceList;
