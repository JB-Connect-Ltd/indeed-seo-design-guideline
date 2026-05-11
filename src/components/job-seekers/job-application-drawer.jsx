import { X } from "lucide-react"

import { FormSection } from "@/components/page/page-cards"
import { KvGrid } from "@/components/page/page-data"
import { StatusBadge } from "@/components/page/page-lists"
import { Button } from "@/components/ui/button"

export function JobApplicationDrawer({
  open,
  onClose,
  job,
  companyName,
  interviewSchedule,
  screeningAnswers,
  consentText,
  onReschedule,
}) {
  if (!open || !job) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-[1px]" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-[760px] flex-col border-l border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="text-xl font-semibold tracking-tight">{job.title}の応募詳細</div>
            <p className="mt-2 text-sm text-muted-foreground">応募求人に紐づく面接日程と二次書類審査の内容を確認できます。</p>
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
          <FormSection title="求人情報">
            <KvGrid
              items={[
                { label: "企業名", value: companyName },
                { label: "求人名", value: job.title },
                { label: "職種", value: job.jobType ?? "-" },
                { label: "雇用形態", value: job.employmentType ?? "-" },
              ]}
            />
          </FormSection>

          <FormSection title="一次面接日程内容">
            <div className="space-y-4">
              <KvGrid
                items={[
                  {
                    label: "面接日程調整状況",
                    value: <StatusBadge value={interviewSchedule?.status ?? "未送信"} />,
                  },
                  {
                    label: "面接日",
                    value:
                      interviewSchedule?.status === "日程確定"
                        ? interviewSchedule?.confirmedAt ?? "未設定"
                        : "未設定",
                  },
                ]}
              />
              <Button variant="outline" className="w-full rounded-2xl" onClick={onReschedule}>
                日程を再調整する
              </Button>
            </div>
          </FormSection>

          <FormSection title="二次書類審査内容">
            <KvGrid
              items={[
                ...screeningAnswers.map((item, index) => ({
                  key: `screening-answer-${index}`,
                  label: item.question,
                  value: item.answer,
                })),
                {
                  key: "screening-consent",
                  label: "同意事項",
                  value: consentText,
                },
              ]}
            />
          </FormSection>
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
