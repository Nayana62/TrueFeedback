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

### [Resend](https://resend.com)

"Resend" is an email API for developers, providing functionality to send emails programmatically. It's commonly used in email systems and applications for scenarios like verification emails, password reset links, or notifications. This API allows developers to integrate email sending capabilities into their applications seamlessly, offering flexibility and control over the email sending process.

### [react-email](https://react.email)

"React Email" utilizes the React JavaScript library to design email templates for various purposes such as email marketing campaigns or transactional emails. By leveraging React's component-based architecture and JSX syntax, developers can create dynamic and visually appealing email templates with reusable components. This approach streamlines the process of designing and maintaining emails, offering flexibility and efficiency. Once designed, these React email templates can be rendered and sent through email service providers or custom email sending solutions.

---

## Important Points

### Backend Application Architecture with Next.js

When we create a pure backend application like Express or other frameworks, the application starts and establishes a connection to the database, which persists throughout its runtime.

However, Next.js operates within an edge computing framework. Unlike traditional backend setups, where the connection remains active, Next.js establishes a connection with the backend server only when a user makes a request to the application. This dynamic connection setup ensures efficient resource utilization and responsiveness, aligning with the edge computing paradigm.
And also it's crucial to manage database connections efficiently. Always check if a connection already exists, and if so, reuse the same connection. If no connection exists, establish a new connection. This approach optimizes resource utilization and improves application performance.
