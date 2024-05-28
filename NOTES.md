# Project Notes

## Resources

### [Zod](https://zod.dev/)

Zod is a TypeScript-first library for schema declaration and validation. In simple terms, it helps you define and check the structure of your data to ensure it matches your expectations.

#### What is Zod?

Zod is a library used to define schemas (blueprints) for your data and then validate that your data matches these schemas. It's particularly useful in TypeScript projects.

#### Why Use Zod?

- **Type Safety**: Zod works well with TypeScript, ensuring that your data conforms to the expected types.
- **Validation**: It helps you catch errors early by validating data before it's used, preventing bugs caused by unexpected data shapes.
- **Simplicity**: Zod is straightforward to use with clear syntax, making it easy to integrate into your React projects.

## Important Points

### Backend Application Architecture with Next.js

When we create a pure backend application like Express or other frameworks, the application starts and establishes a connection to the database, which persists throughout its runtime.

However, Next.js operates within an edge computing framework. Unlike traditional backend setups, where the connection remains active, Next.js establishes a connection with the backend server only when a user makes a request to the application. This dynamic connection setup ensures efficient resource utilization and responsiveness, aligning with the edge computing paradigm.
And also it's crucial to manage database connections efficiently. Always check if a connection already exists, and if so, reuse the same connection. If no connection exists, establish a new connection. This approach optimizes resource utilization and improves application performance.
