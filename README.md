# Bank House Care Home

Next.js public-site redesign with a separate, existing admin dashboard.

```sh
npm install
npm run dev
```

For a production preview and the browser checks:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
npm run typecheck
npm run lint
npx playwright install chromium
npm run check:site -- http://127.0.0.1:3100
```

The check script visits all 16 public routes at 360, 390, 768 and 1440px, saves full-page screenshots to `reports/generated`, and checks overflow, images, target sizes, navigation, focus, gallery dialogs, form validation, reduced motion, no-JavaScript access and admin login/logout.

Development uses `.next`; production uses `.next-production`, allowing a dev server and production preview to run without overwriting each other’s generated files.

## Content awaiting confirmation

Public content lives in `lib/data.ts`. Phone, email, address, CQC information and brochure are deliberately unset; populate them only with owner-verified details. A verified address enables the Google Maps embed. Nursing and respite provision remain unconfirmed.

The photographs are labelled illustrations, not photographs of Bank House. Their source URLs are recorded in `gallery`. Lora and Inter Latin font files are self-hosted in `public/fonts` under their SIL Open Font Licenses.

Fees, attributable testimonials, actual facilities, photography and approved privacy, cookies, terms and accessibility content must be supplied before this preview is ready for publication. Legal pages currently contain explicitly marked missing-content states.

The enquiry form is an honest design preview: it checks inputs locally, sends no requests and saves no information. Real enquiry delivery is outside this implementation.

The current admin routes and sample dashboard are preserved. Browser checks use `ADMIN_PASSWORD` if provided, otherwise the existing local demo password.

The requested `emil-design-eng` skill is installed in `.agents/skills/emil-design-eng` and is available in subsequent turns.
