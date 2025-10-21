import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, CardContent, TextField, Button, Box, Rating } from "@mui/material";
import { useEmail } from "./EmailContext";
import { useApiSWR } from "units/swr";
import type { FeedbackDto, ConferenceDto } from "types";
import { toast } from "react-toastify";
import { endpoints } from "utils";

const HomeContainer: React.FC = () => {
  const { t } = useTranslation();
  const { email, setEmail } = useEmail();
  const [inputEmail, setInputEmail] = useState(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputEmail);
  };

  const { data: feedbacks = [] } = useApiSWR<FeedbackDto[], Error>(endpoints.conferences.getFeedbacks, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });

  const { data: allConferences = [] } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });

  const getEmailPrefix = (email: string) => email.split("@")[0];
  const getConferenceName = (id: number) => {
    const conf = allConferences.find((c) => c.id === id);
    return conf ? conf.name : "Unknown Conference";
  };

  const topFeedbacks = feedbacks.sort((a, b) => b.rating - a.rating).slice(0, 10);

  const topRow = topFeedbacks.slice(0, 4);
  const middleLeft = topFeedbacks[4];
  const middleRight = topFeedbacks[5];
  const bottomRow = topFeedbacks.slice(6, 10);

  const getRotation = (index: number) => (index % 2 === 0 ? "-5deg" : "5deg");

  const FeedbackCard = ({ fb, idx }: { fb: FeedbackDto; idx: number }) => (
    <Card
      sx={{
        width: "220",
        m: 1,
        transform: `rotate(${getRotation(idx)})`,
        boxShadow: 3,
        bgcolor: "background.paper",
        userSelect: "none"
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {getConferenceName(fb.conferenceId)}
          <br />
          {getEmailPrefix(fb.attendeeEmail)} {<Rating value={fb.rating} readOnly size="small" sx={{ mt: 1 }} />}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1, whiteSpace: "normal", overflowWrap: "normal" }}>
          {fb.message}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        py: 1,
        px: 1
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          mb: 2,
          gap: 1,
          width: "100%",
          overflow: "visible"
        }}
      >
        {topRow.map((fb, idx) => (
          <FeedbackCard key={fb.Id} fb={fb} idx={idx} />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: 2,
          gap: 2
        }}
      >
        {middleLeft && <FeedbackCard fb={middleLeft} idx={4} />}

        <Card sx={{ width: 300, boxShadow: 6, p: 0, overflow: "visible" }}>
          <CardContent>
            <Typography variant="h6" textAlign="center" gutterBottom>
              {t("Set Email") || "Set Email"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={"Email"}
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                type="email"
                required
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth>
                {t("Common.Save") || "Save"}
              </Button>
            </form>
            {email && (
              <Typography variant="body2" color="success.main" textAlign="center" sx={{ mt: 2 }}>
                Email: {email}
              </Typography>
            )}
          </CardContent>
        </Card>

        {middleRight && <FeedbackCard fb={middleRight} idx={5} />}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: 1,
          width: "100%",
          overflowX: "visible"
        }}
      >
        {bottomRow.map((fb, idx) => (
          <FeedbackCard key={fb.Id} fb={fb} idx={idx + 6} />
        ))}
      </Box>
    </Box>
  );
};

export default HomeContainer;
