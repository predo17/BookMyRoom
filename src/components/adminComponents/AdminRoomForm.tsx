import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Projector, X } from "lucide-react"
import type { Room } from "@/types/room"
import { useEffect, useState } from "react"

export type RoomFormState = Partial<Room> & { name?: string }

type Props = {
  form: RoomFormState
  onFormChange: (patch: RoomFormState) => void
  imgInputMode: "url" | "upload"
  onImgInputModeChange: (mode: "url" | "upload") => void
  imgLoading: boolean
  setImgLoading: (v: boolean) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImg: () => void
  onSave: () => void
  onCancel: () => void
  isEditing: boolean
  nameExists?: boolean
}

const FALLBACK_IMG =
  "https://imgs.search.brave.com/dflR3Gq7cIvoRM6py9RoCoFU7dCmwInJ-_FeeEyNVcc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvbm8tcmVz/dWx0LWZvdW5kLWls/bHVzdHJhdGlvbi1z/dmctZG93bmxvYWQt/cG5nLTExODM4Mjg3/LnBuZw"

export default function AdminRoomForm({
  form,
  onFormChange,
  imgInputMode,
  onImgInputModeChange,
  imgLoading,
  setImgLoading,
  onFileUpload,
  onUrlChange,
  onRemoveImg,
  onSave,
  onCancel,
  isEditing,
}: Props) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [imgInputMode])

  const isFormValid =
    !!form.name?.trim() &&
    !!form.img &&
    !imgError &&
    !imgLoading

  return (
    <div className="rounded-lg border bg-muted/30 space-y-3 p-4">
      <form action="">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input
              value={form.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
              placeholder="Ex: Sala de reuniões 1"
            />
          </div>
          <div className="space-y-1">
            <Label>Capacidade</Label>
            <Input
              type="number"
              min={1}
              placeholder="Quantidade de pessoas desejadas"
              value={form.capacity}
              onChange={(e) =>
                onFormChange({ capacity: parseInt(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Imagem da sala</Label>
          <div className="flex gap-2 mt-2 mb-4">
            <button
              type="button"
              onClick={() => onImgInputModeChange("url")}
              className={`px-3 py-1 text-sm rounded ${imgInputMode === "url" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              URL
            </button>
            <button
              type="button"
              onClick={() => onImgInputModeChange("upload")}
              className={`px-3 py-1 text-sm rounded ${imgInputMode === "upload" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              Upload
            </button>
          </div>

          {imgInputMode === "url" ? (
            <Input
              value={form.img}
              type="url"
              onChange={onUrlChange}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={onFileUpload}
              className="cursor-pointer"
            />
          )}

          {form.img && (
            <div className="mt-2">
              <div className="relative w-32 h-32 rounded border overflow-hidden bg-gray-100">
                {imgLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                )}
                <img
                  src={form.img}
                  alt="Preview"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoading ? "opacity-0" : "opacity-100"
                    }`}
                  onLoad={() => setImgLoading(false)}
                  onError={(e) => {
                    setImgLoading(false)
                    setImgError(true)
                    e.currentTarget.src = FALLBACK_IMG
                  }}

                />
              </div>
              <button
                type="button"
                onClick={onRemoveImg}
                className="mt-1 text-sm text-red-500 hover:text-red-700"
              >
                Remover imagem
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasProjector"
            checked={form.hasProjector ?? false}
            onChange={(e) => onFormChange({ hasProjector: e.target.checked })}
          />
          <Label htmlFor="hasProjector" className="flex items-center gap-1 mt-2">
            Possui <em>projetor</em> <Projector className="size-4" />
          </Label>
        </div>

        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={onSave} disabled={!isFormValid}>
            {isEditing ? "Salvar" : "Adicionar"}
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel}>
            <X className="size-4" />
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
