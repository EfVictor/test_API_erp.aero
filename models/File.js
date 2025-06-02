import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const File = sequelize.define('File', {
  name: DataTypes.STRING,
  extension: DataTypes.STRING,
  mime: DataTypes.STRING,
  size: DataTypes.INTEGER,
  uploadDate: DataTypes.DATE,
  path: DataTypes.STRING,
});

export default File;
