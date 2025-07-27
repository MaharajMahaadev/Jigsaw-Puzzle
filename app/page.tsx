"use client"

import { useState, useCallback, useEffect } from "react"
import ImageUpload from "@/components/ImageUpload"
import PuzzleBoard from "@/components/PuzzleBoard"
import HistorySidebar from "@/components/HistorySidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sampleImages = [
  {
    name: "Laptop",
    url: "https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sports Car",
    url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "City",
    url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
]

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [difficulty, setDifficulty] = useState(6) // 6x6 grid by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [imageHistory, setImageHistory] = useState<string[]>([])

  useEffect(() => {
    const storedHistory = sessionStorage.getItem("imageHistory")
    if (storedHistory) {
      setImageHistory(JSON.parse(storedHistory))
    } else {
      // Initialize history with sample images
      setImageHistory(sampleImages.map((img) => img.url))
      sessionStorage.setItem("imageHistory", JSON.stringify(sampleImages.map((img) => img.url)))
    }
  }, [])

  const handleImageUpload = useCallback(
    (imageData: string, width: number, height: number) => {
      setImage(imageData)
      setSize({ width, height })
      if (!imageHistory.includes(imageData)) {
        const newHistory = [imageData, ...imageHistory].slice(0, 10) // Keep only the last 10 images
        setImageHistory(newHistory)
        sessionStorage.setItem("imageHistory", JSON.stringify(newHistory))
      }
    },
    [imageHistory],
  )

  const handleSampleImageSelect = useCallback(
    (url: string) => {
      const img = new Image()
      img.onload = () => {
        handleImageUpload(url, img.width, img.height)
      }
      img.src = url
    },
    [handleImageUpload],
  )

  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Jigsaw Puzzle Maker</h1>
      {!image ? (
        <div className="max-w-md mx-auto space-y-6">
          <ImageUpload onImageUpload={handleImageUpload} />
          <div>
            <h2 className="text-2xl font-bold mb-4">Sample Images</h2>
            <div className="grid grid-cols-3 gap-4">
              {sampleImages.map((sample) => (
                <Button key={sample.name} onClick={() => handleSampleImageSelect(sample.url)}>
                  {sample.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center items-center space-x-4">
            <Select onValueChange={(value) => setDifficulty(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">Very Easy (4x4)</SelectItem>
                <SelectItem value="6">Easy (6x6)</SelectItem>
                <SelectItem value="10">Normal (10x10)</SelectItem>
                <SelectItem value="20">Hard (20x20)</SelectItem>
                <SelectItem value="35">Very Hard (35x35)</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsSidebarOpen(true)}>Open History</Button>
          </div>
          <PuzzleBoard key={difficulty} image={image} size={size} difficulty={difficulty} />
        </div>
      )}
      <HistorySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        images={imageHistory}
        onSelectImage={handleImageUpload}
      />
    </main>
  )
}

