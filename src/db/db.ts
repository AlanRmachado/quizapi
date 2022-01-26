import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize('quiz', 'alannode', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

export default sequelize;
