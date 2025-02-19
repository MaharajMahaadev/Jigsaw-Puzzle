"use client"

import { useState, useCallback } from "react"
import ImageUpload from "@/components/ImageUpload"
import PuzzleBoard from "@/components/PuzzleBoard"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [difficulty, setDifficulty] = useState(6) // 6x6 grid by default

  const handleImageUpload = useCallback((imageData: string, width: number, height: number) => {
    setImage(imageData)
    setSize({ width, height })
  }, [])

  const handleStartPuzzle = useCallback(() => {
    // This function is now just for triggering a re-render
  }, [])

  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Jigsaw Puzzle Maker</h1>
      {!image ? (
        <div className="max-w-md mx-auto">
          <ImageUpload onImageUpload={handleImageUpload} />
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
            <Button onClick={handleStartPuzzle}>Start Puzzle</Button>
          </div>
          <PuzzleBoard key={difficulty} image={image} size={size} difficulty={difficulty} />
        </div>
      )}
    </main>
  )
}

