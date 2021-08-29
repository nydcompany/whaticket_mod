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

  const uniqueMessage = Array.isArray(message) ? message[0] : message;

  const handleDeleteMessage = async () => {
    try {
      await api.delete(`/messages/${uniqueMessage.id}`);
    } catch (err) {
      toastError(err);
    }
  };

  const toDataURL = async (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  const download = async (url, name) => {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadMedias = async () => {
    //window.open(message.mediaUrl);
    var urlParts = message.mediaUrl.split("/");
    download(message.mediaUrl, urlParts[urlParts.length - 1]);
    message.childs.forEach((m) => {
      urlParts = m.mediaUrl.split("/");
      download(m.mediaUrl, urlParts[urlParts.length - 1]);
    });
  };

  const handleDownloadMediaZip = async () => {
    const fileContent = await api.get("/messages/" + message.id + "/download", {
      responseType: "arraybuffer",
    });
    const url = window.URL.createObjectURL(
      new Blob([fileContent.data], { type: "arraybuffer" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "imagens-" + message.id + ".zip"); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  const hanldeReplyMessage = () => {
    setReplyingMessage(uniqueMessage);
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
        {uniqueMessage.fromMe && (
          <MenuItem onClick={handleOpenConfirmationModal}>
            <Button color="secondary" size="small" startIcon={<DeleteIcon />}>
              {i18n.t("messageOptionsMenu.delete")}
            </Button>
          </MenuItem>
        )}
        <MenuItem onClick={hanldeReplyMessage}>
          <Button
            size="small"
            className={classes.reply}
            startIcon={<ReplyIcon />}
          >
            {i18n.t("messageOptionsMenu.reply")}
          </Button>
        </MenuItem>
        {message.childs && message.childs.length > 0 && (
          <MenuItem onClick={handleDownloadMedias}>
            {i18n.t("messageOptionsMenu.download_all")}
          </MenuItem>
        )}
        {message.childs && message.childs.length > 0 && (
          <MenuItem onClick={handleDownloadMediaZip}>
            {i18n.t("messageOptionsMenu.download_zip")}
          </MenuItem>
        )}
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
