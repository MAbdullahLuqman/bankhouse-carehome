# Firebase setup

The admin uses Firebase Authentication for staff sign-in, Cloud Firestore for enquiries, and Firestore-backed care copy, blogs and landing pages. The Firebase Admin SDK runs on the server; browser clients cannot read or write Firestore directly.

1. Create a Firebase project, enable **Authentication → Email/Password**, create an admin user, and create a Cloud Firestore database.
2. Add a Web app in Firebase and copy its Web API key into `FIREBASE_API_KEY` in `.env.local`. The sign-in API calls Firebase from the server, so this variable does not need a `NEXT_PUBLIC_` prefix.
3. Create a service account key in **Project settings → Service accounts**. Copy its project ID, client email and private key into the matching `.env.local` fields. Keep the private key local and never commit it; preserve newlines as `\n` inside the quoted `FIREBASE_PRIVATE_KEY` value.
4. Set `FIREBASE_ADMIN_EMAILS` to the comma-separated email addresses allowed to use the admin. Only create accounts for trusted staff.
5. Restart `npm run dev`. The public enquiry form writes to `enquiries`; the admin manages those records and can update care page copy or create blog and landing pages in `siteContent`.
6. Deploy the included deny-by-default `firestore.rules` with the Firebase CLI or paste it into the Firestore Rules editor. Admin SDK access remains server-side.

Next.js loads `.env.local` automatically. Keep the service-account private key and all Firebase settings server-only: do not prefix them with `NEXT_PUBLIC_`, which would expose them to browser code. Prefixing an environment variable does not encrypt it. The repository includes placeholders in `.env.example`; replace them locally with credentials from your Firebase project before testing authentication or Firestore writes. Never commit `.env.local`.

## Start local Firebase for testing

No cloud project keys are needed for emulator testing:

1. Make sure Java 21 or newer is installed. If Homebrew installed it as keg-only, add it to this terminal's PATH with `export PATH="$(brew --prefix openjdk@21)/bin:$PATH"`. Then run `npm run firebase:emulators`. On first run, `npx` downloads Firebase CLI and the emulators. The Emulator UI opens at `http://localhost:4000`.
2. In another terminal, run `npm run dev:emulator`.
3. In the Emulator UI, create an Authentication email/password user with email `admin@bankhouse.local` and a test password.
4. Open `http://localhost:3000/admin/login` and sign in with that emulator user. Visit `/blog` for published posts; care copy and enquiries use the same local Firestore emulator.

Emulator records are local and are not sent to the production Firebase project. They are imported from and exported to the ignored `.firebase/emulator-data` folder so local test enquiries persist between runs. Stop the emulator with Ctrl+C. Do not set emulator hosts in production.
