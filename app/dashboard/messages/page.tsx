"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react"

const MOCK_CHATS = [
  {
    id: '1',
    name: 'Hamza Khan',
    avatar: '/avatars/hamza.webp',
    lastMessage: "Hey, how's your React course going?",
    timestamp: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Rida Ahmed',
    avatar: '/avatars/rida.webp',
    lastMessage: 'The AI automation module was fantastic!',
    timestamp: '1h ago',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Mouad El Idrissi',
    avatar: '/avatars/mouad.webp',
    lastMessage: 'Thanks for your help with the assignment',
    timestamp: '2h ago',
    unread: 0,
    online: false,
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

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        {/* Chat List */}
        <Card className="md:col-span-1 h-full flex flex-col">
          <div className="p-4 border-b">
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
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-3 flex items-center space-x-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    selectedChat.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
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
        <Card className="md:col-span-2 h-full flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold">{selectedChat.name}</h2>
                    <p className="text-xs text-gray-500">
                      {selectedChat.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {MOCK_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Handle sending message
                    setNewMessage('')
                  }}
                  className="flex items-center space-x-2"
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
