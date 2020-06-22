import path from 'path';
import ServerError from 'utils/ServerError';
import { parseTreesJsonFileAsync, dateDiffInDays } from '../utils/functions';

const initialDb = {
  trees: [],            // Array of trees from JSON files
  totalTrees: 0,        // Total trees planted
  totalsByProject: {},  // { 'project1': <total tress of project1>, etc }
  totalsByVariant: {},  // { 'variant1': <total tress of variant1>, etc }
  totalsByDay: {},      // { '20180101': 1, '20180105': 5, '20180201': 20, etc}
  totalsByMonth: {}     // { '201801': 50, '201802': 87, '201803': 119, etc}
};

let db = null;    // database (Singleton per module)

export default {
  init: async () => {
    try {
      const trees = await parseTreesJsonFileAsync(
        path.join(__dirname, '../../data/trees.json')
      );
      db = trees.reduce((dbAcc, tree) => {
        dbAcc.trees.push(tree);
        dbAcc.totalTrees++;
        dbAcc.totalsByProject[tree.projectId] = dbAcc.totalsByProject[tree.projectId]
          ? dbAcc.totalsByProject[tree.projectId] + 1
          : 1;
        dbAcc.totalsByVariant[tree.varient] = dbAcc.totalsByVariant[tree.varient]
          ? dbAcc.totalsByVariant[tree.varient] + 1
          : 1;
        // totalsByMonth keys format: "<year><month>"
        // Ex: totalsByMonth[202006]: total trees planted in June 2020
        const monthKey = '' + tree.createdAt.getFullYear() + (tree.createdAt.getMonth() + 1).toString().padStart(2, '0');
        dbAcc.totalsByMonth[monthKey] = dbAcc.totalsByMonth[monthKey]
          ? dbAcc.totalsByMonth[monthKey] + 1
          : 1;
        // totalsByDay keys format: <year><month><day>
        // Ex: totalsByDay[20200621]: total trees planted on 21th June 2020
        const dayKey = monthKey + tree.createdAt.getDate().toString().padStart(2, '0');
        dbAcc.totalsByDay[dayKey] = dbAcc.totalsByDay[dayKey]
          ? dbAcc.totalsByDay[dayKey] + 1
          : 1;
        return dbAcc;
      }, initialDb);
    } catch (err) {
      throw new ServerError({ message: 'Error initializing controller:', status: 400, err });
    }
  },
  findAll: async ({ from = new Date(), to = new Date() }) => {
    try {
      let iterFrom = new Date(from);
      const daysRange = dateDiffInDays(from, to);
      let dayKey;
      const result = [];
      for (let i = 0; i < daysRange; i++) {
        dayKey =
          '' +
          iterFrom.getFullYear() +
          (iterFrom.getMonth() + 1).toString().padStart(2, '0') +
          iterFrom.getDate().toString().padStart(2, '0');
        result.push({
          day: dayKey,
          total: db.totalsByDay[dayKey] || 0
        });
        iterFrom.setDate(iterFrom.getDate() + 1);
      }
      return result;

    } catch (err) {
      console.error(err);
      throw new ServerError({ message: 'Error retrieving trees', status: 400 });
    }
  },
}
