# Trees REST API

REST API to serve trees data using node.js, express, babel, dotenv, eslint, prettier...

### Getting started

```sh
# Clone the project
git clone ...
cd ...

# Install dependencies with yarn (or use your prefered package manager)
yarn
```

Start the service in development mode:

```sh
yarn run dev
```

This will launch a [nodemon](https://nodemon.io/) process with babel-register, loading dotenv/config and in watch mode.

The server listens by default at port 8081. You must see this message on console:

```
Listening on port 8081
```

### Endpoints

The API returns lists of data from a date range provided. Each data item contains:

- `date`: Day of the time serie, in the format <year><month><day>
- `total`: Total trees planted on the day serie

For example, the total number of trees planted on 29th March 2020:

```json
{
  "day": "20200329",
  "total": 2
}
```

The available endpoints:

- `GET /api0/trees/1w`  
  Retrieves data from the last week. Example: http://localhost:8081/api0/trees/1w
- `GET /api0/trees/1m`  
  Retrieves data from the last month. Example: http://localhost:8081/api0/trees/1m
- `GET /api0/trees/3m`  
  Retrieves data from the last 3 months. Example: http://localhost:8081/api0/trees/3m
- `GET /api0/trees/6m`  
  Retrieves data from the last 6 months. Example: http://localhost:8081/api0/trees/6m
- `GET /api0/trees/1y`  
  Retrieves data from the last year. Example: http://localhost:8081/api0/trees/1y
- `GET /api0/trees?from=...&to=...`  
  Retrieves data from a date range provided in the query string.

  Parameters:

  - from: ISO9601 string with the start date of the query
  - to: ISO9601 string with the end date of the query

  Example: http://localhost:8081/api0/trees?from=2020-03-29&to=2020-06-20

### Caveats and future work

- All the date manipulations has been done using the Javascript Date object. In the case we needed more complex operations, consider using an external module (date-fns, moment, etc).
- All the dates are treated as local. For proper localization, use list date/times
- For bigger datasets, consider a different structure for the internal database.

  The current database looks like this:

  ```javascript
  const initialDb = {
    trees: [], // Array of trees from JSON files
    totalTrees: 0, // Total trees planted
    totalsByProject: {}, // { 'project1': <total tress of project1>, etc }
    totalsByVariant: {}, // { 'variant1': <total tress of variant1>, etc }
    totalsByDay: {}, // { '20180101': 1, '20180105': 5, '20180201': 20, etc}
  };
  ```

  When a query is executed, `totalsByDay` aggregated is iterated day by day for the date range provided. Every day's lookup has a cost of `O(logN)`. So, for a 365 range, the total lookup cost is 365\*O(logN)

  A possible alternative could have been using nested arrays like this:

  ```javascript
    ...
    totalsByDay: [
      /*2015*/ [
        /*january 2015*/ [
          /*1st january 2015*/ [/*total*/ 5],
          /*2nd january 2015*/ [/*total*/ 3],
        ],
        // ...
      ],
      /*2016*/[
        // ...
      ],
    ]
  ```

  Where the total lookup cost is roughly O(log(n)).

### Linting

Linting is set up using [ESLint](http://eslint.org/). It uses ESLint's default [eslint:recommended](https://github.com/eslint/eslint/blob/master/conf/eslint.json) rules.

Begin linting in watch mode with:

```sh
# yarn
yarn run lint
```

To begin linting and start the server simultaneously:

```sh
# yarn
yarn run devlint
```

To set up automatic linting with VSCode IDE install the [ESlint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Prettier

Fixing linting errors one by one is a tedious task. That’s where Prettier comes in: It reads ESLint configuration settings and automatically formats your code to match it.

To set up prettier with VSCode install the [Prettier - Code formatter plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

To allow VSCode to format your code automatically when files are saved activate the option "formatOnSave" in either of the following ways:
2.1) Create a .vscode file in your project's root directory containing:
`{ "editor.formatOnSave": true, }`

    2.2) Go to user or workspace settings and activate "Editor: Format On Save"

### Environmental variables in development

The project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example`, rename it to `.env` and add your env vars values.

### Deployment

Deployment is specific to hosting platform/provider but generally:

```sh
# yarn
yarn run build
```

will compile your `src` into `/build`, and

```sh
# yarn
yarn start
```

will run the compiled application from the `/build` folder.

The last command is generally what most hosting providers use to start your application when deployed, so it should take care of everything.

### Testing

(not implemented)

- Unit tests:

```sh
yarn run test
```

- In watch mode:

```sh
yarn run test:watch
```

- Run test matching especific name "routes":

```sh
yarn run test -- -t="routes"
```

## License

GPL-3.0
