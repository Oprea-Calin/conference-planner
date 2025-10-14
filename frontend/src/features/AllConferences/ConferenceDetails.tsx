import React, { useState } from "react";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useApiSWR } from "units/swr";
import { endpoints } from "utils";
import type { ConferenceDto } from "types";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ConferenceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentConferenceId = Number(id);

  const { data: conferenceById, error } = useApiSWR<ConferenceDto, Error>(
    currentConferenceId > 0 ? endpoints.conferences.getConferenceById(currentConferenceId) : null,
    {
      onError: (err) => toast.error(t("Error loading conference", { message: err.message }))
    }
  );

  const [expandedSpeakers, setExpandedSpeakers] = useState(false);

  if (error) return <p>{t("Error loading conference data")}</p>;
  if (!conferenceById) return <p>{t("Loading...")}</p>;

  const mainSpeaker = conferenceById.speakerList?.find((s) => s.isMainSpeaker);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{conferenceById.name}</h1>

      <Section label={t("Conference Type")}>{conferenceById.conferenceTypeName}</Section>

      <Section label={t("Location")}>
        <div>
          <strong>{conferenceById.location?.name || "Not specified"}</strong>
          <br />
          {conferenceById.location?.address || "Not specified"}
          <br />
          Latitude: {conferenceById.location?.latitude || "Not specified"}, Longitude:{" "}
          {conferenceById.location?.longitude || "Not specified"}
        </div>
      </Section>

      <Section label={t("Organizer Email")}>{conferenceById.organizerEmail || "Not specified"}</Section>

      <Section label={t("Category")}>{conferenceById.categoryName}</Section>

      <Section label={t("Dates")}>
        {new Date(conferenceById.startDate).toLocaleDateString()} - {new Date(conferenceById.endDate).toLocaleDateString()}
      </Section>

      <div style={styles.section}>
        {/* <button
          onClick={() => setExpandedSpeakers(!expandedSpeakers)}
          style={styles.expandButton}
          aria-expanded={expandedSpeakers}
          aria-controls="speakers-list"
        >
          {expandedSpeakers ? "V" : ">"} {t("Speakers")} ({conferenceById.speakerList?.length || 0})
        </button> */}
        <Box
          onClick={() => setExpandedSpeakers(!expandedSpeakers)}
          aria-expanded={expandedSpeakers}
          aria-controls="speakers-list"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          <strong>
            {t("Speakers")} ({conferenceById.speakerList?.length || 0})
          </strong>
          <ExpandMoreIcon
            sx={{
              transform: expandedSpeakers ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s"
            }}
          />
        </Box>

        {expandedSpeakers && conferenceById.speakerList && (
          <ul id="speakers-list" style={styles.list}>
            {conferenceById.speakerList.map((s) => (
              <li key={s.speakerId} style={styles.listItem}>
                <strong>{s.name}</strong> {s.isMainSpeaker && <em>({t("Main Speaker")})</em>}
                <br />
                Nationality: {s.nationality}
                <br />
                Rating: {s.rating}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Section label={t("Main Speaker")}>{mainSpeaker?.name || "N/A"}</Section>
    </div>
  );
};

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={styles.section}>
    <strong>{label}:</strong> <span>{children}</span>
  </div>
);

const styles = {
  page: {
    maxWidth: 480,
    margin: "20px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: 16,
    fontWeight: "700",
    fontSize: "1.8rem",
    color: "#333"
  },
  section: {
    marginBottom: 12,
    fontSize: "1rem",
    color: "#555"
  },
  expandButton: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#007bff"
  },
  list: {
    marginTop: 8,
    paddingLeft: 20,
    color: "#444",
    listStyleType: "disc"
  },
  listItem: {
    marginBottom: 12
  }
};

export default ConferenceDetails;
