import { Box, Card, CardContent, Chip, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import type { ConferenceDto, ConferenceXAtendee } from "types";
import { toast } from "react-toastify";
import { deleteMutationFetcher, fetcher, putMutationFetcher, useApiSWR, useApiSWRMutation } from "units/swr";
import { endpoints } from "utils";
import { useSubscription } from "units/notifications";
import { notificationTypes } from "constants";
import { t } from "i18next";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { EmailProvider, useEmail } from "features/home/EmailContext";
import { useLocalStorage } from "hooks/useLocalStorage";
import { mutate } from "swr";

const ConferenceCard: React.FC<{ item: ConferenceDto; onEdit: (conference: ConferenceDto) => void; canEdit?: boolean }> = ({
  item,
  onEdit,
  canEdit
}) => {
  const { mutate: refetchConferenceList } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("User.error", { message: err.message }))
  });

  const { email, setEmail } = useEmail();

  let isJoined = false;
  let status = "";

  let ind = -1;
  // console.log(
  //   "ITEM:",
  //   item.atendeesList.some((a: ConferenceXAtendee) => a.atendeeEmail == email)
  // );

  for (let i = 0; i < item.atendeesList.length; i++) {
    if (item.atendeesList[i].atendeeEmail == email) {
      isJoined = true;
      status = item.atendeesList[i].statusName;
      ind = i;

      break;
    }
  }

  // console.log("ASDADS:", isJoined);
  // console.log("ASDADS:", status);
  // console.log("ASDADS:", email);

  const { trigger: deleteConference, isMutating: isDeletingConference } = useApiSWRMutation(
    endpoints.conferences.deleteConference,
    deleteMutationFetcher<{ id: number }>,
    {
      onError: (error) => {
        toast.error(`Error deleting conference: ${error.message}`);
      }
    }
  );

  const { trigger: changeAttendStatus } = useApiSWRMutation(endpoints.conferences.changeAttendStatus, putMutationFetcher, {
    onSuccess: () => {
      toast.success("Status updated!");
      refetchConferenceList();
    },
    onError: () => {
      toast.error("Could not update status.");
    }
  });
  const attendConference = ({ id, email }) => {
    changeAttendStatus({
      ConferenceId: id,
      NewStatusId: 1,
      AtendeeEmail: email
    });
    refetchConferenceList();
  };

  const withdrawConference = ({ id, email }) => {
    changeAttendStatus({
      ConferenceId: id,
      NewStatusId: 2, //  2 = WITHDRAWN
      AtendeeEmail: email
    });
    refetchConferenceList();
  };
  // let attendee = item.atendeesList[ind].statusId;

  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 2,
        minWidth: 300,
        position: "relative",
        paddingBottom: 2,
        marginBottom: 2,
        marginTop: 2
      }}
    >
      {canEdit && (
        <Box sx={{ position: "absolute", top: 5, right: 8 }}>
          <IconButton size="medium" style={{ color: "" }}>
            <EditIcon
              fontSize="small"
              onClick={() => {
                onEdit(item);
              }}
            />
          </IconButton>
          <IconButton size="medium" style={{ color: "red" }}>
            <DeleteIcon
              fontSize="small"
              onClick={() => {
                deleteConference({ id: item.id });
              }}
            />
          </IconButton>
        </Box>
      )}

      <CardContent style={{ paddingTop: 28 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {item.name}
        </Typography>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Chip label={item.conferenceTypeName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
          <Chip label={item.categoryName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2">
            <strong>Speaker:</strong> {item.mainSpeakerName}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocationCityIcon fontSize="small" />
          <Typography variant="body2">
            {item.cityName}, {item.countyName.toUpperCase()}, {item.countryName.toUpperCase()}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="body2">
            <RoomIcon fontSize="small" />
            <strong></strong> {item.address}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <CalendarMonthIcon fontSize="small" />
            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Button size="small" variant="contained" sx={{ mt: 1, textTransform: "none", borderRadius: 4 }}>
          {item.atendeesList.length} attendees
        </Button>

        {!canEdit && (
          <Box mt={2}>
            {status === "Withdrawn" ? (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => attendConference({ id: item.id, email })}
                  sx={{ mr: 1 }}
                >
                  Attend
                </Button>
                <Typography component="span" color="text.secondary" sx={{ fontStyle: "italic", verticalAlign: "middle" }}>
                  Withdrawn
                </Typography>
              </>
            ) : status === "Attended" ? (
              <Typography component="span" color="success.main" sx={{ fontWeight: "bold", mr: 1, verticalAlign: "middle" }}>
                Attended
              </Typography>
            ) : status === "Joined" ? (
              <>
                <Chip label="Joined" color="success" sx={{ mr: 1 }} />
                <Button size="small" variant="outlined" color="error" onClick={() => withdrawConference({ id: item.id, email })}>
                  Withdraw
                </Button>
              </>
            ) : (
              <Button size="small" variant="contained" color="primary" onClick={() => attendConference({ id: item.id, email })}>
                Attend
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ConferenceCard;
