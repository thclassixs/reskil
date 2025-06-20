"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, MoreVertical, Phone, Video, ChevronLeft } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const MOCK_CHATS = [
  {
    id: '1',
    name: 'Hamza Khan',
    avatar: '/avatars/hamza.webp',
    lastMessage: "Hey, how's your React course going?",
    timestamp: '2m ago',
    unread: 2,
    online: true,
    role: "Student",
  },
  {
    id: '2',
    name: 'Rida Ahmed',
    avatar: '/avatars/rida.webp',
    lastMessage: 'The AI automation module was fantastic!',
    timestamp: '1h ago',
    unread: 0,
    online: true,
    role: "Instructor",
  },
  {
    id: '3',
    name: 'Mouad El Idrissi',
    avatar: '/avatars/mouad.webp',
    lastMessage: 'Thanks for your help with the assignment',
    timestamp: '2h ago',
    unread: 0,
    online: false,
    role: "Student",
  },
]

const MOCK_MESSAGES = [
  {
    id: '1',
    senderId: '1',
    text: "Hey, how's your React course going?",
    timestamp: '2:30 PM',
  },
  {
    id: '2',
    senderId: 'me',
    text: "It's going great! Just finished the hooks section.",
    timestamp: '2:31 PM',
  },
  {
    id: '3',
    senderId: '1',
    text: "That's awesome! The useEffect hook can be tricky at first.",
    timestamp: '2:32 PM',
  },
  {
    id: '4',
    senderId: 'me',
    text: "Yeah, but the examples in the course really helped clarify things.",
    timestamp: '2:33 PM',
  },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0])
  const [newMessage, setNewMessage] = useState('')
  const [mobileChatOpen, setMobileChatOpen] = useState(false)

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Chat List - Hidden on mobile when chat is open */}
        <Card className={`md:col-span-1 h-full flex flex-col ${mobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {MOCK_CHATS.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat)
                    setMobileChatOpen(true)
                  }}
                  className={`w-full p-3 flex items-center space-x-3 rounded-lg hover:bg-gray-50 transition-colors ${
                    selectedChat.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs h-5">
                        {chat.role}
                      </Badge>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Window */}
        {selectedChat && (
          <Card className={`md:col-span-2 h-full flex flex-col ${!mobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setMobileChatOpen(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${selectedChat.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {selectedChat.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4 bg-gray-50">
              <div className="space-y-3">
                {MOCK_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.senderId === 'me'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-xs mt-1 block text-right ${
                        message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // Handle sending message
                  setNewMessage('')
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="rounded-full"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}