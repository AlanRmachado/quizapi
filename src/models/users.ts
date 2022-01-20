import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/db";


export interface IUserAttributes {
  user: number;
  name: string;
}

interface UserCreationAttributes extends Optional<IUserAttributes, "user"> { }

class User extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
  public user!: number;
  public name!: string;
}


User.init(
  {
    user: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false
  }
)

export default User;