import "dotenv/config";

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
}

const loadEnv = (): EnvConfig => {
  const requiredEnvVars: string[] = ["PORT", "NODE_ENV"];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(
        `Environment variable "${varName}" is required but not set.`,
      );
    }
  });
  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envConfig = loadEnv();
