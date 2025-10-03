import { Grid } from "@mui/material";
import ConferenceCard from "./ConferenceCard";
import type { JSX } from "react";
import type { ConferenceDto } from "types/dto";

const ConferenceList: React.FC<{ conferences: ConferenceDto[]; filterText: string; filterStartDate: Date; filterEndDate: Date }> = ({
  conferences,
  filterText,
  filterStartDate,
  filterEndDate
}) => {
  const rows: JSX.Element[] = [];
  conferences.forEach((conference) => {
    if (conference.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    const sd = new Date(conference.startDate);
    const ed = new Date(conference.endDate);

    if (sd < filterStartDate || ed > filterEndDate) {
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
