"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar as CalendarIcon,
  LayoutGrid,
  List
} from "lucide-react"

type Task = {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  assignee: string
  client: string
  dueDate: string
  tags: string[]
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Intégration API Stripe",
    description: "Mise en place du système de paiement",
    status: "in-progress",
    priority: "high",
    assignee: "SM",
    client: "TechCorp",
    dueDate: "28 Nov",
    tags: ["backend", "api"]
  },
  {
    id: 2,
    title: "Design Page d'accueil",
    description: "Mockups et prototypes",
    status: "review",
    priority: "medium",
    assignee: "JD",
    client: "Startup XYZ",
    dueDate: "26 Nov",
    tags: ["design", "ui"]
  },
  {
    id: 3,
    title: "Tests E2E Application",
    description: "Cypress tests pour les flows principaux",
    status: "todo",
    priority: "medium",
    assignee: "TB",
    client: "Fashion Brand",
    dueDate: "30 Nov",
    tags: ["testing", "qa"]
  },
  {
    id: 4,
    title: "Migration Base de Données",
    description: "PostgreSQL vers MongoDB",
    status: "todo",
    priority: "high",
    assignee: "ML",
    client: "TechCorp",
    dueDate: "2 Déc",
    tags: ["database", "backend"]
  },
  {
    id: 5,
    title: "Documentation API",
    description: "Swagger et guides d'intégration",
    status: "in-progress",
    priority: "low",
    assignee: "SM",
    client: "Consulting Pro",
    dueDate: "4 Déc",
    tags: ["documentation"]
  },
  {
    id: 6,
    title: "Optimisation Performances",
    description: "Amélioration temps de chargement",
    status: "done",
    priority: "medium",
    assignee: "TB",
    client: "Startup XYZ",
    dueDate: "20 Nov",
    tags: ["performance", "frontend"]
  },
]

const columns = [
  { id: "todo", name: "To Do", color: "bg-gray-100" },
  { id: "in-progress", name: "In Progress", color: "bg-blue-100" },
  { id: "review", name: "Review", color: "bg-yellow-100" },
  { id: "done", name: "Done", color: "bg-green-100" },
]

export default function ProjectsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban")
  const [filter, setFilter] = useState<string>("all")

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500 text-red-700 bg-red-50"
      case "medium": return "border-orange-500 text-orange-700 bg-orange-50"
      case "low": return "border-gray-500 text-gray-700 bg-gray-50"
      default: return "border-gray-500 text-gray-700 bg-gray-50"
    }
  }

  return (
    <div className="h-full p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Projets & Tâches</h1>
          <p className="text-gray-500 mt-1">Gérez vos projets et suivez l'avancement</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle Tâche
        </Button>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Rechercher une tâche..." 
            className="pl-10"
          />
        </div>
        
        <Tabs value={filter} onValueChange={setFilter} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="me">Mes tâches</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>

        <div className="flex gap-1 border rounded-lg p-1">
          <Button 
            variant={view === "kanban" ? "secondary" : "ghost"} 
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={view === "list" ? "secondary" : "ghost"} 
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {columns.map((column) => (
          <Card key={column.id}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{getTasksByStatus(column.id).length}</div>
              <p className="text-sm text-gray-500">{column.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban View */}
      {view === "kanban" && (
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm uppercase text-gray-600">
                  {column.name}
                </h3>
                <Badge variant="secondary">{getTasksByStatus(column.id).length}</Badge>
              </div>
              
              <div className="space-y-3">
                {getTasksByStatus(column.id).map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-semibold line-clamp-2">
                          {task.title}
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                      <CardDescription className="text-xs line-clamp-2">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <CalendarIcon className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs border ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-gray-500">{task.client}</span>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.assignee}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-500 hover:text-gray-900"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une tâche
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold">{task.title}</h4>
                        <Badge variant="secondary">{task.status}</Badge>
                        <Badge 
                          variant="outline" 
                          className={`border ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">{task.client}</span>
                        <div className="flex gap-1">
                          {task.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {task.dueDate}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">
                          {task.assignee}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline View */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Timeline - Vue Gantt</CardTitle>
          <CardDescription>Planning des projets sur les prochaines semaines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.slice(0, 5).map((task, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-48 text-sm truncate">{task.title}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div 
                    className={`h-full ${
                      task.priority === "high" 
                        ? "bg-red-400" 
                        : task.priority === "medium" 
                        ? "bg-orange-400" 
                        : "bg-gray-400"
                    } rounded-lg`}
                    style={{ 
                      width: `${Math.random() * 40 + 30}%`,
                      marginLeft: `${i * 10}%`
                    }}
                  />
                </div>
                <div className="w-24 text-xs text-gray-500">{task.dueDate}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
