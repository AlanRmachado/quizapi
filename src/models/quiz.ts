import { DataTypes, Model, Optional, } from 'sequelize';
import db from '../db/db';
import Users from "./users"
export interface IQuizAttibutes {
  descricao: string;
  quiz: number;
  user: number;
}

interface QuizCreationAttributes extends Optional<IQuizAttibutes, "quiz"> { }


class Quiz extends Model<IQuizAttibutes, QuizCreationAttributes>
  implements IQuizAttibutes {
  public quiz!: number;
  public descricao!: string;
  public user!: number
}



Quiz.init(
  {
    quiz: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "user_id"
      }
    }
  },
  {
    sequelize: db,
    tableName: "quiz",
    timestamps: false
  }
);


export default Quiz;
