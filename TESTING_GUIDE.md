# CareerLens AI Testing Guide

## Features

- Register, login, session check, and logout.
- PDF/DOCX resume upload.
- Job description input.
- Resume and job requirement extraction.
- Skill normalization, such as `React.js` to `React`.
- Matched, partial, and missing skill detection.
- Evidence for each skill result.
- Deterministic compatibility scoring.
- Gemini explanations when configured.
- Demo analysis without an account.
- Saved analysis history, metrics, deletion, and report reopening.
- Insights, Job Tracker, Settings, and Help routes.
- Responsive dashboard with charts and loading/error states.

## Start the App

1. Make sure MongoDB is running locally.
2. Confirm `.env.local` contains `MONGODB_URI` and `JWT_SECRET`.
3. Run:

```powershell
npm install
npm run dev:full
```

4. Open [http://localhost:5173](http://localhost:5173).

## Test the Demo

1. Open the Overview page.
2. Click **Try demo**.
3. Confirm the score, matched skills, missing skills, and evidence appear.
4. Open **Insights** and confirm saved-account metrics are shown when logged in.

## Test Authentication

1. Click **Sign in** from My analyses or Settings.
2. Choose **Create a new account**.
3. Enter a name, valid email, and password with at least 8 characters.
4. Confirm registration succeeds.
5. Open Settings and confirm the user name and email appear.
6. Open My analyses and confirm the protected page loads.
7. Sign out and confirm saved data is no longer visible.

## Test Resume Analysis

1. Sign in.
2. Return to Overview.
3. Upload a PDF or DOCX resume.
4. Paste a job description containing required and preferred skills.
5. Click **Analyze my match**.
6. Confirm the UI shows:
   - Compatibility score
   - Required coverage
   - Matched skills
   - Missing skills
   - Evidence text
   - Recommendations when available
7. Open My analyses and confirm the report is saved.
8. Open the report, then test Delete.

## Test Error Handling

- Upload an unsupported file type.
- Upload a file larger than 5 MB.
- Submit an empty or very short job description.
- Try a private analysis while signed out.
- Try an incorrect password.
- Visit an unknown route and confirm it redirects to Overview.

## Verification Commands

```powershell
npm test
npm run lint
npm run build
```

Expected result: all tests pass, lint completes without warnings, and the production build succeeds.

## API Smoke Checks

```powershell
Invoke-WebRequest http://localhost:5173/api/health
Invoke-WebRequest http://localhost:5173/api/analyze/demo
```

The API requires MongoDB for registration, private analysis, and saved history. The demo endpoint works without an authenticated account.
