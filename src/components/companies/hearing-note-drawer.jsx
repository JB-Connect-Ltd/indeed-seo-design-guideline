import { X } from "lucide-react"

import { FormSection } from "@/components/page/page-cards"
import { KvGrid } from "@/components/page/page-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HearingNoteDrawer({
  open,
  onClose,
  sections,
  images,
  title = "ヒアリング内容",
  description = "ヒアリングフォームで入力された内容を確認できます。",
}) {
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-[760px] flex-col border-l border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="text-xl font-semibold tracking-tight">{title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="閉じる"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {sections.map((section) => (
            <FormSection key={section.title} title={section.title}>
              <KvGrid items={section.items} />
            </FormSection>
          ))}

          {images?.length ? (
            <FormSection title="掲載画像">
              <div className="grid gap-4 md:grid-cols-2">
                {images.map((image) => (
                  <div key={image.name} className="overflow-hidden rounded-2xl border border-border bg-white">
                    <img
                      src={image.src}
                      alt={image.name}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="border-t border-border px-3 py-3">
                      <Badge variant="secondary" className="max-w-full rounded-full px-3 py-1">
                        <span className="truncate">{image.name}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </FormSection>
          ) : null}
        </div>

        <div className="border-t border-border px-6 py-4">
          <Button variant="outline" className="w-full rounded-2xl" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )
}
