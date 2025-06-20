<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# **Overview**

This repository contains a basic NestJS project written in TypeScript. The project is structured using the standard NestJS modular pattern and integrates Prisma ORM with a PostgreSQL database. Authentication is implemented with JWT tokens. Key scripts are defined in `package.json` and environment variables are stored in `.env` files.

# **Project Structure**

```BASH
nestjs-learning-v2/
├── src/                    # Application source code
│   ├── auth/               # Authentication module
│   ├── bookmark/           # Bookmark CRUD module
│   ├── prisma/             # Prisma service module
│   ├── user/               # User profile module
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application bootstrap
├── prisma/                 # Prisma schema and migrations
├── test/                   # E2E tests using Jest and Pactum
├── docker-compose.yml      # Dev/test PostgreSQL containers
├── package.json            # Scripts and dependencies
├── .env / .env.test        # Environment variables
└── README.md               # Basic instructions

```

**Key Points in the Code**

- **Application bootstrap** sets up a global validation pipe and listens on port 3333.
    
- **Root module** imports the config module (global), authentication, user, bookmark, and Prisma modules.
    
- **Auth service** handles user sign‑up, sign‑in, and JWT token creation using argon2 for hashing and `JwtService` for token generation.
    
- **JWT strategy** validates tokens extracted from the `Authorization` header and retrieves user data from the database.
    
- **Custom `JwtGuard`** extends Nest’s `AuthGuard` to protect routes with JWT auth.
    
- **GetUser decorator** allows controllers to access the authenticated user from the request object.
    
- **User service** exposes an `editUser` method to update profile data in Prisma and return the sanitized user record.
    
- **Bookmark module** provides CRUD operations for bookmarks, ensuring each bookmark belongs to the requesting user before edits or deletion.
    

**Important Scripts and Configuration**

- Environment variables such as `DATABASE_URL` and `JWT_SECRET` reside in `.env`.
    
- Several scripts manage development and test databases and run the app or tests. Example commands include `yarn start:dev`, `yarn db:dev:restart`, and `yarn test:e2e`.
    
- The README summarizes installation, run, and test instructions.
    

**Suggestions for Further Learning**

1. **Explore NestJS Fundamentals**  
    Understand modules, controllers, and services. Check how dependency injection works in NestJS. The `auth`, `user`, and `bookmark` directories provide good examples.
    
2. **Prisma and Database Migrations**  
    Examine `prisma/schema.prisma` and the `migrations/` folder to learn how database schema changes are managed. The provided scripts automate running migrations against dev and test databases.
    
3. **Authentication and Authorization**  
    Review JWT generation and validation in `auth.service.ts` and `jwt.strategy.ts`. Learn how guards and custom decorators (like `GetUser`) are used to secure endpoints.
    
4. **Testing with Pactum and Jest**  
    The `test/` directory contains an end‑to‑end test suite (`app.e2e-spec.ts`) that demonstrates how to test APIs using Pactum.
    
5. **Docker-based Development**  
    `docker-compose.yml` defines PostgreSQL containers for development and testing. Understanding Docker will help in replicating the environment locally.
    
6. **Next Steps**
    
    - Experiment with more NestJS features such as interceptors, filters, and middleware.
        
    - Consider adding logging, configuration validation, or role-based authorization.
        
    - Implement unit tests for individual services and controllers, not just e2e tests.
        

This repository serves as a concise example of how to build a simple API with NestJS, integrate Prisma for database access, and secure routes with JWT authentication. It’s a solid base for experimenting with more advanced NestJS concepts.
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
