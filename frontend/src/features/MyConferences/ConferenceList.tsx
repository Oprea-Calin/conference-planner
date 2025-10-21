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

          const isRemote = conference.conferenceTypeName.toLowerCase() === "remote";

          const countyMatches = conference.countyName.toLowerCase().includes(filterCounty.toLowerCase());
          const countryMatches = conference.countryName.toLowerCase().includes(filterCountry.toLowerCase());
          const cityMatches = conference.cityName.toLowerCase().includes(filterCity.toLowerCase());

          if ((filterCountry || filterCounty || filterCity) && isRemote) {
            return false;
          }

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
};

export default ConferenceList;
