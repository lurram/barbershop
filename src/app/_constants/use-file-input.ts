import { useRef, useState } from 'react'

export function useFileInput() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onChange(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return {
    fileInputRef,
    fileName,
    handleFileChange,
    triggerFileInput,
  }
}
