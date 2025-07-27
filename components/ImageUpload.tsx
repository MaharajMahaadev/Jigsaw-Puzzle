"use client"

import type React from "react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onImageUpload: (imageData: string, width: number, height: number) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const maxSize = 600
          let width = img.width
          let height = img.height

          if (width > height && width > maxSize) {
            height *= maxSize / width
            width = maxSize
          } else if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx?.drawImage(img, 0, 0, width, height)

          const resizedImage = canvas.toDataURL("image/jpeg")
          onImageUpload(resizedImage, width, height)
        }
        img.src = event.target?.result as string
      }

      reader.readAsDataURL(file)
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true })

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <input {...getInputProps()} />
      <p className="mb-4">Drag 'n' drop an image here, or click the button to select an image</p>
      <Button onClick={open}>Upload Image</Button>
    </div>
  )
}

export default ImageUpload

