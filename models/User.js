export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'The username can only contain letter and numbers',
        },
        len: {
          args: [3, 20],
          msg: 'Length of username could only be between 3 to 20.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email.',
        },
      },
    },
    password: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: 'userId',
    });
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: 'userId',
    });
  };
  return User;
};
