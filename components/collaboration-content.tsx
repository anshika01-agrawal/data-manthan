"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  GitBranch, 
  Users, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Code, 
  Bug, 
  Lightbulb,
  MessageSquare,
  FileText,
  PlayCircle,
  Pause,
  Download,
  Share2
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "paused"
  progress: number
  team: string[]
  category: string
  deadline: string
  tasks: number
  completedTasks: number
  priority: "high" | "medium" | "low"
}

interface DebugSession {
  id: string
  title: string
  student: string
  issue: string
  status: "open" | "in-progress" | "resolved"
  mentor: string | null
  category: string
  timestamp: string
  description: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Ocean Temperature Prediction Model",
    description: "Developing ML model to predict ocean temperature changes using historical data and satellite imagery.",
    status: "active",
    progress: 75,
    team: ["Dr. Sarah Ocean", "Alex Marine", "Lisa Wave", "Mike Deep"],
    category: "Machine Learning",
    deadline: "2025-10-15",
    tasks: 12,
    completedTasks: 9,
    priority: "high"
  },
  {
    id: "2",
    name: "eDNA Species Classification Pipeline",
    description: "Automated pipeline for processing environmental DNA samples and identifying marine species.",
    status: "active",
    progress: 45,
    team: ["Prof. DNA Expert", "Bio Student", "Code Ninja"],
    category: "Bioinformatics",
    deadline: "2025-11-30",
    tasks: 8,
    completedTasks: 4,
    priority: "medium"
  },
  {
    id: "3",
    name: "Interactive Ocean Data Visualization",
    description: "Web-based platform for visualizing real-time oceanographic data with interactive charts and maps.",
    status: "completed",
    progress: 100,
    team: ["UI Designer", "Frontend Dev", "Data Scientist"],
    category: "Web Development",
    deadline: "2025-09-01",
    tasks: 15,
    completedTasks: 15,
    priority: "low"
  }
]

const mockDebugSessions: DebugSession[] = [
  {
    id: "1",
    title: "Python pandas DataFrame merge issue",
    student: "student_marine_01",
    issue: "Getting KeyError when trying to merge oceanographic datasets",
    status: "open",
    mentor: null,
    category: "Data Processing",
    timestamp: "30 minutes ago",
    description: "I'm trying to merge two pandas DataFrames containing temperature and salinity data, but I keep getting a KeyError. The column names look the same but the merge isn't working."
  },
  {
    id: "2",
    title: "Machine Learning Model Overfitting",
    student: "ai_learner_42",
    issue: "Neural network showing 99% training accuracy but 60% validation accuracy",
    status: "in-progress",
    mentor: "Dr. ML Expert",
    category: "Machine Learning",
    timestamp: "2 hours ago",
    description: "My CNN model for fish classification is clearly overfitting. I've tried dropout and regularization but still having issues. Need help with better data augmentation strategies."
  },
  {
    id: "3",
    title: "React Component State Management",
    student: "web_dev_newbie",
    issue: "Chart component not updating when props change",
    status: "resolved",
    mentor: "Frontend Guru",
    category: "Web Development",
    timestamp: "1 day ago",
    description: "My oceanographic chart component wasn't re-rendering when new data was passed as props. Solved by using useEffect with proper dependencies."
  }
]

export function CollaborationContent() {
  const [selectedTab, setSelectedTab] = useState("projects")
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [isDebugHelpOpen, setIsDebugHelpOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    category: "",
    deadline: "",
    priority: "medium"
  })
  const [debugRequest, setDebugRequest] = useState({
    title: "",
    category: "",
    issue: "",
    description: ""
  })

  const handleCreateProject = () => {
    console.log("Creating project:", newProject)
    setIsCreateProjectOpen(false)
    setNewProject({ name: "", description: "", category: "", deadline: "", priority: "medium" })
  }

  const handleSubmitDebugRequest = () => {
    console.log("Submitting debug request:", debugRequest)
    setIsDebugHelpOpen(false)
    setDebugRequest({ title: "", category: "", issue: "", description: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-600/20 text-green-300"
      case "completed": return "bg-blue-600/20 text-blue-300"
      case "paused": return "bg-yellow-600/20 text-yellow-300"
      case "open": return "bg-red-600/20 text-red-300"
      case "in-progress": return "bg-yellow-600/20 text-yellow-300"
      case "resolved": return "bg-green-600/20 text-green-300"
      default: return "bg-gray-600/20 text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400"
      case "medium": return "text-yellow-400"
      case "low": return "text-green-400"
      default: return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <GitBranch className="h-10 w-10 text-cyan-400" />
            Research Collaboration Hub
          </h1>
          <p className="text-cyan-100 text-lg max-w-3xl mx-auto">
            Collaborate on research projects, get debugging help from mentors, and contribute to cutting-edge marine science initiatives.
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="debug-help">Debug Help</TabsTrigger>
            <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Collaborative Projects</h2>
              <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-cyan-500/30 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Collaborative Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-name" className="text-white">Project Name</Label>
                      <Input
                        id="project-name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="Enter project name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-description" className="text-white">Description</Label>
                      <Textarea
                        id="project-description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="Describe your project goals, methodology, and expected outcomes..."
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Category</Label>
                        <Select value={newProject.category} onValueChange={(value) => setNewProject({...newProject, category: value})}>
                          <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                            <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                            <SelectItem value="Bioinformatics">Bioinformatics</SelectItem>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Data Visualization">Data Visualization</SelectItem>
                            <SelectItem value="Research">Research</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Priority</Label>
                        <Select value={newProject.priority} onValueChange={(value) => setNewProject({...newProject, priority: value})}>
                          <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="project-deadline" className="text-white">Expected Deadline</Label>
                      <Input
                        id="project-deadline"
                        type="date"
                        value={newProject.deadline}
                        onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                      />
                    </div>
                    <Button onClick={handleCreateProject} className="w-full bg-cyan-600 hover:bg-cyan-700">
                      Create Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-xl mb-2">{project.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                            {project.category}
                          </Badge>
                          <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{project.description}</p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-cyan-300">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Tasks */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>{project.completedTasks}/{project.tasks} tasks completed</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{project.deadline}</span>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div>
                      <div className="text-sm text-gray-300 mb-2">Team Members</div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 4).map((member, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-slate-800">
                              <AvatarFallback className="bg-cyan-600 text-white text-xs">
                                {member.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 4 && (
                            <div className="h-8 w-8 bg-slate-700 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs text-cyan-300">
                              +{project.team.length - 4}
                            </div>
                          )}
                        </div>
                        <Button size="sm" variant="ghost" className="text-cyan-300 hover:text-cyan-200">
                          <Users className="h-4 w-4 mr-1" />
                          Join Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Debug Help Tab */}
          <TabsContent value="debug-help" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Debug Help Center</h2>
              <Dialog open={isDebugHelpOpen} onOpenChange={setIsDebugHelpOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Bug className="h-4 w-4 mr-2" />
                    Get Debug Help
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-cyan-500/30 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Request Debugging Help</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="debug-title" className="text-white">Issue Title</Label>
                      <Input
                        id="debug-title"
                        value={debugRequest.title}
                        onChange={(e) => setDebugRequest({...debugRequest, title: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="Brief description of your issue..."
                      />
                    </div>
                    <div>
                      <Label className="text-white">Category</Label>
                      <Select value={debugRequest.category} onValueChange={(value) => setDebugRequest({...debugRequest, category: value})}>
                        <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Data Processing">Data Processing</SelectItem>
                          <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                          <SelectItem value="Python Programming">Python Programming</SelectItem>
                          <SelectItem value="Data Visualization">Data Visualization</SelectItem>
                          <SelectItem value="Database Issues">Database Issues</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="debug-issue" className="text-white">Quick Issue Summary</Label>
                      <Input
                        id="debug-issue"
                        value={debugRequest.issue}
                        onChange={(e) => setDebugRequest({...debugRequest, issue: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="e.g., Getting KeyError when merging DataFrames..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="debug-description" className="text-white">Detailed Description</Label>
                      <Textarea
                        id="debug-description"
                        value={debugRequest.description}
                        onChange={(e) => setDebugRequest({...debugRequest, description: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="Provide detailed information about your issue, what you've tried, error messages, code snippets, etc."
                        rows={6}
                      />
                    </div>
                    <Button onClick={handleSubmitDebugRequest} className="w-full bg-red-600 hover:bg-red-700">
                      Submit Debug Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockDebugSessions.map((session) => (
                <Card key={session.id} className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2">{session.title}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(session.status)}>
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1).replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                            {session.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          <span>by {session.student} • {session.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-cyan-300 text-sm font-medium mb-1">Issue:</h4>
                      <p className="text-gray-300 text-sm">{session.issue}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-cyan-300 text-sm font-medium mb-1">Description:</h4>
                      <p className="text-gray-300 text-sm">{session.description}</p>
                    </div>

                    {session.mentor && (
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-700">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-green-600 text-white text-xs">
                            {session.mentor.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-green-300">Mentor: {session.mentor}</span>
                      </div>
                    )}

                    {!session.mentor && session.status === 'open' && (
                      <div className="pt-3 border-t border-slate-700">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Help with this issue
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Learning Resources & Tutorials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Python for Oceanographic Data Analysis",
                  description: "Complete guide to using pandas, numpy, and matplotlib for marine data analysis.",
                  type: "Tutorial Series",
                  duration: "4 hours",
                  level: "Beginner",
                  icon: Code
                },
                {
                  title: "Machine Learning for Marine Biology",
                  description: "Learn how to apply ML algorithms to marine species classification and behavior prediction.",
                  type: "Course",
                  duration: "8 hours",
                  level: "Intermediate",
                  icon: Brain
                },
                {
                  title: "React Components for Data Visualization",
                  description: "Build interactive charts and maps for oceanographic data visualization.",
                  type: "Workshop",
                  duration: "3 hours",
                  level: "Intermediate",
                  icon: FileText
                },
                {
                  title: "Debugging Techniques for Data Scientists",
                  description: "Advanced debugging strategies for Python data analysis and ML workflows.",
                  type: "Masterclass",
                  duration: "2 hours",
                  level: "Advanced",
                  icon: Bug
                },
                {
                  title: "Git Collaboration for Research Projects",
                  description: "Learn effective version control and collaboration workflows for research teams.",
                  type: "Tutorial",
                  duration: "1.5 hours",
                  level: "Beginner",
                  icon: GitBranch
                },
                {
                  title: "Statistical Analysis of Ocean Data",
                  description: "Statistical methods and hypothesis testing for oceanographic research.",
                  type: "Course",
                  duration: "6 hours",
                  level: "Advanced",
                  icon: TrendingUp
                }
              ].map((resource, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-cyan-600/20 rounded-lg">
                        <resource.icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 text-xs">
                            {resource.type}
                          </Badge>
                          <Badge className={`text-xs ${
                            resource.level === 'Beginner' ? 'bg-green-600/20 text-green-300' :
                            resource.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                            'bg-red-600/20 text-red-300'
                          }`}>
                            {resource.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {resource.duration}
                      </div>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}