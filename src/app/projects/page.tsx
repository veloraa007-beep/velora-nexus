"use client";

import { motion } from "framer-motion";
import { FolderKanban, MoreHorizontal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  { id: 1, name: "Website Redesign", client: "Stark Industries", status: "In Progress", progress: 65, due: "Next Week" },
  { id: 2, name: "Mobile App Development", client: "Wayne Enterprises", status: "Planning", progress: 15, due: "In 2 Months" },
  { id: 3, name: "Data Migration", client: "Oscorp", status: "At Risk", progress: 80, due: "Tomorrow" },
  { id: 4, name: "SEO Optimization", client: "Pym Tech", status: "On Track", progress: 45, due: "Next Month" },
];

export default function ProjectsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Track and manage your agency&apos;s active project deliverables.</p>
        </div>
        <Button>
          <FolderKanban className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="relative group rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.client}</p>
              </div>
              <Button variant="ghost" size="icon" className="-mr-3 -mt-3">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full ${project.status === 'At Risk' ? 'bg-destructive' : 'bg-primary'}`} 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center bg-secondary/40 -mx-6 -mb-6 px-6 py-4 rounded-b-xl border-t">
              <Badge variant="outline" className={
                project.status === 'In Progress' || project.status === 'On Track' ? 'bg-primary/10 text-primary border-primary/20' : 
                project.status === 'At Risk' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                'bg-muted text-muted-foreground'
              }>
                {project.status}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" /> {project.due}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
