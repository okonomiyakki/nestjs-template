<div align="center">
<h1> 🌈 NestJS Template </h1>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fokonomiyakki%2Fnestjs-template&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

![Node.js Badge](https://img.shields.io/badge/Node.js-20.18.0-5FA04E?logo=nodedotjs&logoColor=5FA04E&style=flat)
![NestJS Badge](https://img.shields.io/badge/NestJS-10.0.0-E0234E?logo=nestjs&logoColor=E0234E&style=flat)
![MySQL Badge](https://img.shields.io/badge/MySQL-8.0.40-4479A1?logo=mysql&logoColor=4479A1&style=flat)
![TypeORM Badge](https://img.shields.io/badge/TypeORM-0.3.20-FE0803?logo=typeorm&logoColor=FE0803&style=flat)
![NGINX Badge](https://img.shields.io/badge/NGINX-latest-009639?logo=nginx&logoColor=009639&style=flat)
![Docker Badge](https://img.shields.io/badge/Docker-25.0.3-2496ED?logo=docker&logoColor=2496ED&style=flat)
![Swagger Badge](https://img.shields.io/badge/Swagger-8.0.1-85EA2D?logo=swagger&logoColor=85EA2D&style=flat)

<p>This template helps you quickly start a user service in Docker environments using NestJS</p>

[Getting started](#getting-started)

[Clone the Repository](#clone-the-repository)

[Install Dependencies](#install-dependencies)

[TypeORM Migration commands](#typeorm-migration-commands)

[Build the app](#build-the-app)

[Run the app](#run-the-app)

[Env Settings](#env-settings)

[Swagger Documentation](#swagger-documentation)

[Project structure](#project-structure)

[How refresh tokens work](#how-refresh-tokens-work)

</div>

## Getting started

Before starting, make sure you have those components on your workstation

- [Node.js](https://nodejs.org/) (>= 20.0.0, version used)
- [Docker](https://www.docker.com/get-started) and Docker Compose
- MySQL 8.0 (if not using Docker)

## Clone the Repository

```bash
git clone https://github.com/okonomiyakki/nestjs-template.git

cd nestjs-template
```

## Install Dependencies

```bash
npm install
```

## TypeORM Migration commands

```bash
# Create a migration file
npm run migration:create

# Generate a migration file
npm run migration:generate

# Show generated migration files
npm run migration:show

# Apply the migration files
npm run migration:run

# Revert the migration file
npm run migration:revert
```

## Build the app

```bash
# Transpile TypeScript files using "tsc"
npm run build

# Generate migrations and build the application
npm run build:dev
```

## Run the app

- Development mode

  ```bash
  # Run the application in "watch" mode using "ts-node"
  npm run start

  # Apply migrations and run the application in "watch" mode using "ts-node"
  npm run start:dev
  ```

- Local mode with production settings

  ```bash
  # Start containers using "docker-compose.local.yml"
  npm run docker-compose:up

  # Stop containers using "docker-compose.local.yml"
  npm run docker-compose:down
  ```

  The containers are started based on the [local Docker Compose file](https://github.com/okonomiyakki/nestjs-template/blob/main/docker-compose.local.yml).

  [NestJS](https://github.com/okonomiyakki/nestjs-template/blob/main/Dockerfile.local) and [NGINX](https://github.com/okonomiyakki/nestjs-template/blob/main/nginx/Dockerfile.local) are dockerized through their respective Dockerfiles.

  For NestJS, migrations are applied using the provided [commands](https://github.com/okonomiyakki/nestjs-template/blob/main/scripts/start.sh), and then 'dist/main.js' is run.

## Env Settings

This template includes env files for each operating environment as follows.

- [Development mode](https://github.com/okonomiyakki/nestjs-template/blob/main/.env.dev)

- [Local mode](https://github.com/okonomiyakki/nestjs-template/blob/main/.env.local) with production settings

- [Production mode](https://github.com/okonomiyakki/nestjs-template/blob/main/.env.prod)

## Swagger Documentation

Swagger is set up for API documentation.

Once the server is running, access the Swagger UI at:

- http://localhost:5500/api (dev)

- http://localhost/api (local)

- http://your-production-domain.com/api (prod)

## Project structure

```
src/
├───auth
│   ├───controllers
│   ├───dtos
│   │   ├───requests
│   │   └───responses
│   ├───guards
│   ├───services
│   ├───strategies
│   └───token
│       ├───dtos
│       ├───interfaces
│       ├───jwt
│       │   └───factories
│       └───services
├───common
│   ├───constants
│   ├───decorators
│   ├───dtos
│   └───interfaces
├───core
│   ├───config
│   │   ├───constants
│   │   └───validations
│   └───type-orm
│       ├───constants
│       ├───decorators
│       ├───entities
│       ├───factories
│       └───repositories
└───users
    ├───constants
    ├───controllers
    ├───dtos
    │   ├───internals
    │   ├───requests
    │   └───responses
    ├───interfaces
    └───services
```

## How refresh tokens work
