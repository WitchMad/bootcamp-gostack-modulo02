import { Sequelize, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // sequelize -> connection with database
    // super.init makes a model of de datas required
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // The conection comes likes a second paramether to super
      }
    );
  }
}

export default User;
