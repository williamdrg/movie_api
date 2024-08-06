const { DataTypes } =  require('sequelize')
const sequelize = require('../utils/connection')

const Actor = sequelize.define('actor', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
  },
  birthday: {
    type: DataTypes.DATEONLY
  }
})

module.exports = Actor