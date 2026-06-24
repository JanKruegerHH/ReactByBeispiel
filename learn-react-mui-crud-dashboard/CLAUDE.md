# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A learning project porting MUI's official **CRUD dashboard** template (an employee
management UI) into a Create React App (TypeScript) setup. The upstream source is at
`/Users/U558343/Sources/ReactMuiSources/material-ui/docs/data/material/getting-started/templates/crud-dashboard`
— consult it when wiring up features that are stubbed out here.

Beyond the straight port, the project has grown a few **custom pages** that are NOT in
the upstream template (an airport/ops domain flavor — ZRH/VIE/BRU/FRA/MUC): an `Optimizer`
DataGrid, an `OpsAreaChart` line/area chart, and an `About` page.

## Commands

```bash
npm start        # Dev server at http://localhost:3000 (hot reload)
npm test         # Jest + React Testing Library in watch mode
npm run build    # Production build into /build
npm test -- <pattern>   # run only test files matching <pattern>
```

There are currently **no test files** in `src/` — `npm test` finds nothing to run until you add some.

Scripts run through **CRACO** (`craco start/build/test`), not raw `react-scripts` — see the build
note below. `npm run eject` still calls `react-scripts eject`.

No separate lint command — ESLint runs (via the `react-app` config) during `npm start`/`build`.

## Stack

- **React 19** + **TypeScript 4.9** (strict, target ES2020, `react-jsx` runtime, `isolatedModules`,
  `baseUrl: src` so `src`-relative absolute imports work)
- **Create React App** (react-scripts 5) wrapped by **CRACO** for a webpack override (see Build note)
- **MUI 9** (`@mui/material` + `@mui/icons-material` + `@mui/x-data-grid` + `@mui/x-charts`), styled via `@emotion`
- **react-router 7** — import from `react-router` (not `react-router-dom`)
- No backend; no state-management library

## Architecture

- **Entry point is `src/CrudDashboard.tsx`.** `src/index.tsx` mounts `<CrudDashboard />`. (CRA's
  `App.tsx`/`App.test.tsx` boilerplate has been deleted — there is no `App.tsx`.)
- `CrudDashboard.tsx` wraps the app in `AppTheme` → `CssBaseline` → `NotificationsProvider` →
  `DialogsProvider` → `RouterProvider`. Routing uses **`createHashRouter`** with a route-config
  array (not JSX `<Route>`s): a single `DashboardLayout` parent renders `<Outlet/>` and its
  children — the employee CRUD routes (`/employees`, `/employees/:employeeId`, `/employees/new`,
  `/employees/:employeeId/edit`), the custom pages (`/optimizer`, `/area-chart`, `/about`), and the
  `*` fallback (→ `EmployeeList`).
- **Data layer is a mock "API" backed by `localStorage`** under key `employees-store`. The
  `getMany`/`getOne`/`createOne`/`updateOne`/`deleteOne`/`validate` functions are `async` to emulate
  a server; `getMany` does filtering/sorting/pagination against the x-data-grid models. Validation
  follows the [Standard Schema](https://standardschema.dev/) issue shape.
    The single canonical file is **`src/data/employees.ts`**; all components import it as
    `from '../data/employees'`. (An earlier duplicate `src/employees.ts` has been removed.)
  The two custom pages have their own data files that **do not follow this mock-API pattern** —
  `src/data/proposals.ts` (synchronous `getProposals()` over an in-memory array, feeds the
  `Optimizer` DataGrid) and `src/data/ops-data.ts` (a static `dataset` of dated airport metrics,
  feeds `OpsAreaChart`). Neither persists to `localStorage` or is `async`.
- **Forms:** `EmployeeForm.tsx` is shared by `EmployeeCreate` and `EmployeeEdit`, driven by a
  `{ values, errors }` `formState` plus `onFieldChange`/`onSubmit` callbacks.
- **Cross-cutting UI hooks** live under `src/hooks/` as context + provider + hook trios:
  `useDialogs` (imperative `alert`/`confirm`/`prompt`/custom dialogs) and `useNotifications`
  (snackbar queue). Use these instead of ad-hoc dialog/snackbar state.
- **Theming:** `src/theme/AppTheme.tsx` builds the theme from `themePrimitives.ts` and merges
  per-area component overrides from `src/theme/customizations/*`. Light/dark via MUI color schemes
  (`ThemeSwitcher` toggles them). Customizations are opted in à la carte in `AppTheme` and
  `CrudDashboard`.

## Build note: CRACO + MUI v9 ESM workaround

react-scripts 5 (webpack 5) fails to build MUI v9 out of the box: MUI's ESM (`.mjs`) build imports
`react-transition-group/...` without a file extension, and webpack enforces `fullySpecified` on ESM
origins, refusing to auto-append `.js`. Since react-scripts locks its webpack config, the project
uses **CRACO** (`craco.config.js`) to push a rule setting `resolve.fullySpecified = false` for
`.m?js`. Don't revert the scripts to `react-scripts` or the build breaks again.

`craco.config.js` also bumps the `ForkTsCheckerWebpackPlugin` `memoryLimit` to 4096 MB — CRA's
2048 MB default made the type-check worker get SIGABRT'd, silently skipping type checking. With the
bump the **in-build type checker works**, so `npm run build` fails on real type errors; no separate
`tsc --noEmit` pass is needed.

Note: `--isolatedModules` requires every file to be a module. `src/theme/customizations/datePickers.ts`
is fully commented out (date pickers are stubbed) and carries a trailing `export {}` so it stays a
valid module — keep that line until the contents are restored.

## Porting status / gotchas

This is a partial port — several upstream pieces are intentionally commented out, not missing:
- `DashboardSidebar` renders in `DashboardLayout.tsx`. Its example nav links don't all map to real
  routes, so the `*` fallback route (→ `EmployeeList`) exists so they don't 404.
- Date-picker support (`@mui/x-date-pickers`, `dayjs`) is commented out in `EmployeeForm.tsx` and
  `CrudDashboard.tsx` — `joinDate` is a plain string field. Add those deps before re-enabling.
- When restoring a stubbed feature, copy the corresponding file from the upstream MUI template path
  above rather than reconstructing it.
