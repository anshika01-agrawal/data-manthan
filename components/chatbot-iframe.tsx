"use client"

import { useState } from "react"
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatbotIframe() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Chat Iframe */}
          {isOpen && (
            <div className={`absolute bottom-16 right-0 mb-2 transition-all duration-300 ${
              isMaximized 
                ? 'fixed inset-4 w-auto h-auto' 
                : 'w-96 h-[600px]'
            }`}>
              <Card className="h-full bg-slate-900/95 border-cyan-500/30 backdrop-blur-lg shadow-xl flex flex-col">
                <CardHeader className="pb-3 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <CardTitle className="text-cyan-300 text-sm">Marine AI Assistant</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMaximized(!isMaximized)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <iframe
                    src="https://aquamarine-biscochitos-d9fea7.netlify.app/"
                    className="w-full h-full border-0 rounded-b-lg"
                    title="Marine AI Assistant Chatbot"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Floating Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <div className="relative">
              <MessageCircle className="h-6 w-6 text-white" />
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></div>
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}