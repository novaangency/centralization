import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { passkey } from "@better-auth/passkey";
import { admin } from "better-auth/plugins";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5433/centralization",
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    passkey({
      rpID: process.env.BETTER_AUTH_RP_ID || "localhost",
      rpName: "Centralization",
      origin: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    }),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
  experimental: {
    joins: true,
  },
});
