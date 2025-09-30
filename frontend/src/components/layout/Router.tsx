import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutShell from "./LayoutShell";
import NotFound from "./NotFound";
import Unauthorized from "./Unauthorized";
import HomeContainer from "../../features/home/HomeContainer";
import SettingsContainer from "../../features/settings/SettingsContainer";
import NotificationsContainer from "../../features/notifications/NotificationsContainer";
import SupportContainer from "../../features/support/SupportContainer";
import UserContainer from "features/users/UserContainer";
import TutorialContainer from "features/tutorial/TutorialContainer";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutShell />}>
          <Route index element={<HomeContainer />} />
          <Route path="users" element={<UserContainer />} />
          <Route path="settings" element={<SettingsContainer />} />
          <Route path="notifications" element={<NotificationsContainer />} />
          <Route path="tutorial" element={<TutorialContainer />} />
          <Route path="support" element={<SupportContainer />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
