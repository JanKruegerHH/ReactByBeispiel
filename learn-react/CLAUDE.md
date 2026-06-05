# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This project is a hands-on learning sandbox following the official React tutorial at https://react.dev/learn/describing-the-ui. It was bootstrapped with Create React App (TypeScript template). Use `src/App.tsx` as the main entry point for exercises.

## Commands

```bash
npm start        # Dev server at http://localhost:3000 (hot reload)
npm test         # Jest + React Testing Library in watch mode
npm run build    # Production build into /build
```

Run a single test file:
```bash
npm test -- App.test.tsx
```

## Stack

- **React 19** with **TypeScript 4.9** (strict mode), compiled to ES5, `react-jsx` runtime
- **Create React App** (react-scripts 5) — no custom webpack/Babel config
- **react-router 7** — note: import from `react-router` (not `react-router-dom`) in this version
- **Testing Library** (`@testing-library/react` + `@testing-library/jest-dom`) for component tests
- No state management library — intentionally minimal

## Architecture

- `src/index.tsx` mounts `<App />`; `src/App.tsx` is the root and owns all routing.
- Routing lives entirely in `App.tsx`: a `<BrowserRouter>` wraps a `<nav>` of `<NavLink>`s
  (active links styled red via the `isActive` render-prop) and a `<Routes>` block.
- Routes can nest. `/posts` renders `PostsHeader` (a layout that renders `<Outlet />`), and its
  `index` route renders `PostList` into that outlet. `path="*"` renders `NoMatch` (404).
- One component per file under `src/components/`, each a `React.FC` arrow function with a
  default export, returning a `<section>`. Styling is inline `style={{...}}` objects, not CSS classes.

## Gotchas

- The default `src/App.test.tsx` from CRA still asserts a "learn react" link that `App.tsx`
  no longer renders, so `npm test` fails out of the box. Update or replace the test when touching `App`.
