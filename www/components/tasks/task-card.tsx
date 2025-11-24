"use client"

import { ChevronRight } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
}

interface TaskCardProps {
  task: Task
  onMove: () => void
  canMove: boolean
}

export default function TaskCard({ task, onMove, canMove }: TaskCardProps) {
  const priorityColor = {
    high: "bg-red-500/20 text-red-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-green-500/20 text-green-400",
  }

  return (
    <div className="bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors group">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h4 className="font-medium text-foreground flex-1">{task.title}</h4>
        {canMove && (
          <button
            onClick={onMove}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10 p-1 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-sm text-foreground/60 mb-3">{task.description}</p>

      <div className="flex justify-between items-center">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColor[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="text-xs text-foreground/50">{task.dueDate}</span>
      </div>
    </div>
  )
}
