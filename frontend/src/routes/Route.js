import React, { useContext } from "react";
import { Route as RouterRoute, Redirect } from "react-router-dom";

import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import { SettingsContext } from "../context/Settings/SettingsContext";

const Route = ({
  component: Component,
  checkSetting,
  isPrivate = false,
  ...rest
}) => {
  const { isAuth, loading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const { isActive } = useContext(SettingsContext);

  if (checkSetting && user.profile !== "admin" && !isActive(checkSetting)) {
    return <></>;
  }

  if (!isAuth && isPrivate) {
    return (
      <>
        {loading && <BackdropLoading />}
        <Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
      </>
    );
  }

  if (isAuth && !isPrivate) {
    return (
      <>
        {loading && <BackdropLoading />}
        <Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
      </>
    );
  }

  return (
    <>
      {loading && <BackdropLoading />}
      <RouterRoute {...rest} component={Component} />
    </>
  );
};

export default Route;
