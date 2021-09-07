const rules = {
  user: {
    static: [],
  },

  admin: {
    static: [
      "drawer-admin-items:view",
      "tickets-manager:showall",
      "user-modal:editProfile",
      "user-modal:editQueues",
      "ticket-options:deleteTicket",
      "contacts-page:deleteContact",
      "answer-page:deleteAnswer",
    ],
  },
};

export default rules;
