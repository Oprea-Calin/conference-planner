import { Box, Card, CardContent, Chip, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import type { ConferenceDto } from "types";
import { toast } from "react-toastify";
import { deleteMutationFetcher, putMutationFetcher, useApiSWR, useApiSWRMutation } from "units/swr";
import { endpoints } from "utils";
import { t } from "i18next";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEmail } from "features/home/EmailContext";
import {
  CheckCircle as CheckCircleIcon,
  ExitToApp as ExitToAppIcon,
  Replay as ReplayIcon,
  PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

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
  let attendeesNumber = 0;
  for (let i = 0; i < item.atendeesList.length; i++) {
    if (item.atendeesList[i].statusName === "Attended" || item.atendeesList[i].statusName === "Joined") attendeesNumber++;
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
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const hasEnded = new Date(item.endDate) < date;

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
      NewStatusId: 3,
      AtendeeEmail: email
    });
    refetchConferenceList();
  };
  const joinConference = ({ id, email }) => {
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
      NewStatusId: 2,
      AtendeeEmail: email
    });
    refetchConferenceList();
  };
  const [showQRCodeInfo, setShowQRCodeInfo] = useState(false);
  const toggleQRCodeInfo = () => setShowQRCodeInfo(!showQRCodeInfo);
  const navigate = useNavigate();
  const goToDetails = () => {
    navigate(`/ConferenceDetails/${item.id}`);
  };

  // let attendee = item.atendeesList[ind].statusId;
  const renderUserActions = () => {
    if (canEdit) return null;

    const buttonStyles = {
      borderRadius: 3,
      textTransform: "none",
      fontWeight: 500,
      px: 2,
      py: 0.5
    };

    if (status === "Withdrawn" && !hasEnded) {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ReplayIcon />}
            onClick={() => attendConference({ id: item.id, email })}
            sx={buttonStyles}
          >
            Attend
          </Button>
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Withdrawn
          </Typography>
        </Box>
      );
    }
    if (status === "Withdrawn" && hasEnded) {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Withdrawn
          </Typography>
        </Box>
      );
    }

    if (status === "Attended" && !hasEnded) {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => joinConference({ id: item.id, email })}
            sx={buttonStyles}
          >
            Join
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToAppIcon />}
            onClick={() => withdrawConference({ id: item.id, email })}
            sx={buttonStyles}
          >
            Withdraw
          </Button>
        </Box>
      );
    } else if (status === "Attended" && hasEnded) {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="blue" fontWeight={600}>
            Attended
          </Typography>
        </Box>
      );
    }

    if (status === "Joined") {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <CheckCircleIcon color="success" fontSize="small" />
          <Typography color="success.main" fontWeight={600}>
            Joined
          </Typography>
        </Box>
      );
    }

    if (!status && !hasEnded) {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => attendConference({ id: item.id, email })}
          sx={buttonStyles}
        >
          Attend
        </Button>
      );
    }

    return null;
  };

  const [showAllSpeakers, setShowAllSpeakers] = useState(false);

  const hasMainSpeaker = !!item.mainSpeakerName?.trim();
  const fallbackSpeaker = item.speakerList?.[0]?.name || "No speakers";

  const toggleSpeakers = () => setShowAllSpeakers(!showAllSpeakers);

  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 2,
        minWidth: 300,
        height: "100%",
        position: "relative",
        // paddingBottom: 2,
        // marginBottom: 2,
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
        {hasEnded && (
          <Typography variant="body2" color="red" fontWeight="bold" gutterBottom>
            Ended
          </Typography>
        )}
        {!hasEnded && (
          <Typography variant="body2" color="green" fontWeight="bold" gutterBottom>
            Upcoming
          </Typography>
        )}

        <Typography variant="h6" fontWeight={600} gutterBottom>
          {item.name}
        </Typography>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Chip label={item.conferenceTypeName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
          <Chip label={item.categoryName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
        </Box>

        <Box display="flex" flexDirection="column" mb={1}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: item.speakerList?.length > 0 ? "pointer" : "default" }}
            onClick={item.speakerList?.length > 0 ? toggleSpeakers : undefined}
          >
            <PersonIcon fontSize="small" />
            <Typography variant="body2">
              <strong>Speaker:</strong> {hasMainSpeaker ? item.mainSpeakerName : fallbackSpeaker}
            </Typography>
            {item.speakerList?.length > 0 && (
              <ExpandMoreIcon
                sx={{
                  transform: showAllSpeakers ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s"
                }}
              />
            )}
          </Box>

          {showAllSpeakers && item.speakerList?.length > 0 && (
            <Box mt={1} ml={3} display="flex" flexDirection="column" gap={1}>
              {item.speakerList.map((speaker) => (
                <Typography variant="body2" color="text.primary" key={speaker.speakerId}>
                  {speaker.name} {speaker.rating}/5
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        {/* {item.conferenceTypeName === "Remote" && (
          <>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationCityIcon fontSize="small" />
              {item.link}
              <Typography variant="body2"></Typography>
            </Box>
          </>
        )} */}

        {item.conferenceTypeName === "OnSite" && (
          <>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationCityIcon fontSize="small" />
              <Typography variant="body2">
                {item.cityName}, {item.countyName.toUpperCase()}, {item.countryName.toUpperCase()}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <RoomIcon fontSize="small" />
              <Typography variant="body2">
                <strong></strong> {item.address}
              </Typography>
            </Box>
          </>
        )}

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <ContactSupportIcon fontSize="small" />
          <Typography variant="body2">
            <strong></strong> {item.organizerEmail}
          </Typography>
        </Box>
        {item.conferenceTypeName === "Remote" && (
          <>
            <Box display="flex" alignItems="center" gap={1} mb={1} visibility="hidden">
              <LocationCityIcon fontSize="small" />
              <Typography variant="body2">
                {item.cityName}, {item.countyName.toUpperCase()}, {item.countryName.toUpperCase()}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1} visibility="hidden">
              <RoomIcon fontSize="small" />
              <Typography variant="body2">
                <strong></strong> {item.address}
              </Typography>
            </Box>
          </>
        )}

        <Box display="flex" alignItems="flex-start" gap={1} mt={1}>
          <Button size="small" variant="contained" sx={{ mt: 1, textTransform: "none", borderRadius: 4 }}>
            {attendeesNumber} attendees
          </Button>

          <Box
            mt={2}
            sx={{
              width: 64,
              height: 64,
              marginLeft: "35px",
              visibility: !hasEnded && status === "Joined" ? "visible" : "hidden"
            }}
          >
            {!canEdit && (
              <Box p={1} bgcolor="white" borderRadius={1} width="fit-content" boxShadow={1} mb={1}>
                <a
                  href={`${window.location.origin}/ConferenceDetails/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block" }}
                >
                  <QRCode
                    value={`${window.location.origin}/ConferenceDetails/${item.id}`}
                    size={160}
                    style={{ height: "100px", width: "100px" }}
                  />
                </a>
              </Box>
            )}
          </Box>
        </Box>

        {!canEdit && <Box mt={2}>{renderUserActions()}</Box>}
      </CardContent>
    </Card>
  );
};

export default ConferenceCard;
