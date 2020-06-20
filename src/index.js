import app from './app';
import config from './config.js';

process.on('warning', e => console.warn(e.stack));
process.on('error', e => console.error(e.stack));

app.listen(config.port, () =>
  console.info(`Listening on port ${config.port}...`), // eslint-disable-line no-console
)
