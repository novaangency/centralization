"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import TaskColumn from "./task-column"
import TaskForm from "./task-form"

interface Task {
  id: number
  title: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
}

export default function TaskBoard() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: "Design new landing page",
        description: "Responsive design for mobile/desktop",
        priority: "high",
        dueDate: "2025-11-28",
      },
      {
        id: 2,
        title: "Setup payment integration",
        description: "Stripe integration for checkout",
        priority: "high",
        dueDate: "2025-11-27",
      },
    ],
    wip: [
      {
        id: 3,
        title: "Develop API endpoints",
        description: "REST API for user management",
        priority: "medium",
        dueDate: "2025-11-26",
      },
      {
        id: 4,
        title: "Database optimization",
        description: "Optimize queries for performance",
        priority: "medium",
        dueDate: "2025-11-29",
      },
    ],
    done: [
      {
        id: 5,
        title: "Setup project repo",
        description: "GitHub repository creation",
        priority: "low",
        dueDate: "2025-11-20",
      },
      {
        id: 6,
        title: "Configure CI/CD",
        description: "GitHub Actions workflow setup",
        priority: "medium",
        dueDate: "2025-11-22",
      },
    ],
  })

  const handleAddTask = (task: any) => {
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, { ...task, id: Date.now() }],
    }))
    setShowForm(false)
  }

  const moveTask = (taskId: number, fromColumn: string, toColumn: string) => {
    const task = tasks[fromColumn as keyof typeof tasks].find((t) => t.id === taskId)
    if (task) {
      setTasks((prev) => ({
        ...prev,
        [fromColumn]: prev[fromColumn as keyof typeof prev].filter((t) => t.id !== taskId),
        [toColumn]: [...prev[toColumn as keyof typeof prev], task],
      }))
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Project Tasks</h2>
          <p className="text-foreground/60 mt-2">Kanban board - Organize your work</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {showForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn title="To Do" status="todo" tasks={tasks.todo} onMoveTask={moveTask} nextStatus="wip" />
        <TaskColumn title="In Progress" status="wip" tasks={tasks.wip} onMoveTask={moveTask} nextStatus="done" />
        <TaskColumn title="Done" status="done" tasks={tasks.done} onMoveTask={moveTask} nextStatus="todo" />
      </div>
    </div>
  )
}
