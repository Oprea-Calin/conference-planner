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

import { Box, CardContent, Chip, Rating, Typography } from "@mui/material";
import { over, wrap } from "lodash";

const ConferenceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentConferenceId = Number(id);

  const { data: conferenceById, error } = useApiSWR<ConferenceDto, Error>(
    currentConferenceId > 0 ? endpoints.conferences.getConferenceById(currentConferenceId) : null,
    {
      onError: (err) => toast.error(t("Error loading conference", { message: err.message }))
    }
  );

  const { data: allConferences = [] } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });

  const [expandedSpeakers, setExpandedSpeakers] = useState(false);

  // const expandedSpeakers = true;
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

  function ConferenceActionButton({
    type,
    lat,
    lng,
    conferenceUrl
  }: {
    type: string;
    lat: number | undefined;
    lng: number | undefined;
    conferenceUrl?: string;
  }) {
    const isRemote = type?.toLowerCase() === "remote";

    const handleClick = () => {
      if (isRemote && conferenceUrl) {
        window.open(conferenceUrl, "_blank", "noopener,noreferrer");
      } else if (lat && lng) {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

    const label = isRemote ? "Connect to conference" : "Get Directions";

    if (isRemote && !conferenceUrl) return null;
    if (!isRemote && (!lat || !lng)) return null;

    return (
      <button style={styles.button} onClick={handleClick}>
        {label}
      </button>
    );
  }

  function OpenInMapsButton({ lat, lng }) {
    if (!lat || !lng) return null;

    const handleClick = () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
      <button style={styles.button} onClick={handleClick}>
        Get Directions
      </button>
    );
  }
  // const conferenceUrl = "https://www.zoom.com/";
  return (
    <CardContent style={styles.page}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {mergedConference.name}
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Chip label={mergedConference.conferenceTypeName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
        <Chip label={mergedConference.categoryName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
      </Box>

      {/* <OpenInMapsButton lat={mergedConference.location?.latitude} lng={mergedConference.location?.longitude} /> */}
      <ConferenceActionButton
        type={mergedConference.conferenceTypeName}
        lat={mergedConference.location?.latitude}
        lng={mergedConference.location?.longitude}
        conferenceUrl={mergedConference.link}
      />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <LocationCityIcon fontSize="small" />
        <Typography variant="body2">
          {mergedConference.cityName}, {mergedConference.countyName}, {mergedConference.countryName}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <RoomIcon fontSize="small" />
        <Typography variant="body2">
          <strong></strong> {mergedConference.address}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <CalendarMonthIcon fontSize="small" />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(mergedConference.startDate).toLocaleDateString()} - {new Date(mergedConference.endDate).toLocaleDateString()}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <ContactSupportIcon fontSize="small" />
        <Typography variant="body2">
          <strong></strong> {mergedConference.organizerEmail}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <PeopleIcon fontSize="small" />
        <Typography variant="body2">
          {mergedConference.atendeesList.length > 0 ? mergedConference.atendeesList.length : "No attendees"} Attending
        </Typography>
      </Box>

      <div style={styles.section}>
        <Box
          onClick={() => setExpandedSpeakers((prev) => !prev)}
          aria-expanded={expandedSpeakers}
          aria-controls="speakers-list"
          style={{ cursor: "pointer" }}
        >
          {" "}
          <strong>
            <ExpandMoreIcon
              sx={{
                transform: expandedSpeakers ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s"
              }}
            />
            {t("Speakers")} ({mergedConference.speakerList?.length || 0})
          </strong>
        </Box>

        {expandedSpeakers && (
          <div style={styles.speakerCards}>
            {mergedConference.speakerList && mergedConference.speakerList.length > 0 ? (
              mergedConference.speakerList.map((s) => (
                <div key={s.speakerId ?? s.speakerId} style={styles.speakerCard}>
                  {s.isMainSpeaker && <em style={{ color: "#ff9d00ff", marginLeft: 8 }}> (Main) </em>}
                  <strong style={{ fontSize: "1.1rem" }}>{s.name}</strong>
                  {s.rating && <Rating value={s.rating} readOnly size="small" sx={{ mt: 1 }} />}
                  <div style={{ marginTop: 6, color: "#555" }}>Nationality: {s.nationality || "Unknown"}</div>
                </div>
              ))
            ) : (
              <div style={{ fontStyle: "italic", color: "#999", padding: 10 }}>No speakers</div>
            )}
          </div>
        )}
      </div>
    </CardContent>
  );
};

const styles = {
  page: {
    maxWidth: 700,
    width: "100%",
    margin: "30px auto",
    padding: "30px 24px",
    overflow: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    marginBottom: 20,
    fontWeight: "800",
    fontSize: "2rem",
    color: "#2c3e50"
  },
  section: {
    marginBottom: 16,
    padding: "12px 16px",
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  label: {
    fontWeight: 600,
    color: "#555",
    marginBottom: 4
  },
  value: {
    fontSize: "1rem",
    color: "#333"
  },
  speakerCards: {
    display: "flex",
    gap: 12,
    marginTop: 12,
    // overflowX: "auto",
    flexWrap: "wrap"
  },
  speakerCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.07)"
  },
  list: {
    marginTop: 8,
    paddingLeft: 20,
    color: "#444",
    listStyleType: "disc"
  },
  listItem: {
    marginBottom: 12
  },
  button: {
    backgroundColor: "#00a2ffff",
    color: "#ffffffff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    margin: "10px 0",
    fontSize: "0.95rem"
  }
};

export default ConferenceDetails;
