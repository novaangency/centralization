"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-lg">Chargement...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-300">Bienvenue, {session.user.name}!</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Informations du compte</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Nom:</strong> {session.user.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>
                <strong>Email:</strong> {session.user.email}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>ID:</strong> {session.user.id}
              </span>
            </div>
          </div>
        </div>

        {/* Passkey Info */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Authentification par Passkey
              </h3>
              <p className="text-gray-300 text-sm">
                Votre compte est sécurisé avec un passkey. Aucun mot de passe n'est stocké ou
                requis.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sans mot de passe
                </span>
                <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Protection anti-phishing
                </span>
                <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sécurisé WebAuthn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
