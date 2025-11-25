-- Ajout des champs admin dans la table user
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT 'user';
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "banned" BOOLEAN DEFAULT false;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "banReason" TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "banExpires" TIMESTAMP;

-- Ajout du champ impersonation dans la table session
ALTER TABLE "session" ADD COLUMN IF NOT EXISTS "impersonatedBy" TEXT;

-- Index pour améliorer les performances des requêtes admin
CREATE INDEX IF NOT EXISTS "user_role_idx" ON "user"("role");
CREATE INDEX IF NOT EXISTS "user_banned_idx" ON "user"("banned");
