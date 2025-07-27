"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import PuzzlePiece from "./PuzzlePiece"
import ZoomControl from "./ZoomControl"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface PuzzleBoardProps {
  image: string
  size: { width: number; height: number }
  difficulty: number
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ image, size, difficulty }) => {
  const [pieces, setPieces] = useState<number[]>([])
  const [zoom, setZoom] = useState(1)
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newPieces = Array.from({ length: difficulty * difficulty }, (_, i) => i)
    shuffleArray(newPieces)
    setPieces(newPieces)
  }, [difficulty])

  const pieceSize = {
    width: size.width / difficulty,
    height: size.height / difficulty,
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    const sourceIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
    swapPieces(sourceIndex, targetIndex)
  }

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index)
    } else {
      swapPieces(selectedPiece, index)
      setSelectedPiece(null)
    }
  }

  const swapPieces = (sourceIndex: number, targetIndex: number) => {
    const newPieces = [...pieces]
    ;[newPieces[targetIndex], newPieces[sourceIndex]] = [newPieces[sourceIndex], newPieces[targetIndex]]
    setPieces(newPieces)
  }

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <ZoomControl zoom={zoom} setZoom={setZoom} maxZoom={3} />
        <Button onClick={() => window.location.reload()}>Upload New Image</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <ScrollArea className="h-[600px] w-[600px] rounded-md border">
          <div ref={containerRef} className="relative" style={{ width: size.width * zoom, height: size.height * zoom }}>
            <div
              className="grid gap-0.5 bg-gray-200 absolute top-0 left-0"
              style={{
                width: size.width,
                height: size.height,
                gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                transition: "transform 0.3s ease",
              }}
            >
              {pieces.map((pieceIndex, index) => (
                <div
                  key={index}
                  className="bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onClick={() => handlePieceClick(index)}
                >
                  <PuzzlePiece
                    key={pieceIndex}
                    index={pieceIndex}
                    image={image}
                    pieceSize={pieceSize}
                    difficulty={difficulty}
                    onDragStart={(e) => handleDragStart(e, index)}
                    isSelected={selectedPiece === index}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="flex-shrink-0">
          <h3 className="text-xl font-bold mb-2 text-primary">Original Image</h3>
          <img
            src={image || "/placeholder.svg"}
            alt="Original"
            style={{ width: size.width / 2, height: size.height / 2 }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default PuzzleBoard

