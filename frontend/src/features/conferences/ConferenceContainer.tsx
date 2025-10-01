import React from "react";
import { useTranslation } from "react-i18next";
import { mockData } from "./mockData";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ConferenceContainer: React.FC = () => {
  const { t } = useTranslation();

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
      {mockData.map((item) => (
        <Card
          key={item.id}
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
          <CardContent>
            <Grid alignItems={"right"} justifyContent={"right"} container mb={2} gap={2}>
              <EditIcon />
              <DeleteIcon />
            </Grid>
            <Grid container direction="column" gap={2}>
              <Grid container justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 1 }}>
                <GroupsIcon />
                <Typography variant="h6" fontWeight={600}>
                  {item.name}
                </Typography>
                <Chip label={item.conferenceTypeName} sx={{ textTransform: "capitalize" }} />
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                padding={1}
                sx={{ backgroundColor: "#fafafa", borderRadius: 1 }}
              >
                <Grid>
                  <Typography fontWeight={500}>Locatie:</Typography>
                  <Typography>{item.locationName}</Typography>
                </Grid>
                <Grid>
                  <Typography fontWeight={500}>Tara:</Typography>
                  <Typography>{item.country}</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                padding={1}
                alignItems="center"
                sx={{ backgroundColor: "#fafafa", borderRadius: 1 }}
              >
                <Grid>
                  <Typography fontWeight={500}>Data inceput:</Typography>
                  <Typography>{item.startDate.trim()}</Typography>
                </Grid>
                <Grid>
                  <Typography fontWeight={500}>Data final:</Typography>
                  <Typography>{item.endDate.trim()}</Typography>
                </Grid>
              </Grid>

              <Grid container justifyContent="space-between" padding={1} sx={{ backgroundColor: "#fafafa", borderRadius: 1 }}>
                <Grid>
                  <Typography fontWeight={500}>Speaker principal:</Typography>
                  <Typography>{item.mainSpeakerName}</Typography>
                </Grid>
              </Grid>

              <Grid container direction="column" padding={1} sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                <Typography fontWeight={500} mb={1}>
                  Participanti ({item.attendeesList.length}):
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {item.attendeesList.map((name, idx) => (
                    <Chip key={idx} label={name} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default ConferenceContainer;
