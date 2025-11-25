"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"info" | "passkey">("info");

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Le nom est requis");
      return;
    }

    if (!email.trim()) {
      setError("L'email est requis");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email invalide");
      return;
    }

    setStep("passkey");
  };

  const handleRegisterPasskey = async () => {
    setError("");
    setIsLoading(true);

    try {
      // D'abord créer le compte
      const signUpResult = await authClient.signUp.email({
        email,
        password: crypto.randomUUID(), // Mot de passe aléatoire car non utilisé
        name,
      });

      if (signUpResult.error) {
        setError(signUpResult.error.message || "Erreur lors de la création du compte");
        setIsLoading(false);
        setStep("info");
        return;
      }

      // Ensuite ajouter le passkey
      const { data, error: passkeyError } = await authClient.passkey.addPasskey({
        name: `${name}'s Passkey`,
        fetchOptions: {
          onSuccess() {
            router.push("/dashboard");
          },
          onError(context) {
            setError(context.error.message || "Échec de l'enregistrement du passkey");
            setIsLoading(false);
          },
        },
      });

      if (passkeyError) {
        setError(passkeyError.message || "Échec de l'enregistrement du passkey");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)));
      setIsLoading(false);
      setStep("info");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
            <p className="text-gray-300">
              {step === "info"
                ? "Entrez vos informations"
                : "Configurez votre passkey"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className={`w-3 h-3 rounded-full ${
                step === "info" ? "bg-blue-500" : "bg-green-500"
              }`}
            />
            <div className="w-8 h-0.5 bg-white/20" />
            <div
              className={`w-3 h-3 rounded-full ${
                step === "passkey" ? "bg-blue-500" : "bg-white/20"
              }`}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: User Info */}
          {step === "info" && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Continuer
              </button>
            </form>
          )}

          {/* Step 2: Passkey Registration */}
          {step === "passkey" && (
            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-200">
                  Vous allez créer un passkey pour <strong>{email}</strong>
                </p>
              </div>

              <button
                onClick={handleRegisterPasskey}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
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
                    Créer mon Passkey
                  </>
                )}
              </button>

              <button
                onClick={() => setStep("info")}
                disabled={isLoading}
                className="w-full text-gray-400 hover:text-white py-2 transition-colors disabled:opacity-50"
              >
                Retour
              </button>
            </div>
          )}

          {/* Login Link */}
          {step === "info" && (
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Vous avez déjà un compte ?</p>
              <button
                onClick={() => router.push("/login")}
                className="text-blue-400 hover:text-blue-300 font-semibold mt-1 transition-colors"
              >
                Se connecter
              </button>
            </div>
          )}

          {/* Security Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-xs text-gray-400 space-y-2">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Authentification sans mot de passe
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Vos données sont chiffrées
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
