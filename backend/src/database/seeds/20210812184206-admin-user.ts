import { QueryInterface } from "sequelize";
import { hashSync } from "bcryptjs";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Administrador",
          email: "admin@admin.com",
          passwordHash: hashSync("admin", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: "admin",
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Users", {});
  }
};
