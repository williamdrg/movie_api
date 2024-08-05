const { DataTypes } =  require('sequelize')
const sequelize = require('../utils/connection')

const Actor = sequelize.define('actor', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
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