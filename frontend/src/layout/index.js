import React, { useState, useContext, useEffect } from "react";
import openSocket from "socket.io-client";
import clsx from "clsx";

import {
  makeStyles,
  Drawer,
  List,
  Divider,
  IconButton,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";

import MainListItems from "./MainListItems";
import UserModal from "../components/UserModal";
import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Hidden from "@material-ui/core/Hidden";

import logoImg from "../assets/logotipo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  avatar: {
    width: "100%",
  },
  logo: {
    width: "70%",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      height: "100%",
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    minHeight: "48px",
    [theme.breakpoints.down("sm")]: {
      height: "48px",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  appBarSpacer: {
    minHeight: "48px",
  },
  content: {
    flex: 1,
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 50px)",
    },
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  mainListItemsContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mainListItemsContainerClose: {},
}));

const LoggedInLayout = ({ children }) => {
  const classes = useStyles();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { loading } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useLocalStorage("drawerOpen", true);
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    socket.on(`notification_${user.id}`, (data) => {
      if (data.action === "new") {
        setNotifications(notifications);
      }
    });

    return () => {
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  const handleMenuItemClick = () => {
    //eslint-disable-next-line
    const { innerWidth: width, innerHeight: height } = window;
    if (width <= 600) {
      setDrawerOpen(false);
    }
  };

  if (loading) {
    return <BackdropLoading />;
  }

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose
          ),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          {/* eslint-disable-next-line */}
          <img src={logoImg} className={classes.logo} alt="image" />
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            <Hidden only={["sm", "xs"]}>
              {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Hidden>
            <Hidden smUp>
              {drawerOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Hidden>
          </IconButton>
        </div>
        <Divider />
        <List
          onClick={() => handleMenuItemClick()}
          className={
            drawerOpen
              ? classes.mainListItemsContainerClose
              : classes.mainListItemsContainer
          }
        >
          <MainListItems />
        </List>
        <Divider />
      </Drawer>
      <UserModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        userId={user?.id}
      />
      <main className={classes.content}>{children ? children : null}</main>
    </div>
  );
};

export default LoggedInLayout;
