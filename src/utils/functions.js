import fs from 'fs';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const parseTreeReviver = (key, value) => {
  return (key === 'createdAt') ? new Date(value) : value;
};

export const parseTreesJsonFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, fileContents) => {
      if (err) {
        return reject(err);
      }
      setTimeout(() => {
        try {
          return resolve(JSON.parse(fileContents, parseTreeReviver));
        } catch (err) {
          return reject(err);
        }
      });
    });
  });
}

export const dateDiffInDays = (a, b) => {
  // Discard the time information
  const date1 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const date2 = new Date(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((date2 - date1) / _MS_PER_DAY);
}
