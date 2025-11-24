"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import Dashboard from "@/components/dashboard/dashboard"
import Clients from "@/components/crm/clients"
import Analytics from "@/components/analytics/analytics"
import TaskBoard from "@/components/tasks/task-board"
import AutomationLibrary from "@/components/automations/automation-library"
import Services from "@/components/services/services"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "clients":
        return <Clients />
      case "analytics":
        return <Analytics />
      case "tasks":
        return <TaskBoard />
      case "automations":
        return <AutomationLibrary />
      case "services":
        return <Services />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto md:ml-64">{renderContent()}</main>
    </div>
  )
}
