"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Calendar,
  Plus,
  Search,
  Star,
  DollarSign
} from "lucide-react"

const clients = [
  {
    id: 1,
    name: "TechCorp Solutions",
    contact: "Marie Leclerc",
    email: "marie@techcorp.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris",
    status: "active",
    priority: "high",
    revenue: 45000,
    projects: 3,
    lastContact: "Il y a 2 jours",
    retention: 95
  },
  {
    id: 2,
    name: "Startup XYZ",
    contact: "Pierre Dubois",
    email: "pierre@startupxyz.io",
    phone: "+33 6 98 76 54 32",
    location: "Lyon",
    status: "active",
    priority: "medium",
    revenue: 28000,
    projects: 2,
    lastContact: "Il y a 1 semaine",
    retention: 88
  },
  {
    id: 3,
    name: "Fashion Brand Co",
    contact: "Sophie Martin",
    email: "sophie@fashionbrand.com",
    phone: "+33 6 45 67 89 01",
    location: "Bordeaux",
    status: "active",
    priority: "high",
    revenue: 38500,
    projects: 4,
    lastContact: "Il y a 3 jours",
    retention: 92
  },
  {
    id: 4,
    name: "Consulting Pro",
    contact: "Thomas Bernard",
    email: "thomas@consultingpro.fr",
    phone: "+33 6 23 45 67 89",
    location: "Marseille",
    status: "active",
    priority: "low",
    revenue: 15200,
    projects: 1,
    lastContact: "Il y a 2 semaines",
    retention: 75
  },
]

export default function CRMPage() {
  return (
    <div className="h-full p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">CRM - Clients Actifs</h1>
          <p className="text-gray-500 mt-1">Gérez vos relations clients</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Client
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Rechercher un client..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filtres</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-sm text-gray-500">Clients Actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">126 700 €</div>
            <p className="text-sm text-gray-500">Revenu Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-sm text-gray-500">Taux de Rétention</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">10</div>
            <p className="text-sm text-gray-500">Projets en Cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    {client.priority === "high" && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Building2 className="h-3 w-3" />
                    {client.contact}
                  </CardDescription>
                </div>
                <Badge 
                  variant={client.status === "active" ? "default" : "secondary"}
                  className="bg-green-100 text-green-700 hover:bg-green-100"
                >
                  Actif
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {client.location}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-xs text-gray-500">Revenu</div>
                    <div className="font-semibold">{client.revenue.toLocaleString()} €</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Projets</div>
                    <div className="font-semibold">{client.projects}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Rétention</div>
                    <div className="font-semibold">{client.retention}%</div>
                  </div>
                </div>

                {/* Last Contact */}
                <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  Dernier contact: {client.lastContact}
                </div>

                {/* Priority Badge */}
                <div className="pt-2">
                  <Badge 
                    variant="outline"
                    className={
                      client.priority === "high" 
                        ? "border-red-200 text-red-700" 
                        : client.priority === "medium"
                        ? "border-orange-200 text-orange-700"
                        : "border-gray-200 text-gray-700"
                    }
                  >
                    Priorité: {client.priority === "high" ? "Haute" : client.priority === "medium" ? "Moyenne" : "Basse"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Vue Détaillée - TechCorp Solutions</CardTitle>
          <CardDescription>Historique complet et indicateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "Refonte Site E-commerce", status: "En cours", progress: 65, value: "18 000 €" },
                  { name: "Application Mobile iOS", status: "Review", progress: 90, value: "15 000 €" },
                  { name: "Dashboard Analytics", status: "Terminé", progress: 100, value: "12 000 €" },
                ].map((project, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{project.name}</div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                      <span>Progression</span>
                      <span>{project.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                {[
                  { date: "15 Nov 2025", action: "Réunion de suivi", description: "Discussion sur les nouvelles fonctionnalités" },
                  { date: "8 Nov 2025", action: "Livraison v2.0", description: "Mise en ligne de la nouvelle version" },
                  { date: "1 Nov 2025", action: "Paiement reçu", description: "15 000 € - Facture #2024-156" },
                  { date: "24 Oct 2025", action: "Nouveau projet", description: "Démarrage application mobile" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="text-sm text-gray-500 w-28">{item.date}</div>
                    <div className="flex-1">
                      <div className="font-medium">{item.action}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <DollarSign className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-2xl font-bold">45 000 €</div>
                    <p className="text-sm text-gray-500">Valeur Totale</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <TrendingUp className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-2xl font-bold">+32%</div>
                    <p className="text-sm text-gray-500">Croissance Annuelle</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Calendar className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-2xl font-bold">18 mois</div>
                    <p className="text-sm text-gray-500">Ancienneté</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
