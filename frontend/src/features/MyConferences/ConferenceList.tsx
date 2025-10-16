import { Box, Grid } from "@mui/material";
import ConferenceCard from "./ConferenceCard";
import type { JSX } from "react";
import type { ConferenceDto } from "types/dto";

const ConferenceList: React.FC<{
  conferences: ConferenceDto[];
  onEdit?: (conference: ConferenceDto) => void;
  canEdit?: boolean;
  filterText: string;
  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;
  filterConferenceTypeName: string;
  filterCity: string;
  filterCounty: string;
  filterCountry: string;
}> = ({
  conferences,
  onEdit,
  canEdit,
  filterText,
  filterStartDate,
  filterEndDate,
  filterConferenceTypeName,
  filterCity,
  filterCounty,
  filterCountry
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

    rows.push(<ConferenceCard item={conference} key={conference.id} onEdit={onEdit} canEdit={canEdit} />);
  });

  // return (
  //   <Grid container spacing={2} size={{ xs: 6, md: 4 }} overflow={"auto"} justifyContent="center">
  //     {rows}
  //   </Grid>
  // );
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        justifyContent: "center",
        marginBottom: 10
      }}
    >
      {conferences
        .filter((conference) => {
          if (conference.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return false;
          const sd = new Date(conference.startDate);
          const ed = new Date(conference.endDate);
          if (sd < filterStartDate || ed > filterEndDate) return false;
          if (conference.conferenceTypeName.toLowerCase().indexOf(filterConferenceTypeName.toLowerCase()) === -1) return false;
          if (conference.countyName.toLowerCase().indexOf(filterCounty.toLowerCase()) === -1) return false;
          if (conference.countryName.toLowerCase().indexOf(filterCountry.toLowerCase()) === -1) return false;
          if (conference.cityName.toLowerCase().indexOf(filterCity.toLowerCase()) === -1) return false;
          return true;
        })
        .map((conference) => (
          <Box key={conference.id} sx={{ flex: "0 1 300px" }}>
            <ConferenceCard item={conference} onEdit={onEdit} canEdit={canEdit} />
          </Box>
        ))}
    </Box>
  );
};

export default ConferenceList;
