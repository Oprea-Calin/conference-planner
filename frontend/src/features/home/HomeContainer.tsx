import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useEmail } from "./EmailContext";

const HomeContainer: React.FC = () => {
  const { t } = useTranslation();
  const { email, setEmail } = useEmail();
  const [inputEmail, setInputEmail] = useState(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputEmail);
  };

  return (
    <Card sx={{ maxWidth: 500, width: "100%", margin: "0 auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" textAlign="center" gutterBottom></Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center"></Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left" sx={{ mb: 2 }}></Typography>

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
  );
};

export default HomeContainer;
