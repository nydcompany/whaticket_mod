import React, { createContext } from "react";

import useSettings from "../../hooks/useSettings";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
	const { isActive, getSettingValue } = useSettings();

	return (
		<SettingsContext.Provider
			value={{ isActive, getSettingValue }}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export { SettingsContext, SettingsProvider };
