import { Grid } from "@mui/material";
import ConferenceCard from "./ConferenceCard";
import type { JSX } from "react";
import type { ConferenceDto } from "types/dto";

const ConferenceList: React.FC<{
  conferences: ConferenceDto[];
  filterText: string;
  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;
  filterConferenceTypeName: string;
  filterCity: string;
  filterCounty: string;
  filterCountry: string;
}> = ({ conferences, filterText, filterStartDate, filterEndDate, filterConferenceTypeName, filterCity, filterCounty, filterCountry }) => {
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
    if (conference.conferenceTypeName.toLowerCase().indexOf(filterConferenceTypeName.toLowerCase()) === -1) {
      return;
    }
    if (conference.countyName.toLowerCase().indexOf(filterCounty.toLowerCase()) === -1) {
      return;
    }
    if (conference.countryName.toLowerCase().indexOf(filterCountry.toLowerCase()) === -1) {
      return;
    }
    if (conference.cityName.toLowerCase().indexOf(filterCity.toLowerCase()) === -1) {
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
