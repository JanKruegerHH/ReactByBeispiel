# Set up

```sh
npx create-react-app learn-react-mui-crud-dashboard --template typescript
```

```sh
npm install @mui/x-data-grid
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-router
```

See Sample-Code from Mui-Sample:
/Users/U558343/Sources/ReactMuiSources/material-ui/docs/data/material/getting-started/templates/crud-dashboard

## Cleaning up the project
```sh
rm -rf node_modules 
rm -rf build
rm -f package-lock.json 
npm cache clean --force 
npm install
```
# Build tooling

This project was originally bootstrapped with Create React App (CRACO) and has since been **migrated
to [Vite](https://vite.dev)** (build config in `vite.config.ts`). Tests run on
[Vitest](https://vitest.dev).

## Available Scripts

In the project directory, you can run:

### `npm start` (or `npm run dev`)

Runs the app in development mode with hot module replacement.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Type-checks the project (via `vite-plugin-checker`) and builds a production bundle into the `build`
folder. The build fails on type errors. Use `npm run preview` to serve the built output locally.

### `npm test` / `npm run test:run`

Launches Vitest in watch mode (`npm test`) or runs it once for CI (`npm run test:run`).

### `npm run typecheck`

Runs `tsc --noEmit` standalone (the same check `npm run build` performs).

## Learn More

To learn React, check out the [React documentation](https://react.dev/).
