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

- **React 19** with **TypeScript** (strict mode), compiled to ES5
- **Create React App** (react-scripts 5) — no custom webpack/Babel config
- **Testing Library** (`@testing-library/react` + `@testing-library/jest-dom`) for component tests
- No routing, no state management library — intentionally minimal
