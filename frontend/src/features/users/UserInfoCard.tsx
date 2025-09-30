import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, CardContent } from "@mui/material";
import { useUserData } from "hooks/useUserData";

const UserInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const { userData} = useUserData();
  const FirstName = useMemo(() => {
    if (!userData) return t("User.Unknown");
    return `${userData.firstName}`.trim() || t("User.Unknown");
  }, [userData, t]);
  const LastName = useMemo(() => {
    if (!userData) return t("User.Unknown");
    return `${userData.lastName}`.trim() || t("User.Unknown");
  }, [userData, t]);
  const Email = useMemo(() => {
    if (!userData) return t("User.Unknown");
    return `${userData.email}`.trim() || t("User.Unknown");
  }, [userData, t]);




  return (
    <div>
   
      
    <Card sx={{ maxWidth: 500, width: "100%" }}>
      <CardContent>
        <Typography variant="body1" /*color="text.secondary"*/ textAlign="center">
          {"^"}
        </Typography>
        <Typography variant="body2" textAlign="center" gutterBottom>
          {t("SystemVersion.FirstName",{FirstName: FirstName})}
        </Typography>
        <Typography variant="body2" /*color="text.secondary"*/ textAlign="center">
          {t("SystemVersion.LastName",{LastName: LastName})}
        </Typography>
         <Typography variant="body2" /*color="text.secondary"*/ textAlign="center">
          {t("SystemVersion.Email",{Email: Email})}
        </Typography>
      </CardContent>
    </Card>
    

    </div>
  );
};






export default UserInfoCard;
