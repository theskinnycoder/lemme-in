# Lemme In

An automation tool for [Apxor](https://apxor.com) employees to auto-submit the CIE Entry Access Form on working days.

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/theskinnycoder/lemme-in/blob/main/LICENSE)

## **Tech Stack**

- **Frontend** : Next.js (React), Chakra UI
- **Auth Server** : Supabase Auth
- **Serverless Functions** : Next.js API Routes, Firebase Cloud Functions (for the CRON job)
- **DataBase** : Supabase's PostgreSQL Database
- **Hosting**: Vercel

## **Run Locally**

1. Clone the repo

```bash
  git clone https://github.com/theskinnycoder/lemme-in.git
```

2. Go to the project directory

```bash
  cd lemme-in
```

3. Install dependencies

```bash
  npm i
```

4. Add the environment variables to **`.env`** (Take a look at the **`.env.example`**)

5. Start the server

```bash
  npm start
```

## **Environment Variables**

To run this project, you will need to add the following environment variables to your **`.env`** file (you'll get yours from your supabase dashboard)

- **`NEXT_PUBLIC_SUPABASE_URL`**
- **`NEXT_PUBLIC_SUPABASE_KEY`**

## **Authors**

- [Rahul SriRam](https://www.github.com/theskinnycoder)

## **Queries**

For any additional info or queries, text me on [Twitter](https://twitter.com/rahulsriramdev)

## **License**

[MIT](https://choosealicense.com/licenses/mit/)
