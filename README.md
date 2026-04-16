# NC News Back End

## Table of Contents

- [Project Overview](#Project-Overview)
- [Getting Started](#getting-started)
- [Setup](#setup)
- [Database Configurations (Environment Variables)](#database-configurations-environment-variables)
- [Documentation](#documentation)
- [Hosting](#hosting)
- [Reflections](#reflections)
- [Credits](#credits)

## Project Overview

Welcome to NC News Back End! This is a RESTful API that allows users to access application data used in NC-News Front End (or **NorthStar\***, as I've affectionately called it), which you can find [here](https://github.com/J-Mro/nc-news-fe).

Please find a link to the current hosted version [here](https://nc-back-end.onrender.com).

### Project requirements

Note: this project was made using **node v25.2.1** and **PostGres v14.20**. Please note that versions older than this may not allow this API to run.

## Getting Started

Before starting, Open a terminal (Command Prompt or PowerShell for Windows, Terminal for macOS or Linux) and ensure Git is installed
(Visit https://git-scm.com to download and install console Git if not already installed).

To install this project for your own purposes, please carry out the following steps by running these commands in your terminal:

1. Clone this repository

   ```
   git clone https://github.com/J-Mro/nc-back-end
   ```

2. Navigate to the repository on your local machine

   ```
   cd nc-back-end
   ```

3. Install project dependencies (see package.json for a list of dependencies)
   ```
   npm install
   ```
   You should now be ready to start setting up your databases.

## Setup

In this section, we will set up and seed the database together. This will largely involve running npm scripts that are defined in the `package.json`. Open the project in your code editor of choice, and run the following:

1.  Set up the database - this will execute `setup-dbs.sql` in Postgres.

    ```
    npm run setup-dbs
    ```

2.  Seed your database - this will execute `run-seed.js` and hydrate the database with the development data available in `./db/data/development-data`.
    ```
    npm run seed-dev
    ```

You should now have a database that is ready to work with, with the following tables:

- articles
- topics
- users
- comments

You can confirm this by running `psql` in your terminal to enter the Postgres CLI. Once you're in the Postgres CLI, explore the following commands:

- View a list of all databases:

  ```
  \l
  ```

- To view all tables in a particular database, first navigate to your database by running
  ```
  \c your-database-name
  ```
  and then running:
  ```
  \dt
  ```

### Testing the API

To view existing tests for endpoints on this API, please navigate to the `__tests__` directory.

In order to test the API, run the following either of the following commands in your terminal:

```
npm run test
```

or

```
npm test
```

This will seed your test database with test data before any tests are run, and close the connection after all the tests have run.

You can also run individual testing files using the second option followed by the name of the test file (without .test.js), e.g.:

```
npm test app
```

## Database Configurations (Environment Variables)

To configure your database, create 2 `.env` files in the root directory of your project, e.g.:

- `.env.development`
- `.env.test`

These should each contain an environment variable `PG_DATABASE` that is set to your database name (`.env.test` should have your test database name), as shown here:

```
PG_DATABASE = <your-database-name>
```

## Hosting

You can locally host this API by running the following:

```
npm run start
```

By default the server should be listening on port 9090.

## Documentation

Explore the NC News Back End [Documentation Page](https://nc-news-be-docs.onrender.com).

In this guide you will find all available endpoints and the HTTP methods used to access them.

## Reflections

This was a 6-day project where the main focus was to create a working API for [NC-News FrontEnd](https://github.com/J-Mro/nc-news-fe), completed whilst learning on the Northcoders Bootcamp.

Besides the construction of an API, my main takeaways were:

- A clear understanding of the Model-View-Controller architecture
- Using the SuperTest framework to write effective integration tests

## Credits

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).
