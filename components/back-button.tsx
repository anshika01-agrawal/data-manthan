"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { useNavigationHistory } from "@/hooks/use-navigation-history"
import { useRouter } from "next/navigation"

export function BackButton() {
  const { goBack, canGoBack, history } = useNavigationHistory()
  const router = useRouter()

  const handleBack = () => {
    if (canGoBack) {
      goBack()
    } else {
      router.push('/')
    }
  }

  const handleHome = () => {
    router.push('/')
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBack}
        className="flex items-center gap-1"
        disabled={!canGoBack && history[0] === '/'}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
        {canGoBack && history.length > 1 && (
          <span className="text-xs text-muted-foreground ml-1">
            ({history.length - 1})
          </span>
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleHome}
        className="flex items-center gap-1"
        title="Go to Home"
      >
        <Home className="h-4 w-4" />
      </Button>
      
      {/* Debug info - can be removed in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-muted-foreground ml-2">
          History: {history.slice(-3).join(' → ')}
        </div>
      )}
    </div>
  )
}