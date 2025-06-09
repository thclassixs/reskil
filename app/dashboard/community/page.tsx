"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Eye, TrendingUp, Search } from "lucide-react"

const MOCK_DISCUSSIONS = [
  {
    id: '1',
    title: 'How to structure a React application for scalability?',
    author: {
      name: 'Alex Johnson',
      avatar: '/avatars/hamza.webp',
    },
    category: 'React',
    replies: 23,
    views: 156,
    likes: 45,
    timestamp: '2h ago',
    trending: true,
  },
  {
    id: '2',
    title: 'Best practices for Shopify store optimization',
    author: {
      name: 'Sarah Wilson',
      avatar: '/avatars/mouad.webp',
    },
    category: 'E-commerce',
    replies: 15,
    views: 98,
    likes: 32,
    timestamp: '4h ago',
    trending: true,
  },
  {
    id: '3',
    title: 'Tips for creating effective TikTok ad campaigns',
    author: {
      name: 'Mike Brown',
      avatar: '/avatars/rida.webp',
    },
    category: 'Digital Marketing',
    replies: 18,
    views: 120,
    likes: 28,
    timestamp: '6h ago',
    trending: false,
  },
]

const categories = [
  { name: 'All', count: 156 },
  { name: 'React', count: 45 },
  { name: 'E-commerce', count: 38 },
  { name: 'Digital Marketing', count: 29 },
  { name: 'UI/UX Design', count: 24 },
  { name: 'AI & Automation', count: 20 },
]

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Discussions</h1>
        <Button className="bg-blue-600">Start Discussion</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <Card className="p-4 md:col-span-1">
          <h2 className="font-semibold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-sm ${
                  activeCategory === category.name
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>{category.name}</span>
                <Badge variant="secondary">{category.count}</Badge>
              </button>
            ))}
          </div>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Card className="p-4">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Filters</Button>
            </div>

            <Tabs defaultValue="latest">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          <div className="space-y-4">
            {MOCK_DISCUSSIONS.map((discussion) => (
              <Card key={discussion.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={discussion.author.avatar}
                    alt={discussion.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="secondary">{discussion.category}</Badge>
                      {discussion.trending && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{discussion.author.name}</span>
                      <span>{discussion.timestamp}</span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {discussion.replies}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {discussion.views}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {discussion.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
