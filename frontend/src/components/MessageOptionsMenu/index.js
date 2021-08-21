import React, { useState, useContext, useRef } from "react";

import MenuItem from "@material-ui/core/MenuItem";

import { i18n } from "../../translate/i18n";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import ConfirmationModal from "../ConfirmationModal";
import ForwardMessageModal from "../ForwardMessageModal";
import { Button, Menu } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import { ReplyMessageContext } from "../../context/ReplyingMessage/ReplyingMessageContext";
import toastError from "../../errors/toastError";

const useStyles = makeStyles((theme) => ({
  forward: {
    color: "purple",
  },
  reply: {
    color: "green",
  },
  mirroredIcon: {
    transform: "scaleX(-1)",
  },
}));

const MessageOptionsMenu = ({ message, menuOpen, handleClose, anchorEl }) => {
  const classes = useStyles();
  const { setReplyingMessage } = useContext(ReplyMessageContext);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [forwardMessageModalOpen, setForwardMessageModalOpen] = useState(false);
  const isMounted = useRef(true);

  const handleDeleteMessage = async () => {
    try {
      await api.delete(`/messages/${message.id}`);
    } catch (err) {
      toastError(err);
    }
  };

  const hanldeReplyMessage = () => {
    setReplyingMessage(message);
    handleClose();
  };

  const handleOpenConfirmationModal = (e) => {
    setConfirmationOpen(true);
    handleClose();
  };

  const handleForwardMessage = () => {
    setForwardMessageModalOpen(true);
    handleClose();
  };

  const handleCloseForwardMessageModal = () => {
    if (isMounted.current) {
      setForwardMessageModalOpen(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        title={i18n.t("messageOptionsMenu.confirmationModal.title")}
        open={confirmationOpen}
        onClose={setConfirmationOpen}
        onConfirm={handleDeleteMessage}
      >
        {i18n.t("messageOptionsMenu.confirmationModal.message")}
      </ConfirmationModal>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleClose}
      >
        {message.fromMe && (
          <MenuItem onClick={handleOpenConfirmationModal}>
            <Button
              // variant="contained"
              color="secondary"
              size="small"
              // className={classes.button}
              startIcon={<DeleteIcon />}
            >
              {i18n.t("messageOptionsMenu.delete")}
            </Button>
          </MenuItem>
        )}
        <MenuItem onClick={hanldeReplyMessage}>
          <Button
            // variant="contained"
            size="small"
            className={classes.reply}
            startIcon={<ReplyIcon />}
          >
            {i18n.t("messageOptionsMenu.reply")}
          </Button>
        </MenuItem>
        <MenuItem onClick={handleForwardMessage}>
          <Button
            size="small"
            startIcon={<ReplyIcon className={classes.mirroredIcon} />}
            className={classes.forward}
          >
            {i18n.t("messageOptionsMenu.forward")}
          </Button>
        </MenuItem>
      </Menu>
      <ForwardMessageModal
        modalOpen={forwardMessageModalOpen}
        onClose={handleCloseForwardMessageModal}
        message={message}
      />
    </>
  );
};

export default MessageOptionsMenu;
