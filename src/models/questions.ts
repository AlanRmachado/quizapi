import { DataTypes, Optional, Model } from 'sequelize';
import db from '../db/db';
import Quiz from './quiz';



export interface IQuestionsAttibutes {
  question: number;
  descricao: string;
  quiz: number;
}

interface UsuarioCreationAttributes extends Optional<IQuestionsAttibutes, "question"> { }
export interface UsuarioOutputAttributes extends Required<IQuestionsAttibutes> { }


class Questions extends Model<IQuestionsAttibutes, UsuarioCreationAttributes>
  implements IQuestionsAttibutes {
  public descricao!: string;
  public question!: number;
  public quiz!: number;

}


Questions.init(
  {
    question: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: { type: DataTypes.STRING },
    quiz: {
      type: DataTypes.INTEGER,
      references: {
        model: Quiz,
        key: 'quiz',
      },
    },
  },
  {
    sequelize: db,
    tableName: "questions",
    timestamps: false
  }
);




export default Questions;
