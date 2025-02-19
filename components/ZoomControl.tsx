import type React from "react"
import { Slider } from "@/components/ui/slider"

interface ZoomControlProps {
  zoom: number
  setZoom: (zoom: number) => void
  maxZoom: number
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoom, setZoom, maxZoom }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Zoom:</span>
      <Slider
        min={0.5}
        max={maxZoom}
        step={0.1}
        value={[zoom]}
        onValueChange={(value) => setZoom(value[0])}
        className="w-[200px]"
      />
      <span className="text-sm font-medium">{(zoom * 100).toFixed(0)}%</span>
    </div>
  )
}

export default ZoomControl

