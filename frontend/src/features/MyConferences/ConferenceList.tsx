import { Box, Grid } from "@mui/material";
import ConferenceCard from "./ConferenceCard";
import type { JSX } from "react";
import type { ConferenceDto } from "types/dto";
import { useEmail } from "features/home/EmailContext";

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
  statusFilter: string;
  timeFilter: string;
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
  filterCountry,
  statusFilter,
  timeFilter
}) => {
  const rows: JSX.Element[] = [];
  const { email, setEmail } = useEmail();

  conferences.forEach((conference) => {
    if (conference.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    const sd = new Date(conference.startDate);
    const ed = new Date(conference.endDate);
    let status = "";
    for (let i = 0; i < conference.atendeesList.length; i++) {
      if (conference.atendeesList[i].atendeeEmail == email) {
        status = conference.atendeesList[i].statusName;

        break;
      }
    }

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
    if (statusFilter && status?.toLowerCase() !== statusFilter.toLowerCase()) {
      return;
    }

    if (timeFilter === "Upcoming" && ed < new Date()) {
      return;
    }
    if (timeFilter === "Ended" && ed >= new Date()) {
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
          const nameMatches = conference.name.toLowerCase().includes(filterText.toLowerCase());
          const sd = new Date(conference.startDate);
          const ed = new Date(conference.endDate);

          const dateMatches = (!filterStartDate || sd >= filterStartDate) && (!filterEndDate || ed <= filterEndDate);

          const typeMatches = conference.conferenceTypeName.toLowerCase().includes(filterConferenceTypeName.toLowerCase());
          const countyMatches = conference.countyName.toLowerCase().includes(filterCounty.toLowerCase());
          const countryMatches = conference.countryName.toLowerCase().includes(filterCountry.toLowerCase());
          const cityMatches = conference.cityName.toLowerCase().includes(filterCity.toLowerCase());

          let status = "";
          for (let i = 0; i < conference.atendeesList.length; i++) {
            if (conference.atendeesList[i].atendeeEmail === email) {
              status = conference.atendeesList[i].statusName;
              break;
            }
          }

          const statusMatches = !statusFilter || status.toLowerCase() === statusFilter.toLowerCase();

          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);

          const timeMatches =
            !timeFilter || (timeFilter === "Upcoming" && ed >= startOfToday) || (timeFilter === "Ended" && ed < startOfToday);

          return (
            nameMatches && dateMatches && typeMatches && countyMatches && countryMatches && cityMatches && statusMatches && timeMatches
          );
        })
        .map((conference) => (
          <Box key={conference.id} sx={{ flex: "0 1 300px" }}>
            <ConferenceCard item={conference} onEdit={onEdit} canEdit={canEdit} />
          </Box>
        ))}
    </Box>
  );

  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       gap: 6,
  //       justifyContent: "center",
  //       marginBottom: 10
  //     }}
  //   >
  //     {conferences
  //       .filter((conference) => {
  //         const nameMatches = conference.name.toLowerCase().includes(filterText.toLowerCase());
  //         const sd = new Date(conference.startDate);
  //         const ed = new Date(conference.endDate);

  //         const dateMatches = (!filterStartDate || sd >= filterStartDate) && (!filterEndDate || ed <= filterEndDate);

  //         const typeMatches = conference.conferenceTypeName.toLowerCase().includes(filterConferenceTypeName.toLowerCase());
  //         const countyMatches = conference.countyName.toLowerCase().includes(filterCounty.toLowerCase());
  //         const countryMatches = conference.countryName.toLowerCase().includes(filterCountry.toLowerCase());
  //         const cityMatches = conference.cityName.toLowerCase().includes(filterCity.toLowerCase());

  //         let status = "";
  //         for (let i = 0; i < conference.atendeesList.length; i++) {
  //           if (conference.atendeesList[i].atendeeEmail === email) {
  //             status = conference.atendeesList[i].statusName;
  //             break;
  //           }
  //         }

  //         const statusMatches = !statusFilter || status.toLowerCase() === statusFilter.toLowerCase();

  //         const now = new Date();
  //         const timeMatches = !timeFilter || (timeFilter === "Upcoming" && ed >= now) || (timeFilter === "Ended" && ed <= now);

  //         return (
  //           nameMatches && dateMatches && typeMatches && countyMatches && countryMatches && cityMatches && statusMatches && timeMatches
  //         );
  //       })
  //       .map((conference) => (
  //         <Box key={conference.id} sx={{ flex: "0 1 300px" }}>
  //           <ConferenceCard item={conference} onEdit={onEdit} canEdit={canEdit} />
  //         </Box>
  //       ))}
  //   </Box>
  // );
};

export default ConferenceList;
