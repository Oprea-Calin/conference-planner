import { CardContent, Chip, Grid, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ConferenceDto } from "types";

const ConferenceCard: React.FC<{ item: ConferenceDto }> = ({ item }) => {
  return (
    <Grid container sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
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
            <Chip label={item.conferenceType} sx={{ textTransform: "capitalize" }} />
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
              <Typography>{item.countryName}</Typography>
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
              <Typography>{new Date(item.startDate).toLocaleDateString()}</Typography>
            </Grid>
            <Grid>
              <Typography fontWeight={500}>Data final:</Typography>
              <Typography>{new Date(item.endDate).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" padding={1} sx={{ backgroundColor: "#fafafa", borderRadius: 1 }}>
            <Grid>
              <Typography fontWeight={500}>Speaker principal:</Typography>
              <Typography>{item.mainSpeakerName}</Typography>
            </Grid>
            <Grid>
              <Typography fontWeight={500}>Participanti: </Typography>
              <Typography>{item.atendeesList.length}</Typography>
            </Grid>
          </Grid>

          {/* <Grid container direction="column" padding={1} sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <Typography fontWeight={500} mb={1}>
            Participanti {item.attendeesList.length}:
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {item.attendeesList.map((name, idx) => (
              <Chip key={idx} label={name} />
            ))}
          </Box>
        </Grid> */}
        </Grid>
      </CardContent>
    </Grid>
  );
};

export default ConferenceCard;
