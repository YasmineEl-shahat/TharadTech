# Nuxt 3 Auth Project

This is a Nuxt 3 project that includes authentication, profile management, and protected routes using middleware.

## Features

- User registration and login
- OTP verification
- Profile update (including password and profile picture)
- Route protection via middleware
- TailwindCSS for styling

## Project Structure

- `pages/`: Contains all page components (e.g., `auth/login.vue`, `profile.vue`, `index.vue`)
- `stores/`: Contains Pinia stores, including `auth.ts`
- `middleware/`: Contains route guards like `auth.ts` and `guest.ts`
- `components/`: Contains reusable UI components
- `public/images/`: Contains static images used across the app

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YasmineEl-shahat/TharadTech.git
   cd TharadTech

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
Then open your browser and go to:

http://localhost:3000



