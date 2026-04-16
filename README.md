# NC News Back End

## Table of Contents

- [Project Overview](#Project-Overview)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Credits](#credits)

## Project Overview

Welcome to NC News Back End! This is a RESTful API that allows users to access application data used in NC Front End (or **NorthStar\***, as I've affectionately called it), which you can find [here](https://github.com/J-Mro/nc-news-fe).

Please find a link to the current hosted version [here](https://nc-back-end.onrender.com).

### Project requirements

Note: this project was made using **node v25.2.1** and **PostGres v14.20**. Please note that versions older than this may not allow this API to run.

## Getting Started

To install this project for your own purposes, please carry out the following steps:

```shell
# Open a terminal (Command Prompt or PowerShell for Windows, Terminal for macOS or Linux)

# Ensure Git is installed
# Visit https://git-scm.com to download and install console Git if not already installed

# Clone the repository
git clone https://github.com/J-Mro/nc-back-end

# navigate to the repository in your terminal
cd nc-back-end

# install dependencies (see package.json for a list of dependencies)
npm install

# open the project in your code editor of choice
# set up the database
npm run setup-dbs

# create .env files in your project: one for development and one for testing
# these should each contain
PG_DATABASE = <your-database-name>

# seed your databse
npm run seed-dev

# test the database by running
npm run test
# or
npm test
# or by running individial test
npm test app /// npm test utils
```

## Documentation

Explore the NC News Back End [Documentation Page](https://nc-news-be-docs.onrender.com).

In this guide you will find all available endpoints and the HTTP methods used to access them.

## Credits

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).
