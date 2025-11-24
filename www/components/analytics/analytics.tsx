"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function Analytics() {
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6100 },
    { month: "May", revenue: 7300 },
    { month: "Jun", revenue: 8450 },
  ]

  const projectsData = [
    { week: "W1", completed: 2, inProgress: 3, pending: 2 },
    { week: "W2", completed: 3, inProgress: 4, pending: 1 },
    { week: "W3", completed: 4, inProgress: 2, pending: 2 },
    { week: "W4", completed: 3, inProgress: 5, pending: 1 },
  ]

  const serviceBreakdown = [
    { name: "Web Dev", value: 45, color: "#a78bfa" },
    { name: "AI Automation", value: 30, color: "#60a5fa" },
    { name: "Consulting", value: 15, color: "#34d399" },
    { name: "Other", value: 10, color: "#fbbf24" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Analytics</h2>
        <p className="text-foreground/60 mt-2">Detailed business metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={{ fill: "#a78bfa", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Service Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Project Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="week" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="completed" fill="#34d399" />
            <Bar dataKey="inProgress" fill="#a78bfa" />
            <Bar dataKey="pending" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
