import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { passkey } from "@better-auth/passkey";
import prisma from "../db/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    passkey({
      rpID: process.env.NODE_ENV === "production" ? "yourdomain.com" : "localhost",
      rpName: "Nova Centralization",
      origin: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    }),
  ],
  // Configuration pour WebAuthn/Passkeys
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 1 jour
  },
});

export type Session = typeof auth.$Infer.Session;
