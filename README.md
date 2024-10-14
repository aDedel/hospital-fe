# Hospital Front-End

This project is a simulation of the effects of drugs on patients, implemented using Vue.js 3.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Setup Instructions

1. **Copy** the file named `.env.example` located at the root of the project.
2. **Paste** it in the same directory.
3. **Rename** the copied file to `.env`.

### List of Parameters:

```sh
# Back-End API URL (default: http://localhost:7200)
VITE_HOSPITAL_API_URL="http://localhost:7200"
# Automatic process interval in seconds (default: 30)
VITE_API_INTERVAL=30
# Allow to manage dead patients (default: false)
VITE_DISABLE_DEAD_STATE=false
# Overload previous value of patient after administer drugs (default: false)
VITE_OVERLOAD_PATIENTS=false
# Reverse history order (default: false)
VITE_HISTORY_ORDER_ASC=false
```

## Project Setup

```sh
# Using npm
npm install

# Using yarn
yarn install
```

### Compile and Hot-Reload for Development

```sh
# Using npm
npm run dev

# Using yarn
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
# Using npm
npm run build

# Using yarn
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
# Using npm
npm run test:unit

# Using yarn
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
# Using npm
npm run test:e2e:dev

# Using yarn
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
# Using npm
npm run build
npm run test:e2e

# Using yarn
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
# Using npm
npm run lint

# Using yarn
yarn lint
```

# Author

**ADV**
