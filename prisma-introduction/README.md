# Welcome to Next.js

This is the most minimal starter for your Next.js project.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world&project-name=hello-world&repository-name=hello-world)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example hello-world hello-world-app
```

```bash
yarn create next-app --example hello-world hello-world-app
```

```bash
pnpm create next-app --example hello-world hello-world-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
## Setting up your own database

1. Create a `.env` file in the root of your project and add your database connection string. For example:

    ```env
    DATABASE_URL=your-database-connection-string
    ```

2. Replace `your-database-connection-string` with the connection string for your own database.

3. Update your application code to use the database connection from the `.env` file.

For more information, refer to the [Next.js Environment Variables documentation](https://nextjs.org/docs/basic-features/environment-variables).