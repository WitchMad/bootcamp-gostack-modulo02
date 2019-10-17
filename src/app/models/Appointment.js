import { Sequelize, Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    // sequelize -> connection with database
    // super.init makes a model of de datas required
    super.init(
      {
        date: Sequelize.DATE,
        cancelled_at: Sequelize.DATE,
      },
      {
        sequelize, // The conection comes likes a second paramether to super
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
