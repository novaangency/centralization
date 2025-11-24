# Better Auth avec PostgreSQL et SIWE

## 🎉 Configuration complète !

Better Auth a été configuré avec succès avec :
- ✅ PostgreSQL (via Docker Compose)
- ✅ Prisma ORM
- ✅ Sign In With Ethereum (SIWE)

## 🚀 Démarrage rapide

### 1. Démarrer la base de données

```bash
cd /Users/moneyprinter/Desktop/nova/centralization
docker-compose up -d
```

### 2. Vérifier que la DB est prête

```bash
docker-compose logs postgres
```

### 3. Lancer l'application

```bash
cd www
bun dev
```

## 📁 Structure des fichiers

```
www/
├── lib/
│   ├── auth.ts              # Configuration Better Auth serveur
│   ├── auth-client.ts       # Client Better Auth pour React
│   ├── prisma.ts            # Instance Prisma Client
│   └── siwe-helpers.ts      # Helpers pour SIWE
├── components/
│   └── auth/
│       └── ethereum-signin.tsx  # Composant de connexion Ethereum
├── app/
│   └── api/
│       └── auth/
│           └── [...all]/
│               └── route.ts # Route handler Better Auth
└── prisma/
    └── schema.prisma        # Schéma de base de données
```

## 🔐 Authentification Ethereum (SIWE)

### Configuration actuelle

- **Domain**: localhost:3000
- **Anonymous mode**: Activé (pas besoin d'email)
- **Chains supportées**: Toutes les EVM chains (Ethereum, Polygon, Arbitrum, Base, etc.)
- **ENS Lookup**: Activé (résolution des noms ENS)

### Utilisation

#### Option 1 : Utiliser le composant React

```tsx
import { EthereumSignIn } from "@/components/auth/ethereum-signin";

export default function LoginPage() {
  return (
    <div>
      <h1>Se connecter</h1>
      <EthereumSignIn />
    </div>
  );
}
```

#### Option 2 : Utiliser les helpers

```typescript
import { signInWithEthereum } from "@/lib/siwe-helpers";

// Obtenir le nonce
const { data } = await authClient.siwe.nonce({
  walletAddress: "0x...",
  chainId: 1
});

// Après signature par le wallet
await signInWithEthereum(
  walletAddress,
  signature,
  message,
  chainId
);
```

## 🔗 Chains supportées

```typescript
// Ethereum Mainnet (chainId: 1) - par défaut
await authClient.siwe.verify({ ..., chainId: 1 });

// Polygon (chainId: 137)
await authClient.siwe.verify({ ..., chainId: 137 });

// Arbitrum (chainId: 42161)
await authClient.siwe.verify({ ..., chainId: 42161 });

// Base (chainId: 8453)
await authClient.siwe.verify({ ..., chainId: 8453 });
```

## 📊 Base de données

### Tables créées

- **user** - Utilisateurs
- **session** - Sessions actives
- **account** - Comptes liés (email/password, social)
- **verification** - Tokens de vérification
- **walletAddress** - Adresses Ethereum des utilisateurs

### Connexion PostgreSQL

```
Host: localhost
Port: 5433
Database: centralization
User: postgres
Password: postgres
```

## 🛠 Commandes utiles

### Docker

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Voir les logs
docker-compose logs -f postgres

# Arrêter et supprimer les données
docker-compose down -v
```

### Prisma

```bash
# Générer le client Prisma
bunx prisma generate

# Synchroniser le schéma avec la DB
bunx prisma db push

# Ouvrir Prisma Studio (GUI)
bunx prisma studio

# Créer une migration
bunx prisma migrate dev --name init
```

### Better Auth

```bash
# Régénérer le schéma
npx @better-auth/cli generate --config auth.config.ts --yes
```

## 📚 Ressources

- [Better Auth Documentation](https://www.better-auth.com/docs)
- [SIWE Plugin](https://www.better-auth.com/docs/plugins/siwe)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Viem Documentation](https://viem.sh)
- [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361)

## 🔧 Configuration avancée

### Désactiver le mode anonyme

Dans `lib/auth.ts`, changez :

```typescript
siwe({
  anonymous: false, // Nécessite un email
  // ...
})
```

### Ajouter des providers sociaux

```typescript
export const auth = betterAuth({
  // ...
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
```

### Changer le port PostgreSQL

Dans `docker-compose.yml`, modifiez :

```yaml
ports:
  - "5432:5432"  # Au lieu de 5433:5432
```

Et dans `.env` :

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/centralization?schema=public"
```

## ⚠️ Important pour la production

1. **Changez les credentials PostgreSQL** dans `docker-compose.yml` et `.env`
2. **Utilisez un secret fort** pour `BETTER_AUTH_SECRET`
3. **Configurez HTTPS** pour SIWE en production
4. **Ajoutez une validation d'email** si vous désactivez le mode anonyme
5. **Utilisez des migrations Prisma** au lieu de `db push`

## 🎯 Prochaines étapes

1. Installer une bibliothèque de wallet (wagmi, RainbowKit, etc.)
2. Créer une page de connexion avec le composant `EthereumSignIn`
3. Implémenter la gestion de session côté client
4. Ajouter d'autres méthodes d'authentification si nécessaire
5. Configurer l'authorisation et les rôles utilisateur
