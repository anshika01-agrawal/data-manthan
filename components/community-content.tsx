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
import { Users, Plus, MessageCircle, Star, Award, TrendingUp, Search, Filter } from "lucide-react"

interface Team {
  id: string
  name: string
  description: string
  members: number
  category: string
  level: string
  image: string
  tags: string[]
  leader: string
}

interface Discussion {
  id: string
  title: string
  author: string
  replies: number
  likes: number
  category: string
  timestamp: string
  tags: string[]
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Ocean Data Scientists",
    description: "Exploring marine datasets and developing predictive models for ocean temperature and salinity patterns.",
    members: 24,
    category: "Data Science",
    level: "Advanced",
    image: "/placeholder.svg",
    tags: ["Machine Learning", "Ocean Data", "Python"],
    leader: "Dr. Sarah Ocean"
  },
  {
    id: "2", 
    name: "eDNA Researchers",
    description: "Collaborative research on environmental DNA analysis for marine biodiversity assessment.",
    members: 18,
    category: "Research",
    level: "Intermediate",
    image: "/placeholder.svg",
    tags: ["eDNA", "Biodiversity", "Genetics"],
    leader: "Prof. Mike Marine"
  },
  {
    id: "3",
    name: "Beginner Oceanographers",
    description: "Learning group for students new to oceanographic research and marine data analysis.",
    members: 45,
    category: "Learning",
    level: "Beginner",
    image: "/placeholder.svg", 
    tags: ["Beginner", "Learning", "Oceanography"],
    leader: "Dr. Lisa Wave"
  },
  {
    id: "4",
    name: "Fish Classification AI",
    description: "Developing machine learning models for automated fish species identification and classification.",
    members: 32,
    category: "AI/ML",
    level: "Advanced",
    image: "/placeholder.svg",
    tags: ["AI", "Computer Vision", "Fish Classification"],
    leader: "Dr. Alex Neural"
  }
]

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Best practices for cleaning oceanographic sensor data?",
    author: "marine_researcher_01",
    replies: 15,
    likes: 28,
    category: "Data Processing",
    timestamp: "2 hours ago",
    tags: ["data-cleaning", "sensors", "oceanography"]
  },
  {
    id: "2", 
    title: "New paper: Deep learning for eDNA species detection",
    author: "dna_expert",
    replies: 8,
    likes: 42,
    category: "Research",
    timestamp: "5 hours ago",
    tags: ["edna", "deep-learning", "species-detection"]
  },
  {
    id: "3",
    title: "Help needed: Otolith image preprocessing techniques",
    author: "student_researcher",
    replies: 12,
    likes: 19,
    category: "Help & Support",
    timestamp: "1 day ago",
    tags: ["otolith", "image-processing", "help-needed"]
  }
]

export function CommunityContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false)
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    category: "",
    level: "",
    tags: ""
  })

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || team.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateTeam = () => {
    // Here you would typically send the data to your backend
    console.log("Creating team:", newTeam)
    setIsCreateTeamOpen(false)
    setNewTeam({ name: "", description: "", category: "", level: "", tags: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Users className="h-10 w-10 text-cyan-400" />
            Marine Research Community
          </h1>
          <p className="text-cyan-100 text-lg max-w-3xl mx-auto">
            Connect with fellow researchers, join specialized teams, and collaborate on cutting-edge marine science projects.
          </p>
        </div>

        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="teams">Research Teams</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-cyan-500/30 text-white"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-slate-800/50 border-cyan-500/30 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Learning">Learning</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-cyan-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Research Team</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="team-name" className="text-white">Team Name</Label>
                      <Input
                        id="team-name"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="Enter team name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="team-description" className="text-white">Description</Label>
                      <Textarea
                        id="team-description"
                        value={newTeam.description}
                        onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="Describe your team's goals and focus..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Category</Label>
                        <Select value={newTeam.category} onValueChange={(value) => setNewTeam({...newTeam, category: value})}>
                          <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Data Science">Data Science</SelectItem>
                            <SelectItem value="Research">Research</SelectItem>
                            <SelectItem value="Learning">Learning</SelectItem>
                            <SelectItem value="AI/ML">AI/ML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Level</Label>
                        <Select value={newTeam.level} onValueChange={(value) => setNewTeam({...newTeam, level: value})}>
                          <SelectTrigger className="bg-slate-700 border-cyan-500/30 text-white">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="team-tags" className="text-white">Tags (comma-separated)</Label>
                      <Input
                        id="team-tags"
                        value={newTeam.tags}
                        onChange={(e) => setNewTeam({...newTeam, tags: e.target.value})}
                        className="bg-slate-700 border-cyan-500/30 text-white"
                        placeholder="e.g., Machine Learning, Python, Ocean Data"
                      />
                    </div>
                    <Button onClick={handleCreateTeam} className="w-full bg-cyan-600 hover:bg-cyan-700">
                      Create Team
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={team.image} alt={team.name} />
                          <AvatarFallback className="bg-cyan-600 text-white">
                            {team.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white text-lg">{team.name}</CardTitle>
                          <p className="text-cyan-300 text-sm">Led by {team.leader}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className={`
                        ${team.level === 'Beginner' ? 'bg-green-600/20 text-green-300' : ''}
                        ${team.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' : ''}
                        ${team.level === 'Advanced' ? 'bg-red-600/20 text-red-300' : ''}
                      `}>
                        {team.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{team.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {team.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{team.members} members</span>
                      </div>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        Join Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="space-y-4">
              {mockDiscussions.map((discussion) => (
                <Card key={discussion.id} className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white text-lg font-medium mb-2">{discussion.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>by {discussion.author}</span>
                          <span>{discussion.timestamp}</span>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                            {discussion.category}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-gray-300">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 ml-4">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {discussion.likes}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30">
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Top Contributor</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarFallback className="bg-cyan-600 text-white text-lg">DR</AvatarFallback>
                  </Avatar>
                  <h3 className="text-white font-medium">Dr. Sarah Ocean</h3>
                  <p className="text-cyan-300 text-sm">1,247 contributions</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Most Active Team</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Ocean Data Scientists</div>
                  <p className="text-cyan-300 text-sm">156 weekly activities</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-500/30">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-white">
                    <div className="text-2xl font-bold text-cyan-400">1,234</div>
                    <div className="text-sm">Total Members</div>
                  </div>
                  <div className="text-white">
                    <div className="text-2xl font-bold text-cyan-400">89</div>
                    <div className="text-sm">Active Teams</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}