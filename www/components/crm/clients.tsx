"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import ClientForm from "./client-form"
import ClientCard from "./client-card"

export default function Clients() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Tech Startup Inc",
      email: "contact@techstartup.com",
      phone: "+33 1 23 45 67 89",
      location: "Paris, France",
      revenue: "€12,500",
      status: "active",
      projects: 3,
      contactDate: "2025-11-20",
    },
    {
      id: 2,
      name: "Digital Agency Pro",
      email: "hello@agency.com",
      phone: "+33 2 34 56 78 90",
      location: "Lyon, France",
      revenue: "€8,200",
      status: "active",
      projects: 2,
      contactDate: "2025-11-18",
    },
    {
      id: 3,
      name: "E-commerce Solutions",
      email: "info@ecommerce.com",
      phone: "+33 3 45 67 89 01",
      location: "Marseille, France",
      revenue: "€15,800",
      status: "inactive",
      projects: 4,
      contactDate: "2025-10-15",
    },
  ])

  const handleAddClient = (newClient: any) => {
    setClients([...clients, { ...newClient, id: Date.now() }])
    setShowForm(false)
  }

  const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">CRM - Clients</h2>
          <p className="text-foreground/60 mt-2">Manage your client relationships</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </div>

      {showForm && <ClientForm onSubmit={handleAddClient} onCancel={() => setShowForm(false)} />}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}
