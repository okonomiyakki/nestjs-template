#!/bin/sh

# Run migrations
if [ "$MIGRATION_MODE" = "run" ]; then
  echo ">>> Running migrations..."
  npx ts-node ./node_modules/typeorm/cli.js -d ./typeorm.config.ts migration:run

# Revert migrations
elif [ "$MIGRATION_MODE" = "revert" ]; then
  echo ">>> Reverting migrations..."
  npx ts-node ./node_modules/typeorm/cli.js -d ./typeorm.config.ts migration:revert

# Exit the container
else
  echo ">>> No valid argument provided."
  echo ">>> Please set the MIGRATION_MODE value to either 'run' or 'revert' in the dotenv file."
  echo ">>> Exiting..."
  exit 1
fi

# Run the application
node dist/main