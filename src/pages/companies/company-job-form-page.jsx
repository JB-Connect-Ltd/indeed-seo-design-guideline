import { BriefcaseBusiness, Building2, CalendarDays, ImagePlus } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import { DeleteConfirmDialog, DeleteIconButton } from "@/components/page/delete-actions"
import { DetailLayout, FormSection, InfoCard } from "@/components/page/page-cards"
import { SummaryBlock } from "@/components/page/page-data"
import { Field, StaticSelect } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { companies, hearingConfirmationSections, hearingImagePreviews, publicJobs } from "@/data/companies"

const jobStatusOptions = ["非公開", "管理者確認中", "企業確認中", "募集中", "終了"]

const selectOptionsByLabel = {
  "職業カテゴリー": ["営業", "企画/マーケティング/カスタマーサクセス/サポート", "コーポレートスタッフ", "不動産専門職", "IT"],
  "雇用形態": ["正社員", "アルバイト・パート", "派遣社員", "契約社員", "業務委託", "インターン", "新卒", "ボランティア"],
  "採用予定人数": ["1名", "2名", "3名", "4名", "5名", "6名", "7名", "8名", "9名", "10名", "11人以上", "常時募集"],
  "人材紹介事業（有料職業紹介事業）としての求人ですか？": ["はい", "いいえ"],
  "転勤・出向": ["転勤なし", "転勤あり", "出向あり"],
  "給与形態": ["時給", "日給", "週給", "月給", "年俸"],
  "試用期間": ["あり", "なし"],
  "試用期間中の労働条件": ["同条件", "異なる"],
  "年齢制限": ["制限なし", "45歳以下"],
  "性別制限": ["制限なし", "男性限定", "女性限定"],
}

const textareaLabels = new Set([
  "企業情報",
  "勤務地の補足",
  "就業時間・曜日",
  "給与の補足",
  "試用期間中の労働時間",
  "その他（雇用形態や手当など）",
  "休日",
  "待遇・福利厚生",
  "求める人材",
  "不採用条件",
  "アピールポイント",
  "仕事内容",
  "その他",
])

function buildEditableSections(job) {
  return hearingConfirmationSections.map((section) => ({
    ...section,
    items: section.items.flatMap((item) =>
      item.label === "職業カテゴリー"
        ? [item, { key: "job-position-name", label: "職種名", value: job.title }]
        : [item]
    ),
  }))
}

function EditableHearingField({ item }) {
  const options = selectOptionsByLabel[item.label]

  if (options) {
    return (
      <Field label={item.label}>
        <StaticSelect value={item.value} options={options.includes(item.value) ? options : [item.value, ...options]} />
      </Field>
    )
  }

  if (textareaLabels.has(item.label) || String(item.value).length > 42) {
    return (
      <Field label={item.label}>
        <Textarea className="min-h-28 rounded-2xl bg-background" defaultValue={item.value} />
      </Field>
    )
  }

  return (
    <Field label={item.label}>
      <Input className="h-12 rounded-2xl bg-background" defaultValue={item.value} />
    </Field>
  )
}

export function CompanyJobEditPage() {
  const { id = "1", jobId = "job-1" } = useParams()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const company = companies.find((item) => item.id === id) ?? companies[0]
  const job = publicJobs.find((item) => item.companyId === company.id && item.id === jobId)
    ?? publicJobs.find((item) => item.companyId === company.id)
    ?? publicJobs[0]
  const cancelTo = `/companies/${company.id}/jobs/${job.id}`
  const editableSections = buildEditableSections(job)
  const heroImage = hearingImagePreviews[0]

  return (
    <>
      <PageIntro title="求人管理" description="求人データの編集" backTo={cancelTo} />
      <DetailLayout>
        <div className="space-y-4">
          <InfoCard title="求人編集">
            <SummaryBlock
              icon={<BriefcaseBusiness className="size-5" />}
              lines={[
                { icon: <BriefcaseBusiness className="size-4" />, value: job.title },
                { icon: <Building2 className="size-4" />, value: company.name },
                { icon: <CalendarDays className="size-4" />, value: `公開日: ${job.date}` },
              ]}
              footer={<Badge variant={job.status === "募集中" ? "default" : job.status === "終了" ? "destructive" : "secondary"}>{job.status}</Badge>}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="求人名" required>
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={job.title} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="求人キャッチコピー" required>
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={job.catchCopy} />
                </Field>
              </div>
              <Field label="企業名">
                <Input className="h-12 rounded-2xl bg-muted/40" value={company.name} readOnly />
              </Field>
              <Field label="ステータス" required>
                <StaticSelect value={job.status} options={jobStatusOptions} />
              </Field>
              <Field label="公開日">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={job.date} />
              </Field>
            </div>
          </InfoCard>

          <FormSection title="アイキャッチ画像">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
              <Field label="画像を変更">
                <Input className="h-12 rounded-2xl bg-background file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium" type="file" accept="image/*" />
              </Field>
              <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <img src={heroImage.src} alt={heroImage.name} className="aspect-[16/9] w-full object-cover" />
                <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-3">
                  <span className="truncate text-sm font-medium">{heroImage.name}</span>
                  <DeleteIconButton
                    label={`${heroImage.name}を削除`}
                    onClick={() => setDeleteTarget({ title: "アイキャッチ画像を削除", itemName: heroImage.name })}
                  />
                </div>
              </div>
            </div>
          </FormSection>

          {editableSections.map((section) => (
            <FormSection key={section.title} title={section.title}>
              <div className="grid gap-5 md:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.key ?? item.label} className={textareaLabels.has(item.label) || String(item.value).length > 42 ? "md:col-span-2" : ""}>
                    <EditableHearingField item={item} />
                  </div>
                ))}
              </div>
            </FormSection>
          ))}

          <FormSection title="掲載画像">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" className="rounded-2xl">
                  <ImagePlus className="size-4" />
                  画像を追加
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {hearingImagePreviews.map((image) => (
                  <div key={image.name} className="overflow-hidden rounded-2xl border border-border bg-white">
                    <img src={image.src} alt={image.name} className="aspect-[4/3] w-full object-cover" />
                    <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-3">
                      <span className="truncate text-sm font-medium">{image.name}</span>
                      <DeleteIconButton
                        label={`${image.name}を削除`}
                        onClick={() => setDeleteTarget({ title: "掲載画像を削除", itemName: image.name })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm md:flex-row md:justify-end">
            <Link
              to={cancelTo}
              className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-2xl md:min-w-40" })}
            >
              キャンセル
            </Link>
            <Button className="rounded-2xl md:min-w-52" size="lg">保存する</Button>
          </div>
        </div>
      </DetailLayout>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
        title={deleteTarget?.title}
        itemName={deleteTarget?.itemName}
        description="この画像を削除します。この操作は元に戻せません。"
      />
    </>
  )
}
