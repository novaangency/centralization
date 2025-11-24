"use client"

import { Users, TrendingUp, Briefcase, Clock } from "lucide-react"
import StatsCard from "./stats-card"
import RecentActivity from "./recent-activity"

export default function Dashboard() {
  const stats = [
    {
      label: "Active Clients",
      value: "24",
      trend: "+12%",
      icon: Users,
    },
    {
      label: "Total Revenue",
      value: "€18,450",
      trend: "+8.2%",
      icon: TrendingUp,
    },
    {
      label: "Active Projects",
      value: "12",
      trend: "+3",
      icon: Briefcase,
    },
    {
      label: "Avg. Response",
      value: "2.5h",
      trend: "-15%",
      icon: Clock,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-foreground/60 mt-2">Welcome back! Here's your business overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground/70">Today's Tasks</span>
              <span className="font-bold text-primary">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground/70">Pending Invoices</span>
              <span className="font-bold text-accent">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground/70">New Messages</span>
              <span className="font-bold text-primary">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
