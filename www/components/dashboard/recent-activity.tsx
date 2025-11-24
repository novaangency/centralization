"use client"

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "client",
      message: "New client added: Tech Startup Inc",
      time: "2 hours ago",
      icon: "👤",
    },
    {
      id: 2,
      type: "project",
      message: 'Project "E-commerce Redesign" completed',
      time: "5 hours ago",
      icon: "✅",
    },
    {
      id: 3,
      type: "task",
      message: 'Task "API Integration" marked as done',
      time: "8 hours ago",
      icon: "📋",
    },
    {
      id: 4,
      type: "automation",
      message: "Automation workflow deployed",
      time: "1 day ago",
      icon: "⚡",
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-border/30 last:border-0">
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1">
              <p className="text-foreground text-sm">{activity.message}</p>
              <p className="text-foreground/50 text-xs mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
