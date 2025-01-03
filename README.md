# Cashfolio

[![Deploy](https://github.com/felixmokross/cashfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/felixmokross/cashfolio/actions/workflows/deploy.yml)

## Development

Install dependencies:

```sh
npm install
```

Run the **database**:

```sh
npm run dev:db
```

Migrate the database:

```sh
npx prisma migrate dev
```

Start the **React Router** app in the dev server:

```sh
npm run dev:react-router
```

Start **Storybook** by

```sh
npm run dev:storybook
```

Run DB, dev server, and Storybook in one command:

```
npm run dev
```

Start Playwright in UI Mode:

```sh
npm run e2e
```

## Environment Variables

See [`.env.example`](./.env.example) file.

## Tech Stack

- App

  - React Router (framework)
  - Prisma
  - Headless UI
  - openid-client
  - React Aria
  - Heroicons
  - React Number Format
  - date-fns
  - slugify
  - tiny-invariant

- Dev

  - TypeScript
  - Tailwind CSS
  - Vitest
  - Playwright
  - Auth0 (managing users in Playwright tests)
  - Storybook
  - bun (for running e2e clean script)

## Release Process

1. Create a tag for the release version `v<major>.<minor>.<patch>`
2. Push the tag to the repo

This creates automatically a corresponding release on GitHub and deploys it to production.
