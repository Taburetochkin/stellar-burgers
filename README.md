# Stellar Burgers

A single-page web app for an orbital burger joint. Pick buns, sauces, and fillings, assemble your own space burger, place an order, and watch the live order feed.

Built with React, TypeScript, and Redux Toolkit. Covered by unit tests (Jest), end-to-end tests (Cypress), and a Storybook component catalog.

## Features

- **Burger constructor.** Choose a bun and add sauces and fillings to build a burger. Ingredients are grouped into tabs (buns, sauces, fillings) with scroll-aware tab highlighting.
- **Ingredient details.** Each ingredient opens in a modal with its nutritional values and has its own URL (`/ingredients/:id`).
- **Placing orders.** Authenticated users can submit a burger and get an order number back.
- **Order feed.** A public feed of all recent orders with their status, plus aggregate stats (completed and in-progress orders). Every order opens in a modal with its full composition (`/feed/:number`).
- **Authentication.** Registration, login, logout, and password recovery and reset. Access and refresh tokens are handled automatically, and an expired access token is refreshed transparently.
- **User profile.** Edit your account details and browse your own order history.
- **Protected routes.** Profile pages are available only to signed-in users, while login and registration pages are available only to guests.
- **404 page** for unknown routes.

## Tech stack

| Area | Technologies |
| --- | --- |
| UI | React 18, TypeScript, CSS Modules, `@zlden/react-developer-burger-ui-components` |
| Routing | React Router 6 |
| State | Redux Toolkit (slices and async thunks), React Redux |
| Build | Webpack 5, `ts-loader`, `dotenv-webpack` |
| Unit tests | Jest, ts-jest, React Testing Library |
| E2E tests | Cypress |
| Components catalog | Storybook 7 |
| Code quality | ESLint, Prettier |

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <repository-url>
cd stellar-burgers
npm install
```

### Environment variables

The app reads the API address from the environment. Create a `.env` file in the project root:

```env
BURGER_API_URL=https://norma.nomoreparties.space/api
```

| Variable | Description |
| --- | --- |
| `BURGER_API_URL` | Base URL of the Stellar Burgers backend API, including the `/api` suffix |

The value above is the public API used by the Yandex Practicum course this project is based on. Replace it if you use your own backend.

### Run in development mode

```bash
npm start
```

The app is served at [http://localhost:4000](http://localhost:4000) with history API fallback, so deep links such as `/feed/12345` work on reload.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Webpack dev server on port 4000 |
| `npm test` | Run Jest unit tests with coverage (report in `coverage/`) |
| `npm run cypress:open` | Open the Cypress runner for E2E tests |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build a static Storybook |
| `npm run lint` / `npm run lint:fix` | Lint (and auto-fix) the sources |
| `npm run format` | Format `src/` with Prettier |

To produce a production bundle, run `npx webpack --mode=production`. The output is written to `dist/`.

## Testing

### Unit tests

```bash
npm test
```

Jest tests live next to the Redux code in `src/services/slices/__tests__/` and cover every slice (ingredients, burger constructor, user, order, feed) and the root store.

### End-to-end tests

Cypress tests are in `cypress/e2e/`. API calls are mocked with fixtures from `cypress/fixtures/`, so no backend is needed. Start the app first, then run Cypress:

```bash
npm start              # terminal 1
npm run cypress:open   # terminal 2
```

The scenarios cover:

- adding a bun, a filling, and a sauce to the constructor;
- assembling a full burger;
- opening and closing the ingredient modal;
- placing an order end to end.

The tests expect the app at `http://localhost:4000`.

### Storybook

```bash
npm run storybook
```

Presentational components from `src/components/ui` are documented as stories in `src/stories/`.

## Routes

| Path | Access | Page |
| --- | --- | --- |
| `/` | Public | Burger constructor |
| `/ingredients/:id` | Public | Ingredient details (modal) |
| `/feed` | Public | Order feed |
| `/feed/:number` | Public | Order details (modal) |
| `/login`, `/register`, `/forgot-password`, `/reset-password` | Guests only | Authentication |
| `/profile` | Signed-in users | Profile |
| `/profile/orders` | Signed-in users | Order history |
| `/profile/orders/:number` | Signed-in users | Order details (modal) |
| `*` | Public | 404 |

## Project structure

```
├── .storybook/               # Storybook configuration
├── cypress/
│   ├── e2e/                  # E2E scenarios
│   └── fixtures/             # Mock API responses
├── public/                   # HTML template, manifest, favicon
├── src/
│   ├── components/
│   │   ├── ui/               # Presentational components (and ui/pages)
│   │   ├── app/              # Root component with routing
│   │   ├── protected-route/  # Route guard for auth-only and guest-only pages
│   │   └── ...               # Container components connected to the store
│   ├── pages/                # Route-level pages
│   ├── services/
│   │   ├── slices/           # Redux slices and thunks (+ __tests__)
│   │   └── store.ts          # Store setup and typed hooks
│   ├── stories/              # Storybook stories
│   └── utils/
│       ├── burger-api.ts     # API client with token refresh
│       ├── cookie.ts         # Cookie helpers
│       └── types.ts          # Shared TypeScript types
├── jest.config.ts
├── webpack.config.js
└── tsconfig.json
```

### Architecture notes

- **Presentational and container split.** Components in `src/components/ui` are pure and receive everything via props, which makes them easy to cover in Storybook. Matching components one level up connect them to the Redux store.
- **State slices.** The store consists of five slices: `ingredients`, `burgerConstructor`, `user`, `feed`, and `order`. Server communication is done with `createAsyncThunk`.
- **API client.** All requests go through `src/utils/burger-api.ts`. `fetchWithRefresh` retries a request after refreshing the access token when the server reports that it has expired. The access token is kept in a cookie (via `cookie.ts`) and the refresh token in `localStorage`.
- **Path aliases.** `@components`, `@ui`, `@ui-pages`, `@pages`, `@slices`, `@selectors`, `@api`, and `@utils-types` are configured in both `tsconfig.json` and `webpack.config.js`.

## Credits

Based on a Yandex Practicum project. The UI kit is provided by the course package `@zlden/react-developer-burger-ui-components`.
