"use client";

import { signUp, signIn, signOut, useSession } from "@/lib/auth-client";
import { useState } from "react";

export default function AuthTestPage() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || "Erreur lors de l'inscription");
      } else {
        setSuccess("Compte créé avec succès!");
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Erreur lors de la connexion");
      } else {
        setSuccess("Connexion réussie!");
      }
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleSignOut = async () => {
    setError("");
    setSuccess("");
    
    try {
      await signOut();
      setSuccess("Déconnexion réussie!");
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  if (isPending) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Test Better Auth + PostgreSQL</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {session?.user ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Session active</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {session.user.id}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Nom:</strong> {session.user.name}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inscription */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Inscription</h2>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  S'inscrire
                </button>
              </form>
            </div>

            {/* Connexion */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Connexion</h2>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Info de connexion */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <h3 className="font-semibold mb-2">Configuration PostgreSQL</h3>
          <ul className="text-sm space-y-1">
            <li>Host: localhost:5433</li>
            <li>Database: centralization</li>
            <li>User: postgres</li>
            <li>Joins expérimentaux: activés</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
