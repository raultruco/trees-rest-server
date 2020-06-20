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

### Testing

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

## License

GPL-3.0
