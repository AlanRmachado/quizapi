import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/db"
import Questions from "./questions";
export interface IAnswersAttributes {
  simbol: string;
  descricao: string;
  value: number;
  answer: number;
  question: number
}

interface AnswersCreationAttribues extends Optional<IAnswersAttributes, "answer"> { }


class Answers extends Model<IAnswersAttributes, AnswersCreationAttribues>
  implements IAnswersAttributes {

  public simbol!: string;
  public descricao!: string;
  public value!: number;
  public answer!: number
  public question!: number

}



Answers.init(
  {
    answer: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    simbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    question: {
      type: DataTypes.INTEGER,
      references: {
        model: Questions,
        key: 'question'
      }
    }
  },
  {
    sequelize: db,
    tableName: "answers",
    timestamps: false
  }
)

export default Answers