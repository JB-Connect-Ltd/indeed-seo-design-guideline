import { CalendarDays, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function InterviewScheduleSendDialog({ open, onClose, onConfirm, target }) {
  if (!open || !target) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
      <div className="w-full max-w-xl rounded-[22px] border border-border bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">面接日程調整を連絡</h2>
            <p className="mt-2 text-sm text-muted-foreground">求職者へ面接日程調整URLを送信します。</p>
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
          <div className="rounded-[18px] border border-border bg-muted/20 p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                <CalendarDays className="size-5" />
              </div>
              <div className="space-y-3">
                <div className="text-base font-semibold tracking-tight">この日程調整URLを求職者へ送信しますか？</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>送信対象: {target.label}</div>
                  <div>送信先電話番号: {target.phone}</div>
                  <div className="break-all">URL: {target.url}</div>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  求職者はURL先から面接可能日を選択し、面接日程を調整できます。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 pb-5">
          <Button variant="outline" size="lg" className="min-w-32 rounded-2xl" onClick={onClose}>
            キャンセル
          </Button>
          <Button size="lg" className="min-w-32 rounded-2xl" onClick={onConfirm}>
            送信する
          </Button>
        </div>
      </div>
    </div>
  )
}
