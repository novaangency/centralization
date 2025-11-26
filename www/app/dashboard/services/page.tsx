"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Eye, Copy, Check, Clock, DollarSign } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Développement Site Web",
    description: "Site web sur mesure avec React/Next.js",
    category: "Développement",
    price: "5 000 - 15 000 €",
    duration: "4-8 semaines",
    active: true,
    deliverables: [
      "Design responsive",
      "Code optimisé",
      "SEO inclus",
      "Formation client"
    ],
    steps: [
      "Brief & Cahier des charges",
      "Design & Prototypage",
      "Développement",
      "Tests & Déploiement"
    ],
    options: ["E-commerce", "Multilingue", "Dashboard admin"]
  },
  {
    id: 2,
    name: "Application Mobile",
    description: "Application iOS et Android native ou cross-platform",
    category: "Développement",
    price: "10 000 - 30 000 €",
    duration: "8-16 semaines",
    active: true,
    deliverables: [
      "App iOS & Android",
      "Backend API",
      "Panneau admin",
      "Maintenance 3 mois"
    ],
    steps: [
      "Analyse des besoins",
      "Architecture & Design",
      "Développement MVP",
      "Tests & Publication"
    ],
    options: ["Push notifications", "Paiements in-app", "Analytics avancés"]
  },
  {
    id: 3,
    name: "Branding & Identité Visuelle",
    description: "Création complète d'identité de marque",
    category: "Design",
    price: "2 000 - 8 000 €",
    duration: "2-4 semaines",
    active: true,
    deliverables: [
      "Logo & déclinaisons",
      "Charte graphique",
      "Templates documents",
      "Fichiers sources"
    ],
    steps: [
      "Brief créatif",
      "Recherche & Concepts",
      "Propositions design",
      "Finalisation & Livraison"
    ],
    options: ["Animation logo", "Social media kit", "Packaging design"]
  },
  {
    id: 4,
    name: "Consulting Tech",
    description: "Audit et conseil stratégique technologique",
    category: "Consulting",
    price: "800 - 2 000 €/jour",
    duration: "Sur mesure",
    active: true,
    deliverables: [
      "Audit complet",
      "Recommandations",
      "Roadmap technique",
      "Support continu"
    ],
    steps: [
      "Analyse existant",
      "Audit approfondi",
      "Rapport & Recommandations",
      "Accompagnement mise en œuvre"
    ],
    options: ["Formation équipe", "Veille techno", "Recrutement"]
  },
  {
    id: 5,
    name: "Maintenance & Support",
    description: "Maintenance mensuelle et support technique",
    category: "Support",
    price: "500 - 2 000 €/mois",
    duration: "Récurrent",
    active: true,
    deliverables: [
      "Mises à jour régulières",
      "Corrections bugs",
      "Support prioritaire",
      "Monitoring"
    ],
    steps: [
      "Setup monitoring",
      "Plan maintenance",
      "Interventions régulières",
      "Rapports mensuels"
    ],
    options: ["SLA garantie", "Hotline 24/7", "Backup automatique"]
  },
  {
    id: 6,
    name: "SEO & Marketing Digital",
    description: "Optimisation référencement et stratégie digitale",
    category: "Marketing",
    price: "1 000 - 5 000 €/mois",
    duration: "3-12 mois",
    active: false,
    deliverables: [
      "Audit SEO",
      "Stratégie contenu",
      "Optimisations techniques",
      "Rapports mensuels"
    ],
    steps: [
      "Audit initial",
      "Stratégie & Planning",
      "Optimisations",
      "Suivi & Ajustements"
    ],
    options: ["Google Ads", "Social media", "Email marketing"]
  },
]

export default function ServicesPage() {
  return (
    <div className="h-full p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Services Proposés</h1>
          <p className="text-gray-500 mt-1">Catalogue de vos prestations</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Service
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Rechercher un service..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">Catégories</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{services.filter(s => s.active).length}</div>
            <p className="text-sm text-gray-500">Services Actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">6</div>
            <p className="text-sm text-gray-500">Catégories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">87k €</div>
            <p className="text-sm text-gray-500">Revenu Moyen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">28</div>
            <p className="text-sm text-gray-500">Projets Réalisés</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                <Badge 
                  variant={service.active ? "default" : "secondary"}
                  className={service.active ? "bg-green-100 text-green-700" : ""}
                >
                  {service.active ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{service.category}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Prix</div>
                    <div className="font-semibold text-sm">{service.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Délai</div>
                    <div className="font-semibold text-sm">{service.duration}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Livrables</div>
                <div className="space-y-1">
                  {service.deliverables.slice(0, 3).map((deliverable, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-3 w-3 text-green-600" />
                      {deliverable}
                    </div>
                  ))}
                  {service.deliverables.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{service.deliverables.length - 3} autres...
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Eye className="h-3 w-3" />
                  Voir détails
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Service View */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Développement Site Web - Détails</CardTitle>
              <CardDescription>Vue complète du service et workflow</CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Steps */}
            <div>
              <h3 className="font-semibold mb-4">Étapes du Projet</h3>
              <div className="space-y-3">
                {services[0].steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-semibold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step}</div>
                      <div className="text-sm text-gray-500">
                        {i === 0 && "1-2 semaines"}
                        {i === 1 && "2-3 semaines"}
                        {i === 2 && "3-4 semaines"}
                        {i === 3 && "1 semaine"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Options & Deliverables */}
            <div>
              <h3 className="font-semibold mb-4">Livrables Complets</h3>
              <div className="space-y-2 mb-6">
                {services[0].deliverables.map((deliverable, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mb-4">Options Disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {services[0].options.map((option, i) => (
                  <Badge key={i} variant="outline" className="text-sm">
                    + {option}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
