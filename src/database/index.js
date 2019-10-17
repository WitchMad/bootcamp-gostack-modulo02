import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    /* Makes a conection with database with Sequelize class and search the
    config from database */
    this.connection = new Sequelize(databaseConfig);

    /* map the array models to init the connection with data base to the model */
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
