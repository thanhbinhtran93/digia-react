# Digia React

This project is bootstrapped with [Create React App](./CRA.md)

## Available scripts

### From Create React App

`npm install`

Install the dependencies.

`npm run start`

Start the development server.

`npm run test`

Run tests.

`npm run build`

Build production app to `build` directory.

### Additional scripts

`npm run lint`

Run Eslint.

`npm run format`

Format the project using Prettier.

`npm run deploy`

Deploy the project to GitHub Pages.
Before the deployment, `predeploy` is run which runs tests, linting, and builds the project

## Pre-commit hook

The project uses [husky](https://github.com/typicode/husky)
and [lint-staged](https://github.com/okonet/lint-staged)
to run lint, and format staged files
