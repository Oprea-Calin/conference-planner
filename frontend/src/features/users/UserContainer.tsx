import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, CardContent } from "@mui/material";
import { useUserData } from "hooks/useUserData";
import UserInfoCard from "./UserInfoCard";

const UserContainer: React.FC = () => {
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
  const Username = useMemo(() => {
    if (!userData) return t("User.Unknown");
    return `${userData.userName}`.trim() || t("User.Unknown");
  }, [userData, t]);


  return (
    

    <div>
      <Card sx={{ maxWidth: 500, width: "100%" }}>
    <UserInfoCard>
      
    </UserInfoCard>
    </Card>
    <br></br>


    <Card sx={{ maxWidth: 500, width: "100%" }}>
      <CardContent>
        <Typography variant="body1" /*color="text.secondary"*/ textAlign="center">
          {t("SystemVersion.Username",{Username: Username})}
        </Typography>
        
        
      </CardContent>
    </Card>
    <br></br>
      
    
    

    </div>
  );
};






export default UserContainer;
