import { Router } from 'express';
import { name, version } from '../../package.json';

const routes = Router();

routes.all('/hi', function (req, res) {
  res.status(200).send({
    hi: 'I\'m ' + name,
    version: version,
  });
});

export default routes;
