import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { FormSection } from "@/components/page/page-cards"
import { KvGrid } from "@/components/page/page-data"
import { Field } from "@/components/page/page-forms"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { secondaryScreeningSections } from "@/data/companies"

const draftStorageKey = "secondaryScreeningFormDraft"

function buildInitialFormData() {
  return {
    motivation: "",
    contribution: "",
    futureVision: "",
    consent: false,
  }
}

function buildCompanyInfoItems() {
  return secondaryScreeningSections.find((section) => section.title === "企業情報")?.items ?? []
}

export function SecondaryScreeningFormPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const companyInfoItems = useMemo(() => buildCompanyInfoItems(), [])
  const [formData, setFormData] = useState(() => {
    if (location.state?.formData) {
      return location.state.formData
    }

    if (typeof window !== "undefined") {
      const savedDraft = window.localStorage.getItem(draftStorageKey)

      if (savedDraft) {
        try {
          return { ...buildInitialFormData(), ...JSON.parse(savedDraft) }
        } catch {
          return buildInitialFormData()
        }
      }
    }

    return buildInitialFormData()
  })
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    if (!savedMessage) {
      return undefined
    }

    const timer = window.setTimeout(() => setSavedMessage(""), 2500)

    return () => window.clearTimeout(timer)
  }, [savedMessage])

  const updateField = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  const saveDraft = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(draftStorageKey, JSON.stringify(formData))
    }

    setSavedMessage("下書きを保存しました。")
  }

  const goToConfirm = () => {
    navigate("/secondary-screening-form/confirm", {
      state: {
        formData,
      },
    })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_24%),linear-gradient(180deg,#f8f8f9_0%,#f3f5f7_100%)] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-3 px-1">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">ROOTSTACK</div>
          <h1 className="text-4xl font-semibold tracking-tight">二次書類審査フォーム</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            求職者向けの共通二次書類審査フォームです。各質問へ回答し、同意内容をご確認ください。
          </p>
        </div>

        <FormSection title="企業情報">
          <KvGrid items={companyInfoItems} />
        </FormSection>

        <FormSection title="二次書類審査内容">
          <div className="grid gap-5">
            <Field label="当企業に応募する理由を教えてください。" required>
              <Textarea
                className="min-h-32 rounded-2xl bg-background"
                value={formData.motivation}
                onChange={(event) => updateField("motivation", event.target.value)}
                placeholder="回答を入力してください"
              />
            </Field>
            <Field label="自分自身をどの様に当企業へ貢献できますか。" required>
              <Textarea
                className="min-h-32 rounded-2xl bg-background"
                value={formData.contribution}
                onChange={(event) => updateField("contribution", event.target.value)}
                placeholder="回答を入力してください"
              />
            </Field>
            <Field label="当企業に将来にどのような姿になりますでしょうか。" required>
              <Textarea
                className="min-h-32 rounded-2xl bg-background"
                value={formData.futureVision}
                onChange={(event) => updateField("futureVision", event.target.value)}
                placeholder="回答を入力してください"
              />
            </Field>
          </div>
        </FormSection>

        <FormSection title="同意事項">
          <Field label="同意事項" required>
            <Label className="flex items-start gap-3 rounded-2xl border border-border bg-muted/20 px-4 py-4 text-sm font-medium leading-7">
              <Checkbox
                checked={formData.consent}
                onCheckedChange={(checked) => updateField("consent", Boolean(checked))}
                className="mt-1"
              />
              <span>
                求職者情報をシステムに保持すること、および求職者が新しい勤め先をすばやく見つけられるよう、
                求職者情報を他の企業へ紹介することに同意します。
              </span>
            </Label>
          </Field>
        </FormSection>

        <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {savedMessage || "入力内容をご確認のうえ送信してください。"}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Button variant="outline" size="lg" className="rounded-2xl" onClick={saveDraft}>
              下書き保存
            </Button>
            <Button size="lg" className="rounded-2xl" onClick={goToConfirm} disabled={!formData.consent}>
              確認画面へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SecondaryScreeningFormConfirmPage() {
  const location = useLocation()
  const formData = location.state?.formData ?? buildInitialFormData()
  const companyInfoItems = useMemo(() => buildCompanyInfoItems(), [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_24%),linear-gradient(180deg,#f8f8f9_0%,#f3f5f7_100%)] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 border-b border-border px-1 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Link
              to="/secondary-screening-form"
              state={{ formData }}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <ArrowLeft className="size-4" />
              フォームに戻る
            </Link>
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">ROOTSTACK</div>
              <h1 className="text-2xl font-semibold tracking-tight">二次書類審査フォーム確認</h1>
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

        <FormSection title="企業情報">
          <KvGrid items={companyInfoItems} />
        </FormSection>

        <FormSection title="二次書類審査内容">
          <KvGrid
            items={[
              { label: "当企業に応募する理由を教えてください。", value: formData.motivation || "未入力" },
              { label: "自分自身をどの様に当企業へ貢献できますか。", value: formData.contribution || "未入力" },
              { label: "当企業に将来にどのような姿になりますでしょうか。", value: formData.futureVision || "未入力" },
            ]}
          />
        </FormSection>

        <FormSection title="同意事項">
          <KvGrid
            items={[
              {
                label: "チェック項目",
                value: formData.consent
                  ? "☑ 求職者情報をシステムに保持すること、および求職者情報を他の企業へ紹介することに同意します。"
                  : "☐ 同意未選択",
              },
            ]}
          />
        </FormSection>

        <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">入力内容に問題がなければ送信してください。修正が必要な場合はフォームへ戻れます。</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link
              to="/secondary-screening-form"
              state={{ formData }}
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
