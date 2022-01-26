import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/db";
import bcrypt from "bcrypt";

export interface IUserAttributes {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<IUserAttributes, "user_id"> { }

class User extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
  public email!: string;
  public password!: string;
  public user_id!: number;
  public name!: string;
}


User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false
  }
);


User.beforeCreate("beforeValidate", (user, options) => {
  user.password = bcrypt.hashSync(user.password, 10);
})

export default User;