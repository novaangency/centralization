"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Copy, Eye, Code, FileJson, Zap } from "lucide-react"

const automations = [
  {
    id: 1,
    name: "Invoice Generator",
    description: "Génère automatiquement les factures mensuelles",
    category: "Facturation",
    language: "Python",
    lastUsed: "Il y a 2 jours",
    uses: 45,
    status: "active"
  },
  {
    id: 2,
    name: "Client Onboarding",
    description: "Workflow d'accueil automatisé pour nouveaux clients",
    category: "Workflow",
    language: "JavaScript",
    lastUsed: "Il y a 1 semaine",
    uses: 28,
    status: "active"
  },
  {
    id: 3,
    name: "Report Email Template",
    description: "Template d'email pour les rapports mensuels",
    category: "Template",
    language: "HTML",
    lastUsed: "Il y a 3 jours",
    uses: 67,
    status: "active"
  },
  {
    id: 4,
    name: "Database Backup Script",
    description: "Script de sauvegarde quotidienne automatique",
    category: "Maintenance",
    language: "Shell",
    lastUsed: "Aujourd'hui",
    uses: 120,
    status: "active"
  },
]

const templates = [
  {
    id: 1,
    name: "Proposition Commerciale",
    type: "Document",
    format: "PDF",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Contrat Freelance",
    type: "Document",
    format: "DOCX",
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "Project Brief Template",
    type: "JSON",
    format: "JSON",
    size: "12 KB"
  },
  {
    id: 4,
    name: "Sprint Planning Template",
    type: "Workflow",
    format: "YAML",
    size: "8 KB"
  },
]

export default function AutomationsPage() {
  return (
    <div className="h-full p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Automatisations & Templates</h1>
          <p className="text-gray-500 mt-1">Gagnez du temps avec vos workflows automatisés</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle Automatisation
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Rechercher un script ou template..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">Catégories</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{automations.length}</div>
            <p className="text-sm text-gray-500">Automatisations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-sm text-gray-500">Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">260</div>
            <p className="text-sm text-gray-500">Utilisations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">15h</div>
            <p className="text-sm text-gray-500">Temps Économisé</p>
          </CardContent>
        </Card>
      </div>

      {/* Automations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Scripts & Automatisations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {automations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <CardTitle className="text-lg">{automation.name}</CardTitle>
                    </div>
                    <CardDescription>{automation.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {automation.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="outline">{automation.category}</Badge>
                    <Badge variant="outline" className="gap-1">
                      <Code className="h-3 w-3" />
                      {automation.language}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                    <div>
                      <div className="text-gray-500">Utilisations</div>
                      <div className="font-semibold">{automation.uses}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Dernière utilisation</div>
                      <div className="font-semibold">{automation.lastUsed}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Eye className="h-3 w-3" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Copy className="h-3 w-3" />
                      Dupliquer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Templates & Documents</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {templates.map((template) => (
                <div key={template.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FileJson className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-gray-500">
                          {template.type} · {template.format} · {template.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Aperçu - Invoice Generator</CardTitle>
          <CardDescription>Script Python pour génération automatique de factures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">
{`# invoice_generator.py
import datetime
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

def generate_invoice(client_data, items):
    """
    Génère une facture PDF pour un client
    
    Args:
        client_data: Dict avec les infos client
        items: Liste des items à facturer
    """
    filename = f"facture_{client_data['id']}_{datetime.date.today()}.pdf"
    c = canvas.Canvas(filename, pagesize=A4)
    
    # En-tête
    c.setFont("Helvetica-Bold", 24)
    c.drawString(50, 800, "FACTURE")
    
    # Informations client
    c.setFont("Helvetica", 12)
    c.drawString(50, 750, f"Client: {client_data['name']}")
    c.drawString(50, 735, f"Email: {client_data['email']}")
    
    # Items
    y_position = 700
    total = 0
    
    for item in items:
        c.drawString(50, y_position, item['description'])
        c.drawString(400, y_position, f"{item['amount']} €")
        total += item['amount']
        y_position -= 20
    
    # Total
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position - 30, f"TOTAL: {total} €")
    
    c.save()
    return filename

# Exemple d'utilisation
client = {
    'id': 'CLI001',
    'name': 'TechCorp Solutions',
    'email': 'contact@techcorp.com'
}

items = [
    {'description': 'Développement site web', 'amount': 5000},
    {'description': 'Maintenance mensuelle', 'amount': 500}
]

invoice_path = generate_invoice(client, items)
print(f"Facture générée: {invoice_path}")`}
            </pre>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="gap-2">
              <Copy className="h-4 w-4" />
              Copier le code
            </Button>
            <Button variant="outline" className="gap-2">
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
