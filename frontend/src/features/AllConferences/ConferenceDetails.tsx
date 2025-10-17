import React, { useState } from "react";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useApiSWR } from "units/swr";
import { endpoints } from "utils";
import type { ConferenceDto } from "types";
import { useParams } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import RoomIcon from "@mui/icons-material/Room";
import PeopleIcon from "@mui/icons-material/People";

import { Box, Button, CardContent, Chip, Rating, Typography, Collapse, Paper } from "@mui/material";

const ConferenceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentConferenceId = Number(id);
  const [expandedSpeakers, setExpandedSpeakers] = useState(false);

  const { data: conferenceById, error } = useApiSWR<ConferenceDto, Error>(
    currentConferenceId > 0 ? endpoints.conferences.getConferenceById(currentConferenceId) : null,
    {
      onError: (err) => toast.error(t("Error loading conference", { message: err.message }))
    }
  );

  const { data: allConferences = [] } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });

  if (error) return <p>{t("Error loading conference data")}</p>;
  if (!conferenceById) return <p>{t("Loading...")}</p>;

  const additionalInfo = allConferences.find((c) => c.id === conferenceById.id);

  const mergedConference = {
    ...additionalInfo,
    ...conferenceById,
    location: conferenceById.location ?? {
      name: additionalInfo?.locationName,
      address: additionalInfo?.address,
      latitude: null,
      longitude: null
    },
    speakerList: conferenceById.speakerList || additionalInfo?.speakerList || [],
    atendeesList: additionalInfo?.atendeesList || []
  };

  const handleActionClick = () => {
    const isRemote = mergedConference.conferenceTypeName?.toLowerCase() === "remote";
    if (isRemote && mergedConference.link) {
      window.open(mergedConference.link, "_blank", "noopener,noreferrer");
    } else if (mergedConference.location?.latitude && mergedConference.location?.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${mergedConference.location.latitude},${mergedConference.location.longitude}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const renderLabelValue = (icon, label) => (
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      {icon}
      <Typography variant="body2">{label}</Typography>
    </Box>
  );

  return (
    <CardContent
      sx={{
        maxWidth: 1100,
        overflow: "auto",
        mx: "auto",
        my: 4,
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {mergedConference.name}
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            <Chip label={mergedConference.conferenceTypeName} size="small" sx={{ textTransform: "capitalize" }} />
            <Chip label={mergedConference.categoryName} size="small" sx={{ textTransform: "capitalize" }} />
          </Box>

          {(mergedConference.conferenceTypeName === "Remote" || mergedConference.conferenceTypeName === "OnSite") && (
            <Button variant="contained" color="primary" sx={{ mb: 2, alignSelf: "flex-start" }} onClick={handleActionClick}>
              {mergedConference.conferenceTypeName === "Remote" ? "Connect to Conference" : "Get Directions"}
            </Button>
          )}

          {mergedConference.conferenceTypeName === "OnSite" && (
            <>
              {renderLabelValue(
                <LocationCityIcon fontSize="small" />,
                `${mergedConference.cityName}, ${mergedConference.countyName}, ${mergedConference.countryName}`
              )}
              {renderLabelValue(<RoomIcon fontSize="small" />, mergedConference.address)}
            </>
          )}

          {renderLabelValue(
            <CalendarMonthIcon fontSize="small" />,
            `${new Date(mergedConference.startDate).toLocaleDateString()} - ${new Date(mergedConference.endDate).toLocaleDateString()}`
          )}

          {renderLabelValue(<ContactSupportIcon fontSize="small" />, mergedConference.organizerEmail)}
          {renderLabelValue(<PeopleIcon fontSize="small" />, `${mergedConference.atendeesList.length || "No"} attending`)}

          <Box mt={3}>
            <Box
              onClick={() => setExpandedSpeakers((prev) => !prev)}
              sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", userSelect: "none", mb: 1 }}
            >
              <ExpandMoreIcon
                sx={{
                  transform: expandedSpeakers ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s"
                }}
              />
              <Typography fontWeight={600}>
                {t("Speakers")} ({mergedConference.speakerList?.length || 0})
              </Typography>
            </Box>

            <Collapse in={expandedSpeakers}>
              <Box display="flex" flexDirection="column" gap={2}>
                {mergedConference.speakerList.length > 0 ? (
                  mergedConference.speakerList.map((s) => (
                    <Paper key={s.speakerId} elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                      {s.isMainSpeaker && (
                        <Typography variant="caption" color="primary">
                          (Main Speaker)
                        </Typography>
                      )}
                      <Typography fontWeight={600}>
                        {s.name} {s.rating && <Rating value={s.rating} readOnly size="small" sx={{ mt: 1 }} />}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Nationality: {s.nationality || "Unknown"}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body2" fontStyle="italic" color="text.secondary">
                    No speakers available.
                  </Typography>
                )}
              </Box>
            </Collapse>
          </Box>
        </Box>

        {mergedConference.conferenceTypeName === "OnSite" &&
          mergedConference.location?.latitude &&
          mergedConference.location?.longitude && (
            <Box
              sx={{
                flex: 1,
                minHeight: 300,
                maxHeight: 300,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 2
              }}
            >
              <iframe
                title="Conference Map"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${mergedConference.location.latitude},${mergedConference.location.longitude}&z=15&output=embed`}
              />
            </Box>
          )}
      </Box>
    </CardContent>
  );
};

export default ConferenceDetails;
