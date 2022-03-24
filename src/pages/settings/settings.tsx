import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import SettingsPage from "components/settings/settings";
import ProfileSettings from "components/profile-settings/profile-settings";
import LanguageSettings from "components/language-settings/language-settings";

const Settings:FC = function() {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="/language" element={<LanguageSettings />} />
    </Routes>
  );
}

export default Settings;