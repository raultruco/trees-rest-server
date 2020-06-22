import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import * as routes from './routes';

const app = express();
app.disable('x-powered-by');

// Logger
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api0', [
  routes.status,
  routes.trees,
]);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .send({
      error: {
        status: err.status,
        message: err.message,
        err: app.get('env') === 'development' ? err.err : null
      }
    });
});

export default app;
