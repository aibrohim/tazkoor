import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import SettingsPage from "components/settings/settings";
import ProfileSettings from "components/profile-settings/profile-settings";

const Settings:FC = function() {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfileSettings />} />
    </Routes>
  );
}

export default Settings;