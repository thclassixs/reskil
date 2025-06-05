"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { YouTubePlayer } from "./youtube-player"
import { X } from "lucide-react"

interface VideoPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
}

export function VideoPreviewModal({ isOpen, onClose, videoUrl, title }: VideoPreviewModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title || "Video Preview"}</DialogTitle>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>
        <div className="mt-4">
          <YouTubePlayer videoUrl={videoUrl} isLocked={false} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
