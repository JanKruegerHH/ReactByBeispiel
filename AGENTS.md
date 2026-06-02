# ReactByBeispiel

Monorepo of independent React sample projects. Each is standalone with its own
`package.json`, dependencies, and build setup — no root workspace config.

Run commands from the individual project directory, not the root.

## Projects

| Directory | Build | Framework | Test | Lint |
|---|---|---|---|---|
| `open-code-sample-01/` | `react-scripts` (CRA) | React 19, TS 4.9 | `npm test` (Jest) | embedded in CRA |
| `tic-tac-toe/` | Vite 8 | React 19, TS 6.0, Tailwind 4 | `npm test` (Vitest) | `npm run lint` (flat ESLint) |
| `react-mui-typescript/` | Vite 8 | React 19, TS 5.9, MUI 9 | `npm test` (Vitest) | — |
| `claude-code-sample-01/product-table/` | Vite 8 | React 19, TS 6.0 | — | `npm run lint` (flat ESLint) |

## Commands (per project)

- **`open-code-sample-01`**: `npm start` (port 3000), `npm test` (Jest, interactive)
- **`tic-tac-toe`**: `npm run dev` (Vite), `npm run build` (tsc && vite build), `npm test` (Vitest), `npm run lint`
- **`react-mui-typescript`**: `npm start` (Vite, port 3000), `npm run build` (tsc && vite build), `npm test` (Vitest)
- **`product-table`**: `npm run dev` (port 5199 per `.claude/launch.json`), `npm run build` (tsc -b && vite build), `npm run lint`

## Conventions

- Entrypoints: `src/index.tsx` (CRA/Vite projects using index.html) or `src/main.tsx` (product-table)
- **`open-code-sample-01`** uses `moduleResolution: "node"` (CRA default); all Vite projects use `"bundler"`
- Vitest config lives inside `vite.config.ts` — uses `/// <reference types="vitest/config" />` or imports `defineConfig` from `vitest/config`
- Testing: CRA project uses Jest (`react-scripts test`); Vite projects use Vitest with jsdom, globals enabled, `setupFiles: './src/setupTests.ts'`
- ESLint is flat config (`eslint.config.js`) only in `tic-tac-toe` and `product-table`
- No CI, no pre-commit hooks, no shared instructions files exist
- `.gitignore` and `node_modules` are per-project (no hoisting)
