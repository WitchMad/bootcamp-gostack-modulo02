import 'dotenv/config'; // Import env config

import express from 'express'; // With sucrase is possible to use "import"
import 'express-async-errors'; // Catch the error's in async functions
import Youch from 'youch'; // Give more error details
import path from 'path';
import cors from 'cors';
import * as Sentry from '@sentry/node'; // Service to get error's when app was in production
import routes from './routes';
import sentryConfig from './config/sentry';

import './database'; // Import all database configuration

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig); // Init the service sentry

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler()); // Watch all aplication
    this.server.use(cors());
    this.server.use(express.json()); // Express using json
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')) // Get a URL to images
    );
  }

  routes() {
    this.server.use(routes); // Use routes
    this.server.use(Sentry.Handlers.errorHandler()); // Catch any errors in aplication
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // In development show the error catched more detailed
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
