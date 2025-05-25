# Movie App

An Angular-based movie browsing application with user authentication and search functionality.

## Features
- Signup, login, logout with JWT token storage
- Search movies via external API
- Responsive layout with sidebar and navbar
- Styled with Tailwind CSS (DaisyUI cupcake theme)

## Prerequisites
- Node.js >= 16.x
- npm >= 8.x

## Setup & Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd movie-app/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
Update API URL in `src/environments/environment.ts` or `environment.development.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url'
};
```

## Running the App
Start the dev server:
```bash
npm start
```
Open `http://localhost:4200` in your browser.

## Building for Production
```bash
npm run build
```
Artifacts in `dist/`.

## Running Tests
```bash
npm test
```

## Project Structure
```
src/
 ├─ app/
 │   ├─ components/   # UI components (navbar, sidebar, login, signup, search)
 │   ├─ services/     # Auth and data services
 │   ├─ app.routes.ts
 │   ├─ app.config.ts
 │   └─ auth.service.ts
 ├─ assets/           # Static assets
 ├─ environments/     # Env-specific configs
 ├─ styles.css        # Global Tailwind + DaisyUI styles
 └─ main.ts           # Bootstrap logic
```

Enjoy browsing movies!
