### Resource Serve 
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/Resource serve-v1.0.0-black
" alt="NPM Version" /></a>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/node-v18.17.0-red
" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/nest-10.2.1-yellow
" alt="NPM Version" /></a>
<br>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a></p>

### Overview

This project is a foundational project that provides a robust set of features for building secure and scalable server-side applications. This project is designed to serve as a starting point for implementing authentication and authorization mechanisms in your applications, allowing you to focus on building your core features.

### Key Features

- **User Management:** Easily create, retrieve, update, and delete user accounts.

- **Authentication:** Securely handle user authentication with token-based JWT (JSON Web Token) authentication.

- **Token Generation:** Automatically generate JWT tokens upon successful user authentication.

- **Role-Based Access Control (RBAC):** Define roles for users and specify which resources and services each role can access.


- **Email Verification:** Enhance account security through email verification during the user registration process.

- **Password Reset via Email:** Provide users with the ability to reset their passwords by sending a notification when a reset request is initiated and confirming the reset via email.


### Getting Started

1. **Installation:** Clone the repository and install dependencies.
    ```bash
    $ git clone https://github.com/jssmy/resource-serve.git
    $ cd resource-serve
    $ npm install
    ```

2. **Config .env:** Add environment values,  add database and email configuration in `.env` file:

    ```env
    DB_USER = 'user_db_example'
    DB_PASSWORD = 'xxxxxx'
    DB_PORT = 3306
    DB_NAME = 'db_name_example'
    DB_HOST = 'your_host_here'
    JWT_TOKEN_SECRET = 'add_token_secret_for_create_jwt_access'
    JWT_TOKEN_EXPIRE = '2h'
    JWT_REFRESH_TOKEN_SECRET = 'add_token_secret_for_create_jwt_refresh'
    JWT_REFRESH_TOKEN_EXPIRE = '8h'
    MAIL_DRIVER = 'smtp'
    MAIL_HOST = 'mail.domain.com'
    MAIL_PORT  = '465'
    MAIL_FROM_ADDRESS = 'not-reply@domain.com'
    MAIL_FROM_NAME= 'App name'
    MAIL_USERNAME = 'not-reply@barbacode.com'
    MAIL_PASSWORD = 'xxxxxxxx'
    MAIL_CONFIRM_EXPIRES_IN = 48
    MAIL_RESET_PASSWORD_EXPIRES_IN = 48
    MAIL_CONFIRM_URL = 'http://domainapp.com/confirm-account'
    MAIL_RESET_PASSEWORD_URL = 'http://domainapp.com/reset-password'
    ```


3. **Running app:**

    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
    ```
4. **Run seed:** run seed to create root user and main access. Please take note of password
    ```bash
    $ npm run seed
    $ [Nest] 17515  - 24/01/2024, 23:09:00     LOG ********************************************
    $ [Nest] 17515  - 24/01/2024, 23:09:00     LOG *           Seed initialized               *
    $ [Nest] 17515  - 24/01/2024, 23:09:00    WARN ********************************************
    $ [Nest] 17515  - 24/01/2024, 23:09:00    WARN     PLEASE NOT USE THIS ON PRODUCCTION     *
    $ [Nest] 17515  - 24/01/2024, 23:09:03     LOG ********************************************
    $ [Nest] 17515  - 24/01/2024, 23:09:03     LOG *      Connection Database stablish        *
    $ [Nest] 17515  - 24/01/2024, 23:09:05     LOG ********************************************
    $ [Nest] 17515  - 24/01/2024, 23:09:05     LOG *      NAME: RootApplication  
    $ [Nest] 17515  - 24/01/2024, 23:09:05     LOG *      MAIL: root@mail.com                 
    $ [Nest] 17515  - 24/01/2024, 23:09:05     LOG *      ROOT PASSWORD: xxxxxxxx          
    $ [Nest] 17515  - 24/01/2024, 23:09:05     LOG ********************************************
    $ [Nest] 17515  - 24/01/2024, 23:09:09     LOG ********************************************
    $ [Nest] 17515  - 24/01/2024, 23:09:09     LOG *         Seed completed                   *
    $ [Nest] 17515  - 24/01/2024, 23:09:09     LOG ********************************************
    ```