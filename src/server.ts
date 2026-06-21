/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import { envConfig } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    // Initialize your database/network connection here
    // await mongoose.connect('mongodb://localhost:27017/myapp');

    console.log("Dummy network connected successfully");
    server = app.listen(envConfig.PORT, () =>
      console.log(
        `Server is running on port http://localhost:${envConfig.PORT}`,
      ),
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

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
