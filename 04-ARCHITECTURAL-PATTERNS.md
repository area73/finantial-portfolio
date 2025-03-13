# Architectural Patterns Used

## Layered Architecture Pattern:

Description: The application is organized into separate layers, improving the separation of concerns.

**Evidence:**

**Advantages:**

- Facilitates scalability by keeping each layer independent.
- Makes unit testing easier for each component.

## Modular Pattern

Description: The components of the system are separated into specific modules .

**Evidence:**

**Advantages:**

- Helps maintain the code organized and easily extendable.
- New modules can be added without affecting other components.

## Centralized Configuration Pattern:

Description: The configuration (e.g., ports, route entry points, secrets) is centralized in a single file (`config.ts`), which in turn reads from a `.env` file.

Storing configuration in the environment separate from code is based on The [Twelve-Factor App methodology](https://12factor.net/config).

**Advantages:**

- Facilitates configuration changes without modifying the codebase.
- Allows differentiation between development, testing, and production configurations.
- Improves security by not exposing secrets in the source code.

## Route Guard Pattern:

Description: Protected routes require token verification before they are accessible.

**Evidence:**

- `verifyToken` middleware is applied to all routes after the `authEntryPoint`.

**Advantages:**

- Enhances security by controlling access to protected resources.
- Ensures that only authenticated users can access certain routes.
