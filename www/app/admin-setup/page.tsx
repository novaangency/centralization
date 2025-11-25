"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Créer le compte admin
      const signUpResult = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (signUpResult.error) {
        setError(signUpResult.error.message || "Erreur lors de la création du compte");
        setIsLoading(false);
        return;
      }

      // Mettre à jour le rôle en admin via SQL direct
      // (Normalement fait par un admin existant, mais pour le premier admin on doit le faire manuellement)
      setSuccess(
        `Compte créé! Maintenant, exécute cette commande SQL pour le promouvoir admin:\n\nUPDATE "user" SET role = 'admin' WHERE email = '${email}';`
      );
      setIsLoading(false);
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="bg-yellow-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Configuration Admin</h1>
            <p className="text-gray-300">Créer le premier compte administrateur</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg">
              <p className="font-semibold mb-2">✅ Compte créé!</p>
              <p className="text-sm mb-3">Exécute cette commande pour le promouvoir admin:</p>
              <div className="bg-gray-900/50 p-3 rounded font-mono text-xs overflow-x-auto">
                {success.split("\n\n")[1]}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(success.split("\n\n")[1]);
                  alert("Commande copiée!");
                }}
                className="mt-3 text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-colors"
              >
                Copier la commande
              </button>
              <p className="text-sm mt-3">
                Exécute: <code className="bg-gray-900/50 px-2 py-1 rounded text-xs">
                  docker exec -it centralization-postgres psql -U postgres -d centralization
                </code>
              </p>
            </div>
          )}

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Admin User"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="********"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 8 caractères</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Création en cours..." : "Créer le compte admin"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-xs text-gray-400 space-y-2">
              <p className="font-semibold text-yellow-400 mb-2">⚠️ Important:</p>
              <p>
                Cette page permet de créer le premier administrateur. Après la création, vous
                devrez exécuter une commande SQL pour promouvoir le compte en admin.
              </p>
              <p className="mt-3">
                <button
                  onClick={() => router.push("/login")}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Retour à la connexion
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
