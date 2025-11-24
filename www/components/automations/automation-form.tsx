"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface AutomationFormProps {
  onSubmit: (automation: any) => void
  onCancel: () => void
}

export default function AutomationForm({ onSubmit, onCancel }: AutomationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trigger: "",
    actions: "",
    json: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      status: "active",
      createdDate: new Date().toISOString().split("T")[0],
      json: formData.json || "{}",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-foreground">New Automation</h3>
          <button onClick={onCancel} className="text-foreground/60 hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Automation Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g., Welcome Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-16"
              placeholder="Describe the automation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Trigger</label>
            <input
              type="text"
              name="trigger"
              value={formData.trigger}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g., New client added"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Actions</label>
            <input
              type="text"
              name="actions"
              value={formData.actions}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g., Send email, Create task"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">JSON Configuration</label>
            <textarea
              name="json"
              value={formData.json}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24 font-mono text-xs"
              placeholder='{"trigger":"event","actions":[]}'
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-secondary/20 text-foreground px-4 py-2 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Automation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
