import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { siwe } from "better-auth/plugins";
import { generateRandomString } from "better-auth/crypto";
import { verifyMessage, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Add your social providers here if needed
    // Example:
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // },
  },
  plugins: [
    siwe({
      domain: process.env.BETTER_AUTH_URL?.replace(/^https?:\/\//, "") || "localhost:3000",
      emailDomainName: process.env.BETTER_AUTH_URL?.replace(/^https?:\/\//, "") || "localhost",
      anonymous: true, // Set to false if you want to require email
      getNonce: async () => {
        // Generate a cryptographically secure random nonce
        return generateRandomString(32);
      },
      verifyMessage: async ({ message, signature, address }) => {
        try {
          // Verify the signature using viem
          const isValid = await verifyMessage({
            address: address as `0x${string}`,
            message,
            signature: signature as `0x${string}`,
          });
          return isValid;
        } catch (error) {
          console.error("SIWE verification failed:", error);
          return false;
        }
      },
      ensLookup: async ({ walletAddress }) => {
        try {
          // Optional: lookup ENS name and avatar using viem
          const client = createPublicClient({
            chain: mainnet,
            transport: http(),
          });

          const ensName = await client.getEnsName({
            address: walletAddress as `0x${string}`,
          });

          const ensAvatar = ensName
            ? await client.getEnsAvatar({
                name: ensName,
              })
            : null;

          return {
            name: ensName || walletAddress,
            avatar: ensAvatar || "",
          };
        } catch {
          return {
            name: walletAddress,
            avatar: "",
          };
        }
      },
    }),
  ],
});
