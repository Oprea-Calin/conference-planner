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

import { Box, CardContent, Chip, Rating, Typography } from "@mui/material";
import { over } from "lodash";

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

  // const [expandedSpeakers, setExpandedSpeakers] = useState(false);

  const expandedSpeakers = true;
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

  return (
    <CardContent style={{ paddingTop: 28, overflow: "auto" }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {mergedConference.name}
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Chip label={mergedConference.conferenceTypeName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
        <Chip label={mergedConference.categoryName} size="small" sx={{ mb: 1, textTransform: "capitalize" }} />
      </Box>

      <OpenInMapsButton lat={mergedConference.location?.latitude} lng={mergedConference.location?.longitude} />

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <LocationCityIcon fontSize="small" />
        <Typography variant="body2">
          {mergedConference.cityName}, {mergedConference.countyName.toUpperCase()}, {mergedConference.countryName.toUpperCase()}
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
        <ContactSupportIcon fontSize="small" />
        <Typography variant="body2">
          {mergedConference.atendeesList.length > 0 ? mergedConference.atendeesList.length : "No attendees"} Attending
        </Typography>
      </Box>

      <div style={styles.section}>
        <Box aria-expanded={expandedSpeakers} aria-controls="speakers-list">
          <strong>
            {t("Speakers")} ({mergedConference.speakerList?.length || 0})
          </strong>
        </Box>

        {expandedSpeakers && mergedConference.speakerList && (
          <div style={styles.speakerCards}>
            {mergedConference.speakerList.map((s) => (
              <div key={s.speakerId ?? s.speakerId} style={styles.speakerCard}>
                <strong style={{ fontSize: "1.1rem" }}>{s.name}</strong>
                {s.isMainSpeaker && <em style={{ color: "#007bff", marginLeft: 8 }}>Main</em>}
                {s.rating && <Rating value={s.rating} readOnly size="small" sx={{ mt: 1 }} />}
                <div style={{ marginTop: 6, color: "#555" }}>Nationality: {s.nationality || "Unknown"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CardContent>
  );
};

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={styles.section}>
    <div style={styles.label}>{label}</div>
    <div style={styles.value}>{children}</div>
  </div>
);

const styles = {
  page: {
    maxWidth: 600,
    width: "100%",
    margin: "30px auto",
    padding: "30px 24px",
    overflow: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
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
    backgroundColor: "#ffffff",
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
    marginTop: 12
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
