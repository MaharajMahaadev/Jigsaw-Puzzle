import type React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HistorySidebarProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  onSelectImage: (imageData: string, width: number, height: number) => void
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, images, onSelectImage }) => {
  const handleImageSelect = (imageData: string) => {
    const img = new Image()
    img.onload = () => {
      onSelectImage(imageData, img.width, img.height)
      onClose()
    }
    img.src = imageData
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Image History</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] mt-4">
          <div className="grid grid-cols-2 gap-4">
            {images.map((imageData, index) => (
              <img
                key={index}
                src={imageData || "/placeholder.svg"}
                alt={`History ${index + 1}`}
                className="w-full h-auto cursor-pointer rounded-md hover:opacity-80 transition-opacity"
                onClick={() => handleImageSelect(imageData)}
              />
            ))}
          </div>
        </ScrollArea>
        <SheetClose className="mt-4">Close</SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default HistorySidebar

