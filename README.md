# express-base-project

🚀 A simple CLI to quickly generate a clean, modular Express.js boilerplate.

## Features

- Generate Express project with minimal setup
- Built-in CLI using `inquirer`
- Spinner UI for better feedback
- Lightweight and customizable

## Installation

Via NPX (recommended):

```bash
npx express-base-project
```

Install globally:

```bash
npm install -g express-base-project
```

## Usage

```bash
npx express-base-project
```

Optional arguments:

```bash
npx express-base-project --target ./my-app
```

## After Setup

After your project is generated, follow these steps:

### 1. Configure `.env` for your database

Open the `.env` file and set the `DATABASE_URL` according to your database configuration.

Example for PostgreSQL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

### 2. Add `Role` enum and `User` model to schema.prisma

Open the file `prisma/schema.prisma` and add the following:

```prisma
enum Role {
  USER
  ADMIN
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
}
```

> You can customize the `User` model fields to fit your needs.

### 3. Run Prisma migration

Use the following command to apply the schema changes and generate the Prisma Client:

```bash
npx prisma migrate dev --name init
```

Or if you only want to generate the Prisma Client:

```bash
npx prisma generate
```

## File Structure (Generated Project)

```
my-app/
├── app.js
├── routes/
├── repositories/
├── middlewares/
├── utils/
├── config/
├── .env
├── prisma/
│   └── schema.prisma
└── package.json
```

## Requirements

- Node.js ≥ 18

## License

MIT © 2025 Muhamad Ichsan Dwi Farhana
