import type React from "react"

interface PuzzlePieceProps {
  index: number
  image: string
  pieceSize: { width: number; height: number }
  difficulty: number
  onDragStart: (e: React.DragEvent) => void
  isSelected: boolean
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ index, image, pieceSize, difficulty, onDragStart, isSelected }) => {
  const cropX = (index % difficulty) * pieceSize.width
  const cropY = Math.floor(index / difficulty) * pieceSize.height

  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{
        width: pieceSize.width,
        height: pieceSize.height,
        backgroundImage: `url(${image})`,
        backgroundPosition: `-${cropX}px -${cropY}px`,
        backgroundSize: `${pieceSize.width * difficulty}px ${pieceSize.height * difficulty}px`,
      }}
      className={`cursor-move transition-all hover:scale-105 ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
    />
  )
}

export default PuzzlePiece

