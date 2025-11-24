"use client"

import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string
  trend: string
  icon: LucideIcon
}

export default function StatsCard({ label, value, trend, icon: Icon }: StatsCardProps) {
  const isPositive = !trend.startsWith("-")

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-border/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-primary/20 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <p className="text-foreground/70 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}
