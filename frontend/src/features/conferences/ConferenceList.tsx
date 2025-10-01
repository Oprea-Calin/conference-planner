import { mockData, type Conference } from "./mockData";
import { Card, Grid } from "@mui/material";

import ConferenceCard from "./ConferenceCard";
const ConferenceList: React.FC<{ conference: Conference[] }> = () => {
  return (
    <Grid
      container
      spacing={2}
      size={{ xs: 6, md: 4 }}
      overflow={"auto"}
      justifyContent="center"
      // sx={{
      //   height: "80vh",
      //   // overflowY: "auto",
      //   display: "grid",
      //   px: 2,
      //   py: 1
      // }}
    >
      {mockData.map((conference) => (
        <Card
          key={conference.id}
          sx={{
            maxWidth: 600,
            width: "100%",
            paddingLeft: 2,
            paddingRight: 2,
            paddingBottom: 2,

            mb: 3,
            boxShadow: 3,
            borderRadius: 2
          }}
        >
          <ConferenceCard item={conference} />
        </Card>
      ))}
    </Grid>
  );
};

export default ConferenceList;
