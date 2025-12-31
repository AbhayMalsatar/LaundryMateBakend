import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class AuthUser extends Model {}

AuthUser.init(
  {
    userid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    mobileno: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    passwordhash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    adddate: {
      type: DataTypes.DATE
    },
    addby: {
      type: DataTypes.UUID
    },
    editdate: {
      type: DataTypes.DATE
    },
    editby: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize,
    tableName: "authusers",
    timestamps: false,
    freezeTableName: true
  }
);

export default AuthUser;
