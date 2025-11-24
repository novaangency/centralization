"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import AutomationForm from "./automation-form"
import AutomationCard from "./automation-card"

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

export default function AutomationLibrary() {
  const [showForm, setShowForm] = useState(false)
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: 1,
      name: "Welcome Email",
      description: "Send welcome email to new clients",
      trigger: "New client added",
      actions: "Send email, Create task",
      status: "active",
      createdDate: "2025-11-15",
      json: '{"trigger":"newClient","actions":["sendEmail","createTask"]}',
    },
    {
      id: 2,
      name: "Invoice Reminder",
      description: "Auto-send invoice reminders",
      trigger: "Invoice due date -3 days",
      actions: "Send email notification",
      status: "active",
      createdDate: "2025-11-10",
      json: '{"trigger":"invoiceDueDate","actions":["sendEmail"]}',
    },
    {
      id: 3,
      name: "Project Status Update",
      description: "Weekly project status reports",
      trigger: "Weekly schedule",
      actions: "Generate report, Send summary",
      status: "inactive",
      createdDate: "2025-11-05",
      json: '{"trigger":"weekly","actions":["generateReport","sendEmail"]}',
    },
  ])

  const handleAddAutomation = (newAutomation: any) => {
    setAutomations([...automations, { ...newAutomation, id: Date.now() }])
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setAutomations(automations.filter((a) => a.id !== id))
  }

  const handleDownload = (automation: Automation) => {
    const element = document.createElement("a")
    const file = new Blob([automation.json], { type: "application/json" })
    element.href = URL.createObjectURL(file)
    element.download = `${automation.name}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">N8N Automations</h2>
          <p className="text-foreground/60 mt-2">Store and manage your automation workflows</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Automation
        </button>
      </div>

      {showForm && <AutomationForm onSubmit={handleAddAutomation} onCancel={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((automation) => (
          <AutomationCard
            key={automation.id}
            automation={automation}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ))}
      </div>
    </div>
  )
}
