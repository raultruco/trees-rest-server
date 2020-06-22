import app from './app';
import config from './config.js';
import treesController from 'controllers/trees.controller.js';

process.on('warning', e => console.warn(e.stack));
process.on('error', e => console.error(e.stack));

console.info("Building database...");
treesController.init()
  .then(async () => {
    console.info("Database built successfully...");
    app.listen(config.port, () =>
      console.info(`Listening on port ${config.port}...`), // eslint-disable-line no-console
    )
  })
  .catch(err => {
    console.error("Error building database: ", err);
    process.exit();
  });
