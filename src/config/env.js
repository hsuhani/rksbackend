
const dotenv = require("dotenv");
const { z } = require("zod");

// Load environment variables from .env
dotenv.config();

// Define the environment variables our application requires
const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(5000),

    NODE_ENV: z.enum([
        "development",
        "production",
        "test"
    ]).default("development"),

    MONGO_URI: z.string().min(1, "MONGO_URI is required"),

    JWT_ACCESS_SECRET: z.string().min(
        32,
        "JWT_ACCESS_SECRET must be at least 32 characters"
    ),

    JWT_REFRESH_SECRET: z.string().min(
        32,
        "JWT_REFRESH_SECRET must be at least 32 characters"
    ),

    CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL")
});

// Validate environment variables
const result = envSchema.safeParse(process.env);

// Stop application startup if configuration is invalid
if (!result.success) {
    console.error("Invalid environment configuration:");

    result.error.issues.forEach((issue) => {
        console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    });

    process.exit(1);
}

// Export validated configuration
const env = result.data;

module.exports = env;
