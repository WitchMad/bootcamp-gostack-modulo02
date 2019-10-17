import { Sequelize, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // sequelize -> connection with database
    // super.init makes a model of de datas required
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // VIRTUAL does not is registred in data base
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // The conection comes likes a second paramether to super
      }
    );

    // Execute this function beforeSave user in data base, to encrypt password
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
