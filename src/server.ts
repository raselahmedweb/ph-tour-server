/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import { envConfig } from "./app/config/env";
import mongoose from "mongoose";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envConfig.DB_URL);

    console.log("Database connected successfully");
    server = app.listen(envConfig.PORT, () =>
      console.log(
        `Server is running on port http://localhost:${envConfig.PORT}`,
      ),
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

//* Error handleing

process.on("SIGINT", (error) => {
  console.error("SIGINT signal received ..... server shutting down", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", (error) => {
  console.error("SIGTERM signal received ..... server shutting down", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error(
    "Unhandled rejection detected ..... server shutting down",
    error,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error(
    "Unhandled exception detected ..... server shutting down",
    error,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
