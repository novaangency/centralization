"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Trophy, 
  Zap, 
  Target,
  Award,
  TrendingUp,
  Calendar,
  Star,
  Flame
} from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Martin",
    role: "Dev Frontend",
    avatar: "SM",
    level: 12,
    xp: 8750,
    xpToNext: 10000,
    streak: 24,
    tasksCompleted: 156,
    projectsCount: 8,
    rating: 4.9,
    status: "active",
    achievements: ["🚀 Speed Demon", "💎 Code Quality", "🎯 100% On Time"],
    skills: ["React", "TypeScript", "Tailwind"]
  },
  {
    id: 2,
    name: "Thomas Bernard",
    role: "Dev Backend",
    avatar: "TB",
    level: 10,
    xp: 6200,
    xpToNext: 8000,
    streak: 18,
    tasksCompleted: 124,
    projectsCount: 6,
    rating: 4.8,
    status: "active",
    achievements: ["⚡ API Master", "🔒 Security Pro", "📊 Performance"],
    skills: ["Node.js", "PostgreSQL", "Docker"]
  },
  {
    id: 3,
    name: "Julie Dubois",
    role: "Designer",
    avatar: "JD",
    level: 11,
    xp: 7100,
    xpToNext: 8000,
    streak: 31,
    tasksCompleted: 143,
    projectsCount: 12,
    rating: 5.0,
    status: "active",
    achievements: ["🎨 Design Master", "✨ Pixel Perfect", "🏆 MVP"],
    skills: ["Figma", "UI/UX", "Branding"]
  },
  {
    id: 4,
    name: "Marc Laurent",
    role: "Dev Fullstack",
    avatar: "ML",
    level: 9,
    xp: 5400,
    xpToNext: 6000,
    streak: 12,
    tasksCompleted: 98,
    projectsCount: 5,
    rating: 4.7,
    status: "active",
    achievements: ["🔧 Problem Solver", "🌟 Team Player"],
    skills: ["Vue.js", "Python", "AWS"]
  },
]

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Équipe</h1>
          <p className="text-gray-500 mt-1">Gérez votre équipe et suivez les performances</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un Membre
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-sm text-gray-500">Membres Actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">521</div>
            <p className="text-sm text-gray-500">Tâches Complétées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4.85</div>
            <p className="text-sm text-gray-500">Rating Moyen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">95%</div>
            <p className="text-sm text-gray-500">Taux de Complétion</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-4 border-gray-200">
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-gray-900 to-gray-700 text-white">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      Niveau {member.level}
                    </Badge>
                  </div>
                  <CardDescription>{member.role}</CardDescription>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{member.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-orange-600">
                      <Flame className="h-4 w-4" />
                      <span className="font-medium">{member.streak} jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* XP Progress */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Progression XP</span>
                  <span className="font-medium">{member.xp}/{member.xpToNext}</span>
                </div>
                <Progress value={(member.xp / member.xpToNext) * 100} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div>
                  <div className="text-2xl font-bold">{member.tasksCompleted}</div>
                  <div className="text-xs text-gray-500">Tâches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{member.projectsCount}</div>
                  <div className="text-xs text-gray-500">Projets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{member.streak}</div>
                  <div className="text-xs text-gray-500">Streak</div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="text-sm font-medium mb-2">Achievements</div>
                <div className="flex flex-wrap gap-2">
                  {member.achievements.map((achievement, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="text-sm font-medium mb-2">Compétences</div>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">Voir le Profil</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profil Détaillé - Sarah Martin</CardTitle>
          <CardDescription>Historique et statistiques complètes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Informations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Niveau</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">XP Total</span>
                      <span className="font-medium">8 750 / 10 000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Membre depuis</span>
                      <span className="font-medium">Mars 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Taux de réussite</span>
                      <span className="font-medium">98%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Qualité Code</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Respect Délais</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Communication</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: "🚀", name: "Speed Demon", desc: "Complété 50 tâches en 1 mois", unlocked: true },
                  { icon: "💎", name: "Code Quality", desc: "95% de code reviews approuvées", unlocked: true },
                  { icon: "🎯", name: "100% On Time", desc: "Aucun retard sur 20 projets", unlocked: true },
                  { icon: "🏆", name: "MVP", desc: "Élu MVP du mois 3 fois", unlocked: false },
                  { icon: "⚡", name: "Lightning Fast", desc: "Complété 10 tâches en 1 jour", unlocked: false },
                  { icon: "🌟", name: "Master", desc: "Atteindre niveau 15", unlocked: false },
                ].map((achievement, i) => (
                  <Card key={i} className={achievement.unlocked ? "" : "opacity-50"}>
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <div className="font-semibold mb-1">{achievement.name}</div>
                      <div className="text-xs text-gray-500">{achievement.desc}</div>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Débloqué
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="space-y-3">
                {[
                  { name: "TechCorp - Site E-commerce", status: "Terminé", date: "Nov 2025" },
                  { name: "Startup XYZ - Dashboard", status: "En cours", date: "Nov 2025" },
                  { name: "Fashion Brand - App Mobile", status: "Terminé", date: "Oct 2025" },
                  { name: "Consulting Pro - Landing Page", status: "Terminé", date: "Sep 2025" },
                ].map((project, i) => (
                  <div key={i} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.date}</div>
                    </div>
                    <Badge variant={project.status === "En cours" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold">156</div>
                    <p className="text-sm text-gray-500">Tâches Complétées</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold">+24%</div>
                    <p className="text-sm text-gray-500">Productivité</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold">8</div>
                    <p className="text-sm text-gray-500">Achievements</p>
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
