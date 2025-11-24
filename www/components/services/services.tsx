"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import ServiceForm from "./service-form"
import ServiceCard from "./service-card"

interface Service {
  id: number
  name: string
  description: string
  price: string
  duration: string
  category: string
}

export default function Services() {
  const [showForm, setShowForm] = useState(false)
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Web Development",
      description: "Custom website design and development",
      price: "€2,500 - €5,000",
      duration: "4-8 weeks",
      category: "Development",
    },
    {
      id: 2,
      name: "AI Automation Setup",
      description: "Custom N8N workflows and automations",
      price: "€1,000 - €3,000",
      duration: "2-4 weeks",
      category: "Automation",
    },
    {
      id: 3,
      name: "Consulting",
      description: "Business and technical consulting",
      price: "€150/hour",
      duration: "Flexible",
      category: "Services",
    },
    {
      id: 4,
      name: "E-commerce Setup",
      description: "Full e-commerce platform setup",
      price: "€3,000 - €8,000",
      duration: "6-12 weeks",
      category: "Development",
    },
  ])

  const handleAddService = (newService: any) => {
    setServices([...services, { ...newService, id: Date.now() }])
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const categories = Array.from(new Set(services.map((s) => s.category)))

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Services</h2>
          <p className="text-foreground/60 mt-2">Manage your service offerings</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Service
        </button>
      </div>

      {showForm && <ServiceForm onSubmit={handleAddService} onCancel={() => setShowForm(false)} />}

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.category === category)
              .map((service) => (
                <ServiceCard key={service.id} service={service} onDelete={handleDelete} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
