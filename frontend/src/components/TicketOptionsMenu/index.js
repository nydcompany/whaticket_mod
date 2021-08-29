import React, { useContext, useEffect, useRef, useState } from "react";

import { Button, Menu, MenuItem } from "@material-ui/core";

import { Repeat, DeleteForever } from "@material-ui/icons";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import ConfirmationModal from "../ConfirmationModal";
import TransferTicketModal from "../TransferTicketModal";
import toastError from "../../errors/toastError";
import { Can } from "../Can";
import { AuthContext } from "../../context/Auth/AuthContext";

const TicketOptionsMenu = ({ ticket, menuOpen, handleClose, anchorEl }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [transferTicketModalOpen, setTransferTicketModalOpen] = useState(false);
  const isMounted = useRef(true);
  const { user } = useContext(AuthContext);
  const [loading] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleOpenTransferModal = (e) => {
    setTransferTicketModalOpen(true);
    if (typeof handleClose == "function") handleClose();
  };

  const handleOpenConfirmationModal = (e) => {
    setConfirmationOpen(true);
    if (typeof handleClose == "function") handleClose();
  };

  const handleCloseTransferTicketModal = () => {
    if (isMounted.current) {
      setTransferTicketModalOpen(false);
    }
  };

  const handleDeleteTicket = async () => {
    try {
      await api.delete(`/tickets/${ticket.id}`);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleOpenTransferModal}>
					{i18n.t("ticketOptionsMenu.transfer")}
				</MenuItem>
				<Can
					role={user.profile}
					perform="ticket-options:deleteTicket"
					yes={() => (
						<MenuItem onClick={handleOpenConfirmationModal}>
							{i18n.t("ticketOptionsMenu.delete")}
						</MenuItem>
					)}
				/>
			</Menu>
			<ConfirmationModal
				title={`${i18n.t("ticketOptionsMenu.confirmationModal.title")}${
					ticket.id
				} ${i18n.t("ticketOptionsMenu.confirmationModal.titleFrom")} ${
					ticket.contact.name
				}?`}
				open={confirmationOpen}
				onClose={setConfirmationOpen}
				onConfirm={handleDeleteTicket}
			>
				{i18n.t("ticketOptionsMenu.confirmationModal.message")}
			</ConfirmationModal>
			<TransferTicketModal
				modalOpen={transferTicketModalOpen}
				onClose={handleCloseTransferTicketModal}
				ticketid={ticket.id}
			/>
		</> */}
        <MenuItem onClick={handleOpenTransferModal}>
          <Button
            aria-controls="menu-appbar"
            aria-haspopup="true"
            style={{
              color: "black",
              fontSize: "9px",
              margin: "2px",
              borderRadius: "0px",
              marginLeft: "auto",
            }}
            loading={loading}
            startIcon={<Repeat />}
            size="small"
            variant="contained"
            // onClick={handleOpenTransferModal}
          >
            {i18n.t("ticketOptionsMenu.transfer")}
          </Button>
        </MenuItem>
        <Can
          role={user.profile}
          perform="ticket-options:deleteTicket"
          yes={() => (
            <MenuItem onClick={handleOpenConfirmationModal}>
              <Button
                aria-controls="menu-appbar"
                aria-haspopup="true"
                style={{
                  color: "white",
                  fontSize: "9px",
                  margin: "2px",
                  borderRadius: "0px",
                  marginLeft: "auto",
                }}
                loading={loading}
                startIcon={<DeleteForever />}
                size="small"
                color="secondary"
                variant="contained"
                // onClick={handleOpenConfirmationModal}
              >
                {i18n.t("ticketOptionsMenu.delete")}
              </Button>
            </MenuItem>
          )}
        />
      </Menu>
      <ConfirmationModal
        title={`${i18n.t("ticketOptionsMenu.confirmationModal.title")} #${
          ticket.id
        }?`}
        open={confirmationOpen}
        onClose={setConfirmationOpen}
        onConfirm={handleDeleteTicket}
      >
        {i18n.t("ticketOptionsMenu.confirmationModal.message")}
      </ConfirmationModal>
      <TransferTicketModal
        modalOpen={transferTicketModalOpen}
        onClose={handleCloseTransferTicketModal}
        ticketid={ticket.id}
      />
    </>
  );
};

export default TicketOptionsMenu;
