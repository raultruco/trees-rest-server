import { Router } from 'express';
import treesController from 'controllers/trees.controller.js';

const routes = Router();

routes.get(
  '/trees/1w',
  async (req, res) => {
    try {
      const today = new Date();
      const from = new Date(today.setDate(today.getDate() - 7));
      const to = new Date();

      return res.status(200).send(await treesController.findAll({ from, to }));
    } catch (err) {
      console.error('err: ', err);
      return res.status(err.status || 400).send(err);
    }
  }
);

routes.get(
  '/trees/1m',
  async (req, res) => {
    try {
      const today = new Date();
      const from = new Date(today.setMonth(today.getMonth() - 1));
      const to = new Date();

      return res.status(200).send(await treesController.findAll({ from, to }));
    } catch (err) {
      console.error('err: ', err);
      return res.status(err.status || 400).send(err);
    }
  }
);

routes.get(
  '/trees/3m',
  async (req, res) => {
    try {
      const today = new Date();
      const from = new Date(today.setMonth(today.getMonth() - 3));
      const to = new Date();

      return res.status(200).send(await treesController.findAll({ from, to }));
    } catch (err) {
      console.error('err: ', err);
      return res.status(err.status || 400).send(err);
    }
  }
);

routes.get(
  '/trees/6m',
  async (req, res) => {
    try {
      const today = new Date();
      const from = new Date(today.setMonth(today.getMonth() - 6));
      const to = new Date();

      return res.status(200).send(await treesController.findAll({ from, to }));
    } catch (err) {
      console.error('err: ', err);
      return res.status(err.status || 400).send(err);
    }
  }
);

routes.get(
  '/trees/1y',
  async (req, res) => {
    try {
      const today = new Date();
      const from = new Date(today.setMonth(today.getMonth() - 12));
      const to = new Date();

      return res.status(200).send(await treesController.findAll({ from, to }));
    } catch (err) {
      console.error('err: ', err);
      return res.status(err.status || 400).send(err);
    }
  }
);

routes.get(
  '/trees',
  async (req, res) => {
    try {
      let { from: fromQuery, to: toQuery } = req.query;
      const from = new Date(fromQuery || 0);
      const to = new Date(toQuery);

      return res.status(200).send(await treesController.findAll({ from, to }));
    } catch (err) {
      console.error('err: ', err);
      return res.status(err.status || 400).send(err);
    }
  }
);

export default routes;
