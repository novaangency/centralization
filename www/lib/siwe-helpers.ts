import { authClient } from "@/lib/auth-client";

/**
 * Example: Sign in with Ethereum (SIWE)
 * 
 * This demonstrates how to authenticate users with their Ethereum wallet
 */

export async function signInWithEthereum(
  walletAddress: string,
  signature: string,
  message: string,
  chainId: number = 1 // Default to Ethereum Mainnet
) {
  try {
    // First, generate a nonce for the wallet address
    const { data: nonceData, error: nonceError } = await authClient.siwe.nonce({
      walletAddress,
      chainId,
    });

    if (nonceError || !nonceData) {
      throw new Error("Failed to generate nonce");
    }

    console.log("Nonce generated:", nonceData.nonce);

    // After the user signs the message with their wallet, verify it
    const { data, error } = await authClient.siwe.verify({
      message,
      signature,
      walletAddress,
      chainId,
      // email: "user@example.com", // Optional: required if anonymous is false
    });

    if (error) {
      throw new Error("Authentication failed: " + error.message);
    }

    console.log("Authentication successful:", data?.user);
    return data;
  } catch (error) {
    console.error("SIWE Error:", error);
    throw error;
  }
}

/**
 * Example usage with different chains
 */

// Ethereum Mainnet
export async function signInEthereumMainnet(
  walletAddress: string,
  signature: string,
  message: string
) {
  return signInWithEthereum(walletAddress, signature, message, 1);
}

// Polygon
export async function signInPolygon(
  walletAddress: string,
  signature: string,
  message: string
) {
  return signInWithEthereum(walletAddress, signature, message, 137);
}

// Arbitrum
export async function signInArbitrum(
  walletAddress: string,
  signature: string,
  message: string
) {
  return signInWithEthereum(walletAddress, signature, message, 42161);
}

// Base
export async function signInBase(
  walletAddress: string,
  signature: string,
  message: string
) {
  return signInWithEthereum(walletAddress, signature, message, 8453);
}
