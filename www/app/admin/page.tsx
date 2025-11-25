"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      loadUsers();
    }
  }, [session]);

  const loadUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await authClient.admin.listUsers({
        query: {
          limit: 50,
        },
      });

      if (result.error) {
        setError(result.error.message || "Erreur lors du chargement des utilisateurs");
      } else {
        setUsers(result.data?.users || []);
      }
    } catch (err) {
      setError("Erreur: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir bannir cet utilisateur ?")) return;

    try {
      const result = await authClient.admin.banUser({
        userId,
        banReason: "Banned by admin",
      });

      if (result.error) {
        alert("Erreur: " + result.error.message);
      } else {
        alert("Utilisateur banni avec succès");
        loadUsers();
      }
    } catch (err) {
      alert("Erreur: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      const result = await authClient.admin.unbanUser({ userId });

      if (result.error) {
        alert("Erreur: " + result.error.message);
      } else {
        alert("Utilisateur débanni avec succès");
        loadUsers();
      }
    } catch (err) {
      alert("Erreur: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleSetRole = async (userId: string, role: string) => {
    try {
      const result = await authClient.admin.setRole({
        userId,
        role: role as "admin" | "user",
      });

      if (result.error) {
        alert("Erreur: " + result.error.message);
      } else {
        alert(`Rôle changé en ${role}`);
        loadUsers();
      }
    } catch (err) {
      alert("Erreur: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-lg">Chargement...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const isAdmin = (session.user as any).role === "admin";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Gérer les utilisateurs et les permissions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Dashboard User
              </button>
              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Admin Status */}
        {!isAdmin && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
            <p className="text-red-200">
              ⚠️ Vous n'êtes pas admin. Certaines fonctionnalités sont désactivées.
            </p>
          </div>
        )}

        {/* Users List */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Utilisateurs</h2>
            <button
              onClick={loadUsers}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? "Chargement..." : "Actualiser"}
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="pb-3 px-4">Nom</th>
                  <th className="pb-3 px-4">Email</th>
                  <th className="pb-3 px-4">Rôle</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.banned ? (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-300">
                          Banni
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-300">
                          Actif
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {isAdmin && (
                          <>
                            {!user.banned ? (
                              <button
                                onClick={() => handleBanUser(user.id)}
                                className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded transition-colors"
                              >
                                Bannir
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnbanUser(user.id)}
                                className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1 rounded transition-colors"
                              >
                                Débannir
                              </button>
                            )}
                            <select
                              value={user.role || "user"}
                              onChange={(e) => handleSetRole(user.id, e.target.value)}
                              className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && !isLoading && (
            <p className="text-center text-gray-400 py-8">Aucun utilisateur trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
}
