import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Replay, DoneAll } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import TicketOptionsMenu from "../TicketOptionsMenu";
import ButtonWithSpinner from "../ButtonWithSpinner";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  actionButtons: {
    marginRight: 6,
    flex: "none",
    alignSelf: "center",
    marginLeft: "auto",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const TicketActionButtons = ({ ticket }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const ticketOptionsMenuOpen = Boolean(anchorEl);
  const { user } = useContext(AuthContext);

  const handleOpenTicketOptionsMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseTicketOptionsMenu = (e) => {
    setAnchorEl(null);
  };

  const handleUpdateTicketStatus = async (e, status, userId) => {
    setLoading(true);
    try {
      await api.put(`/tickets/${ticket.id}`, {
        status: status,
        userId: userId || null,
      });

      setLoading(false);
      if (status === "open") {
        history.push(`/tickets/${ticket.id}`);
      } else {
        history.push("/tickets");
      }
    } catch (err) {
      setLoading(false);
      toastError(err);
    }
  };

  return (
    <div className={classes.actionButtons}>
      {ticket.status === "closed" && (
        <ButtonWithSpinner
          style={{
            color: "white",
            fontSize: "9px",
            margin: "2px",
            borderRadius: "0px",
          }}
          loading={loading}
          startIcon={<Replay />}
          color="primary"
          size="small"
          variant="contained"
          onClick={(e) => handleUpdateTicketStatus(e, "open", user?.id)}
        >
          {i18n.t("messagesList.header.buttons.reopen")}
        </ButtonWithSpinner>
      )}
      {ticket.status === "open" && (
        <>
          <ButtonWithSpinner
            style={{
              color: "white",
              fontSize: "9px",
              margin: "2px",
              borderRadius: "0px",
            }}
            loading={loading}
            startIcon={<Replay />}
            size="small"
            color="primary"
            variant="contained"
            onClick={(e) => handleUpdateTicketStatus(e, "pending", null)}
          >
            {i18n.t("messagesList.header.buttons.return")}
          </ButtonWithSpinner>
          <ButtonWithSpinner
            style={{
              backgroundColor: "green",
              color: "white",
              fontSize: "9px",
              margin: "2px",
              borderRadius: "0px",
            }}
            loading={loading}
            startIcon={<DoneAll />}
            size="small"
            variant="contained"
            onClick={(e) => handleUpdateTicketStatus(e, "closed", user?.id)}
          >
            {i18n.t("messagesList.header.buttons.resolve")}
          </ButtonWithSpinner>
          <IconButton onClick={handleOpenTicketOptionsMenu}>
            <MoreVertIcon />
          </IconButton>
          <TicketOptionsMenu
            ticket={ticket}
            anchorEl={anchorEl}
            menuOpen={ticketOptionsMenuOpen}
            handleClose={handleCloseTicketOptionsMenu}
          />
        </>
      )}
      {ticket.status === "pending" && (
        <ButtonWithSpinner
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: "9px",
            margin: "2px",
            borderRadius: "0px",
          }}
          loading={loading}
          size="small"
          variant="contained"
          onClick={(e) => handleUpdateTicketStatus(e, "open", user?.id)}
        >
          {i18n.t("messagesList.header.buttons.accept")}
        </ButtonWithSpinner>
      )}
    </div>
  );
};

export default TicketActionButtons;
