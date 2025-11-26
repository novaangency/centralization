"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Users, Briefcase } from "lucide-react"

export default function Home() {
  return (
    <div className="h-full p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Vue d'ensemble de vos performances</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenu Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87 450 €</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+12.5% vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">MRR</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 500 €</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+8.2% ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span>+3 nouveaux ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Projets en Cours</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>-2 vs semaine dernière</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="revenue" className="mb-8">
        <TabsList>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenus Mensuels</CardTitle>
              <CardDescription>Évolution des revenus sur les 12 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between gap-2 pb-4">
                {[65, 72, 68, 85, 78, 92, 88, 95, 87, 91, 89, 98].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gray-900 rounded-t-md hover:bg-gray-700 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500">
                      {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Projets</CardTitle>
              <CardDescription>Par catégorie et statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Développement</span>
                    <span className="text-sm text-gray-500">8 projets</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900" style={{ width: '57%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Design</span>
                    <span className="text-sm text-gray-500">4 projets</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700" style={{ width: '29%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Consulting</span>
                    <span className="text-sm text-gray-500">2 projets</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Performances Équipe</CardTitle>
              <CardDescription>Productivité par collaborateur ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Sarah Martin", role: "Dev Frontend", tasks: 24, completion: 92 },
                  { name: "Thomas Bernard", role: "Dev Backend", tasks: 18, completion: 88 },
                  { name: "Julie Dubois", role: "Designer", tasks: 15, completion: 95 },
                  { name: "Marc Laurent", role: "Dev Fullstack", tasks: 21, completion: 85 },
                ].map((member, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{member.tasks} tâches</div>
                        <div className="text-sm text-gray-500">{member.completion}% complétées</div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900" 
                        style={{ width: `${member.completion}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
          <CardDescription>Dernières actions et mises à jour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Nouveau projet créé", detail: "Refonte site e-commerce pour TechCorp", time: "Il y a 2h" },
              { action: "Paiement reçu", detail: "12 500 € - Client Startup XYZ", time: "Il y a 5h" },
              { action: "Tâche terminée", detail: "Intégration API paiement par Sarah Martin", time: "Il y a 1j" },
              { action: "Nouveau client", detail: "Fashion Brand Co. - Contrat signé", time: "Il y a 2j" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="h-2 w-2 mt-2 rounded-full bg-gray-900" />
                <div className="flex-1">
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-gray-500">{activity.detail}</div>
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
