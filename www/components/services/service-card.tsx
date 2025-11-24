"use client"

import { Trash2, Clock, DollarSign } from "lucide-react"

interface Service {
  id: number
  name: string
  description: string
  price: string
  duration: string
  category: string
}

interface ServiceCardProps {
  service: Service
  onDelete: (id: number) => void
}

export default function ServiceCard({ service, onDelete }: ServiceCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
        <button
          onClick={() => onDelete(service.id)}
          className="p-2 text-destructive hover:bg-destructive/20 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-foreground/70 mb-6">{service.description}</p>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-foreground font-semibold">{service.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-foreground font-semibold">{service.duration}</span>
        </div>
      </div>
    </div>
  )
}
