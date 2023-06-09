# Cashfolio

## Development

Install dependencies:

```sh
npm install
```

Run the **database**:

```sh
npm run dev:db
```

Start the **Remix** app in the dev server:

```sh
npm run dev:remix
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

## Deployment

Trigger Fly deployment from the local machine:

```sh
npm run deploy
```

## Environment Variables

See [`.env.example`](./.env.example) file

# Tech Stack

- App

  - Remix
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
  - ts-node
