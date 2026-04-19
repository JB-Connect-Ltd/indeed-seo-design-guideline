import { AlertCircle, Trash2, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

export function DeleteIconButton({ label = "削除", onClick, className = "" }) {
  return (
    <button
      type="button"
      className={buttonVariants({
        variant: "outline",
        size: "icon-sm",
        className: `rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 ${className}`,
      })}
      onClick={onClick}
      aria-label={label}
    >
      <Trash2 className="size-4" />
    </button>
  )
}

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "削除確認",
  itemName,
  description = "この操作は取り消すことができません。",
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
      <div className="w-full max-w-xl rounded-[22px] border border-border bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">削除する前に内容をご確認ください。</p>
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

        <div className="px-5 py-5">
          <div className="rounded-[18px] border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                <AlertCircle className="size-5" />
              </div>
              <div className="space-y-2.5">
                <div className="text-base font-semibold tracking-tight">本当に削除してもよろしいですか？</div>
                {itemName ? <div className="text-sm text-muted-foreground">対象: {itemName}</div> : null}
                <p className="text-sm leading-7 text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 pb-5">
          <Button variant="outline" size="lg" className="min-w-32 rounded-2xl" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            size="lg"
            className="min-w-24 rounded-2xl bg-red-600 px-5 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            削除
          </Button>
        </div>
      </div>
    </div>
  )
}
