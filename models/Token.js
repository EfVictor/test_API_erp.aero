import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Token = sequelize.define('Token', {
  token: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Token;
