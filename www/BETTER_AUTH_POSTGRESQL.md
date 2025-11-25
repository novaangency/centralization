# Better Auth + PostgreSQL Integration

Configuration de Better Auth avec PostgreSQL direct (sans ORM).

## 🗄️ Configuration Database

### PostgreSQL via Docker

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: centralization
```

### Variables d'environnement

```env
# .env
DATABASE_URL="postgres://postgres:postgres@localhost:5433/centralization"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

## 🚀 Configuration Better Auth

### lib/auth.ts

```typescript
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  experimental: {
    joins: true, // Active les joins pour 2-3x meilleures performances
  },
});
```

### lib/auth-client.ts

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### app/api/auth/[...all]/route.ts

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

## 📊 Schéma Database

Les tables créées automatiquement:

- **user**: Utilisateurs (id, name, email, emailVerified, image)
- **session**: Sessions actives (id, expiresAt, ipAddress, userAgent, userId)
- **account**: Comptes liés (id, accountId, providerId, userId, tokens, password)
- **verification**: Codes de vérification (id, identifier, value, expiresAt)

### Index pour performances

- `session_userId_idx` sur session(userId)
- `account_userId_idx` sur account(userId)
- `verification_identifier_idx` sur verification(identifier)

## 🧪 Test

Visite: **http://localhost:3000/test-auth**

Cette page permet de:
- ✅ Créer un compte (inscription)
- ✅ Se connecter
- ✅ Se déconnecter
- ✅ Voir la session active

## 📦 Dépendances

```json
{
  "dependencies": {
    "better-auth": "^1.4.1",
    "pg": "^8.16.3",
    "kysely": "^0.28.8"
  },
  "devDependencies": {
    "@types/pg": "^8.15.6"
  }
}
```

## 🔧 Commandes utiles

### Démarrer PostgreSQL
```bash
docker compose up -d postgres
```

### Créer les tables
```bash
cat schema.sql | docker exec -i centralization-postgres psql -U postgres -d centralization
```

### Se connecter à PostgreSQL
```bash
docker exec -it centralization-postgres psql -U postgres -d centralization
```

### Voir les tables
```sql
\dt
```

### Voir les utilisateurs
```sql
SELECT * FROM "user";
```

## 🎯 Avantages PostgreSQL direct

1. **Performance**: Joins expérimentaux activés (2-3x plus rapide)
2. **Simplicité**: Pas d'ORM, pas de migrations complexes
3. **Contrôle**: SQL direct si besoin
4. **Léger**: Moins de dépendances

## 📚 Documentation

- [Better Auth PostgreSQL](https://www.better-auth.com/docs/adapters/postgresql)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [pg (node-postgres)](https://node-postgres.com/)
