#!/bin/sh

# run migrations
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d ./typeorm.config.ts migration:run

# Run the application
node dist/main