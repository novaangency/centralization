"use client"

import { Mail, Phone, MapPin, TrendingUp } from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  location: string
  revenue: string
  status: string
  projects: number
  contactDate: string
}

interface ClientCardProps {
  client: Client
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded mt-2 ${
              client.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {client.status}
          </span>
        </div>
        <div className="text-2xl font-bold text-primary">{client.revenue}</div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Mail className="w-4 h-4" />
          {client.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Phone className="w-4 h-4" />
          {client.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <MapPin className="w-4 h-4" />
          {client.location}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border/30">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/70">{client.projects} projects</span>
        </div>
        <span className="text-xs text-foreground/50">{client.contactDate}</span>
      </div>
    </div>
  )
}
