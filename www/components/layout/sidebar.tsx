"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Users, BarChart3, ListTodo, Zap, Package } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const AnimatedMenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void
  isOpen: boolean
}) => (
  <button onClick={toggle} aria-label="Toggle menu" className="focus:outline-none z-999 md:hidden">
    <motion.div animate={{ y: isOpen ? 13 : 0 }} transition={{ duration: 0.3 }}>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
        className="text-foreground"
      >
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 2.5 L 22 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 12 L 22 12", opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 21.5 L 22 21.5" },
            open: { d: "M 3 2.5 L 17 16.5" },
          }}
        />
      </motion.svg>
    </motion.div>
  </button>
)

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clients", label: "CRM", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "automations", label: "Automations", icon: Zap },
    { id: "services", label: "Services", icon: Package },
  ]

  const mobileSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <AnimatedMenuToggle toggle={toggleSidebar} isOpen={isOpen} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileSidebarVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 bg-background text-foreground"
          >
            <div className="flex flex-col h-full pt-20">
              {/* Profile Section */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">BH</span>
                  </div>
                  <div>
                    <p className="font-semibold">Business Hub</p>
                    <p className="text-sm text-foreground/60">Manage your business</p>
                  </div>
                </div>
              </div>
              {/* Navigation Section */}
              <nav className="flex-1 p-4 overflow-y-auto space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex gap-3 font-medium text-sm items-center py-2 px-4 rounded-lg transition-colors ${
                        isActive ? "bg-primary/20 text-primary" : "text-foreground/70 hover:bg-foreground/10"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
              {/* Footer */}
              <div className="p-4 border-t border-border">
                <p className="text-xs text-foreground/50">© 2025 Freelance Business</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-background text-foreground border-r border-border shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-primary">BH</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Business Hub</p>
              <p className="text-sm text-foreground/60">Freelance Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  isActive
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-foreground/50">© 2025 Freelance Business</p>
        </div>
      </aside>
    </>
  )
}
