# Prisma

```bash
# install prisma
npm install prisma@5.21.1

# start prism in project
npx prisma init

# format schema file
npx prisma format

# run migration to connect and apply database schema in your database
npx prisma migrate dev --name MIGRATION_NAME

# apply migration created in database development mode
npx prisma migrate dev

# apply migration created in database production mode
npx prisma migrate deploy
```

# Husky

Install dependencies:

```bash
# husky
npm install -D husky@9.1.6

# lint staged
npm install -D lint-staged@12.3.2
```

First of all, create a file called `.lintstagedrc.json` in the project root directory with this content:

```json
{
  "*.ts?(x)": ["eslint --fix", "prettier --write"]
}
```

below you can see the command to start husky in the project

```bash
# initi husky in project
npx husky init
```

To finish you must find the `.husky/pre-commit` file, open this file and change the content to the example below:

```bash
npx lint-staged
```
