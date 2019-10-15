import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    /* Makes a conection with database with Sequelize class and search the
    config from database */
    this.connection = new Sequelize(databaseConfig);

    /* map the array models to init the connection with data base to the model */
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
