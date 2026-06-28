import "dotenv/config";

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  DB_URL: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
}

const loadEnv = (): EnvConfig => {
  const requiredEnvVars: string[] = [
    "PORT",
    "NODE_ENV",
    "DB_URL",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
  ];

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
    DB_URL: process.env.DB_URL as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export const envConfig = loadEnv();
