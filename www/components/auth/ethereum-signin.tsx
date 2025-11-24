"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

/**
 * Example React component for Ethereum wallet authentication
 * 
 * This is a basic example. In production, you would use a library like:
 * - wagmi (https://wagmi.sh)
 * - viem (https://viem.sh)
 * - ethers.js (https://docs.ethers.org)
 * - RainbowKit (https://www.rainbowkit.com)
 */

export function EthereumSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask to continue");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAddress = accounts[0];

      // Get nonce from server
      const { data: nonceData, error: nonceError } = await authClient.siwe.nonce({
        walletAddress,
        chainId: 1, // Ethereum Mainnet
      });

      if (nonceError || !nonceData) {
        throw new Error("Failed to generate nonce");
      }

      // Create SIWE message
      const domain = window.location.host;
      const origin = window.location.origin;
      const message = `${domain} wants you to sign in with your Ethereum account:\n${walletAddress}\n\nSign in with Ethereum to the app.\n\nURI: ${origin}\nVersion: 1\nChain ID: 1\nNonce: ${nonceData.nonce}\nIssued At: ${new Date().toISOString()}`;

      // Request signature from wallet
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletAddress],
      });

      // Verify signature with server
      const { data, error: verifyError } = await authClient.siwe.verify({
        message,
        signature,
        walletAddress,
        chainId: 1,
      });

      if (verifyError) {
        throw new Error("Authentication failed");
      }

      console.log("Successfully signed in:", data?.user);
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={handleSignIn}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Signing in..." : "Sign in with Ethereum"}
      </Button>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Type declaration for ethereum provider
declare global {
  interface Window {
    ethereum?: any;
  }
}
