"use client"

import { Download, Trash2 } from "lucide-react"

interface Automation {
  id: number
  name: string
  description: string
  trigger: string
  actions: string
  status: "active" | "inactive"
  createdDate: string
  json: string
}

interface AutomationCardProps {
  automation: Automation
  onDelete: (id: number) => void
  onDownload: (automation: Automation) => void
}

export default function AutomationCard({ automation, onDelete, onDownload }: AutomationCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{automation.name}</h3>
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded mt-2 ${
              automation.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {automation.status}
          </span>
        </div>
      </div>

      <p className="text-sm text-foreground/70 mb-4">{automation.description}</p>

      <div className="space-y-2 mb-6 text-sm">
        <div>
          <span className="text-foreground/60">Trigger:</span>
          <p className="text-foreground">{automation.trigger}</p>
        </div>
        <div>
          <span className="text-foreground/60">Actions:</span>
          <p className="text-foreground">{automation.actions}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border/30">
        <span className="text-xs text-foreground/50">{automation.createdDate}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onDownload(automation)}
            className="p-2 text-primary hover:bg-primary/20 rounded transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(automation.id)}
            className="p-2 text-destructive hover:bg-destructive/20 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
