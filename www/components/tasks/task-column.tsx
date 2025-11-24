"use client"
import TaskCard from "./task-card"

interface Task {
  id: number
  title: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
}

interface TaskColumnProps {
  title: string
  status: string
  tasks: Task[]
  onMoveTask: (taskId: number, fromStatus: string, toStatus: string) => void
  nextStatus: string
}

export default function TaskColumn({ title, status, tasks, onMoveTask, nextStatus }: TaskColumnProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 min-h-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">{tasks.length}</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} onMove={() => onMoveTask(task.id, status, nextStatus)} canMove={status !== "done"} />
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-foreground/40">
            <p>No tasks in this column</p>
          </div>
        )}
      </div>
    </div>
  )
}
