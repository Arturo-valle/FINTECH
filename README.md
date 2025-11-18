# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firebase configuration

Create a `.env.local` file with your Firebase Web SDK credentials. All values can be copied from your Firebase project settings:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_APPCHECK_KEY= # reCAPTCHA v3 site key
# Optional: enable App Check debug token locally
NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN=
```

Run the app with `npm run dev` after installing dependencies.

## Local emulators

You can run the Firebase emulators to avoid hitting production services:

1. Install the Firebase CLI and start the emulators:

   ```bash
   firebase emulators:start --import=./emulator-data --export-on-exit
   ```

2. Point the Next.js app to the emulators by setting these environment variables before running `npm run dev`:

   ```
   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
   FIREBASE_STORAGE_EMULATOR_HOST=127.0.0.1:9199
   NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN=local-dev-token
   ```

3. Deploy the included security rules when ready:

   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

## Development

- Run the linter with Next.js defaults (configured via `.eslintrc.json`):

  ```bash
  npm run lint
  ```

- Run TypeScript type checks without emitting output:

  ```bash
  npm run typecheck
  ```
