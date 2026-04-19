import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { FormSection } from "@/components/page/page-cards"
import { KvGrid } from "@/components/page/page-data"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { hearingConfirmationSections, hearingImagePreviews } from "@/data/companies"

export function CompanyHearingConfirmPage() {
  const { id = "1" } = useParams()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_24%),linear-gradient(180deg,#f8f8f9_0%,#f3f5f7_100%)] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 border-b border-border px-1 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Link
              to={`/companies/${id}/hearing-form`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <ArrowLeft className="size-4" />
              フォームに戻る
            </Link>
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Indeed_SEO</div>
              <h1 className="text-2xl font-semibold tracking-tight">求人ヒアリングフォーム確認</h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                入力内容をご確認ください。問題がなければこのまま送信できます。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="size-4" />
            送信前の最終確認
          </div>
        </div>

        {hearingConfirmationSections.map((section) => (
          <FormSection key={section.title} title={section.title}>
            <KvGrid items={section.items} />
          </FormSection>
        ))}

        <FormSection title="掲載画像">
          <div className="grid gap-4 md:grid-cols-3">
            {hearingImagePreviews.map((image) => (
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

        <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">入力内容に問題がなければ送信してください。修正が必要な場合はフォームへ戻れます。</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link
              to={`/companies/${id}/hearing-form`}
              className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-2xl" })}
            >
              フォームを修正する
            </Link>
            <Button size="lg" className="rounded-2xl">この内容で送信する</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
