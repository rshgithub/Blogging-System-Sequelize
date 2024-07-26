import { Sequelize } from 'sequelize';

// Create a new instance of Sequelize, connecting to your MySQL database
const sequelize = new Sequelize('blogging_system', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true, // Disable logging; default: console.log
});

export { sequelize };
