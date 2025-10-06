import { Box, Card, CardContent, Chip, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import type { ConferenceDto } from "types";

const ConferenceCard: React.FC<{ item: ConferenceDto }> = ({ item }) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        minWidth: 300,
        position: "relative",
        paddingBottom: 2
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {item.name}
        </Typography>

        <Chip label={item.conferenceTypeName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2">
            <strong>Speaker:</strong> {item.mainSpeakerName}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <RoomIcon fontSize="small" />
          <Typography variant="body2">
            {item.cityName}, {item.countyName.toUpperCase()}, {item.countryName.toUpperCase()}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()} |{" "}
          {new Date(item.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
          {new Date(item.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Typography>

        <Button size="small" variant="contained" sx={{ mt: 1, textTransform: "none", borderRadius: 4 }}>
          {item.atendeesList.length} attendees
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConferenceCard;
