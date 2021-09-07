import api from "../../services/api";
import { useState } from "react";

const useSettings = () => {
  const [settings, setSettings] = useState({});

  const fetchSettings = async () => {
    try {
      if (!settings || !settings.length || settings.length === 0) {
        const { data } = await api.get("/settings");
        setSettings(data);
      }
    } catch (err) {}
  };
  fetchSettings();

  const getSettingValue = (key) => {
    if (!settings || !settings.length) return null;
    const { value } = settings.find((s) => s.key === key);
    return value;
  };

  const isActive = (setting) => {
    return getSettingValue(setting) === "enabled";
  };

  return { isActive, getSettingValue };
};

export default useSettings;
