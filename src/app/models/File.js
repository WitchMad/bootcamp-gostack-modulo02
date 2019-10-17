import { Sequelize, Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // sequelize -> connection with database
    // super.init makes a model of de datas required
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize, // The conection comes likes a second paramether to super
      }
    );

    return this;
  }
}

export default File;
