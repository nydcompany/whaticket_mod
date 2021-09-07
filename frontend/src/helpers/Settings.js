import api from "../services/api";

class Settings {
  setSettings(data) {
    this.internalSettings = data;
  }
  async fetchSettings() {
    try {
      const { data } = await api.get("/settings");
      this.setSettings(data);
    } catch (err) {}
  }

  constructor() {
    this.fetchSettings();
  }

  async getSettingValue(key) {
    if (!this.internalSettings || this.internalSettings.length === 0) {
      await this.fetchSettings();
    }
    if (!this.internalSettings) return null;
    const { value } = this.internalSettings.find((s) => s.key === key);
    return value;
  }

  async isActive(setting) {
    return (await this.getSettingValue(setting)) === "enabled";
  }
}

export default Settings;
