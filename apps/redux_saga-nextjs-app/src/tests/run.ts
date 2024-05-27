import { exec } from "child_process"

// Bad way to do this, refactor this later.
exec(
  "ts-node -r tsconfig-paths/register --project tsconfig.test.json ./src/tests/sagas.test.ts",
  (err, stdout, stderr) => {
    console.log(stdout)
  },
)
exec(
  "ts-node -r tsconfig-paths/register --project tsconfig.test.json ./src/tests/socket_saga.test.ts",
  (err, stdout, stderr) => {
    console.log(stdout)
  },
)
