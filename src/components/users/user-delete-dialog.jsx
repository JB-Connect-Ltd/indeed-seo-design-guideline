import { AlertCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function UserDeleteDialog({ user, open, onClose, onConfirm }) {
  if (!open || !user) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
      <div className="w-full max-w-2xl rounded-[22px] border border-border bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">ユーザーを削除</h2>
            <p className="mt-2 text-sm text-muted-foreground">この操作は取り消すことができません。</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="閉じる"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="px-5 py-5">
          <div className="rounded-[18px] border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                <AlertCircle className="size-5" />
              </div>
              <div className="space-y-2.5">
                <div className="text-lg font-semibold tracking-tight">本当に削除してもよろしいですか？</div>
                <div className="text-base text-muted-foreground">ユーザー名: {user.name}</div>
                <p className="text-sm leading-7 text-muted-foreground">
                  このユーザーに関連するすべてのデータが削除されます。この操作は元に戻せません。
                </p>
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
            className="min-w-22 rounded-2xl bg-red-600 px-5 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            削除
          </Button>
        </div>
      </div>
    </div>
  )
}
