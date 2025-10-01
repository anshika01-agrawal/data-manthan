"use client"

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  LogOut, 
  Settings, 
  Database,
  UserCircle,
  LogIn
} from "lucide-react"

export function UserMenu() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: "/" })
    setIsLoading(false)
  }

  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: "/" })
  }

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleSignIn}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </div>
    )
  }

  const userInitials = session.user?.name
    ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'researcher':
        return 'default'
      default:
        return 'secondary'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10">
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white font-medium">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-900/95 border-slate-700 backdrop-blur-sm" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium leading-none text-white">
                {session.user?.name}
              </p>
              {session.user?.role && (
                <Badge variant={getRoleBadgeVariant(session.user.role)} className="text-xs">
                  {session.user.role}
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-slate-400">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 hover:text-white cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 hover:text-white cursor-pointer">
          <Database className="mr-2 h-4 w-4" />
          <span>My Data</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 hover:text-white cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}