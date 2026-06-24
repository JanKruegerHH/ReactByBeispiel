# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A learning project porting MUI's official **CRUD dashboard** template (an employee
management UI) into a Vite + TypeScript setup (originally Create React App; migrated off
it — see the Build note). The upstream source is at
`/Users/U558343/Sources/ReactMuiSources/material-ui/docs/data/material/getting-started/templates/crud-dashboard`
— consult it when wiring up features that are stubbed out here.

Beyond the straight port, the project has grown a few **custom pages** that are NOT in
the upstream template (an airport/ops domain flavor — ZRH/VIE/BRU/FRA/MUC): an `Optimizer`
DataGrid, an `OpsAreaChart` line/area chart, and an `About` page.

## Commands

```bash
npm start        # Vite dev server at http://localhost:3000 (HMR); `npm run dev` is the same
npm run build    # Type-check (vite-plugin-checker) + production build into /build
npm run preview  # Serve the built /build output locally
npm test         # Vitest in watch mode (jsdom + RTL)
npm run test:run # Vitest once, non-watch (CI mode)
npm run typecheck   # Standalone `tsc --noEmit`
npm test -- <pattern>   # run only test files matching <pattern>
```

There are currently **no test files** in `src/` — Vitest is configured (`passWithNoTests`) so the
test scripts pass until you add some (name them `*.test.ts(x)` / `*.spec.ts(x)`).

Scripts run through **Vite** (`vite` / `vite build` / `vitest`). `npm run build` fails on real type
errors because `vite-plugin-checker` runs `tsc` during the build — but it does **not** lint (CRA's
ESLint-on-build is gone; add an ESLint 9 flat config if you want linting back).

## Stack

- **React 19** + **TypeScript 5** (strict, target ES2020, `react-jsx` runtime, `isolatedModules`,
  `moduleResolution: node`, `baseUrl: src` so `src`-relative absolute imports work)
- **Vite 8** (`@vitejs/plugin-react`) with `vite-plugin-checker` for in-build type checking; **Vitest**
  (jsdom) for tests. Config lives in `vite.config.ts` (build + test share one file)
- **MUI 9** (`@mui/material` + `@mui/icons-material` + `@mui/x-data-grid` + `@mui/x-charts`), styled via `@emotion`
- **react-router 7** — import from `react-router` (not `react-router-dom`)
- No backend; no state-management library

## Architecture

- **Entry point is `src/CrudDashboard.tsx`.** `src/index.tsx` mounts `<CrudDashboard />`, and the
  root `index.html` loads `src/index.tsx` as a module script (Vite convention — `index.html` lives at
  the project root, not in `public/`; `public/` holds static assets served at `/`). There is no `App.tsx`.
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

## Build note: Vite migration (was CRA + CRACO)

The project was originally Create React App (react-scripts 5) wrapped in CRACO to work around two
webpack-5 problems. It has since been **migrated to Vite**, which removes the need for both
workarounds — do not reintroduce `react-scripts`/CRACO:
- MUI v9's ESM (`.mjs`) build imports `react-transition-group/...` without a file extension; webpack 5
  enforced `fullySpecified` and refused to resolve it. Vite serves native ESM and has no such issue.
- CRA's `ForkTsCheckerWebpackPlugin` was being SIGABRT'd at its default memory limit, silently skipping
  type checks. Vite's `vite-plugin-checker` (configured in `vite.config.ts`) runs `tsc` in a worker so
  `npm run build` **fails on real type errors**; `npm run typecheck` runs the same check standalone.

`vite.config.ts` holds the whole toolchain config: the React plugin, the type checker, `resolve.tsconfigPaths`
(honours `baseUrl: src` natively — no `vite-tsconfig-paths` plugin needed), `build.outDir: 'build'` (kept so
the existing `.gitignore` `/build` rule applies), the dev server on port 3000, and the Vitest `test` block
(jsdom env, `src/setupTests.ts` for jest-dom matchers). Ambient module types (CSS imports, Vitest globals)
come from `src/vite-env.d.ts`.

**TypeScript was bumped 4.9 → 5** during the migration: MUI v9 ships `.d.ts` files using TS-5 syntax
(`const` type parameters), which TS 4.9 cannot even parse (`skipLibCheck` suppresses semantic, not
syntax, errors). A real type-check against MUI v9 requires TS 5.

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
