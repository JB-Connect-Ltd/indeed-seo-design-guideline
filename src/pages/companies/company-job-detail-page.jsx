import { BriefcaseBusiness, Building2, CalendarDays, Download, Pencil } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { DetailLayout, FormSection, InfoCard, SideActionCard } from "@/components/page/page-cards"
import { SummaryBlock, KvGrid } from "@/components/page/page-data"
import { Field, StaticSelect } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { companies, hearingConfirmationSections, hearingImagePreviews, publicJobs } from "@/data/companies"

export function CompanyJobDetailPage() {
  const { id = "1", jobId = "job-1" } = useParams()
  const company = companies.find((item) => item.id === id) ?? companies[0]
  const job = publicJobs.find((item) => item.companyId === company.id && item.id === jobId)
    ?? publicJobs.find((item) => item.companyId === company.id)
    ?? publicJobs[0]
  const badgeVariant = job.status === "募集中" ? "default" : job.status === "終了" ? "destructive" : "secondary"
  const jobStatusOptions = ["非公開", "管理者確認中", "企業確認中", "募集中", "終了"]
  const heroImage = hearingImagePreviews[0]
  const hiddenJobDetailFields = new Set([
    "掲載国/言語",
    "採用予定人数",
    "人材紹介事業（有料職業紹介事業）としての求人ですか？",
  ])
  const jobDetailSections = hearingConfirmationSections.map((section) => ({
    ...section,
    items: section.items
      .filter((item) => !hiddenJobDetailFields.has(item.label))
      .flatMap((item) =>
        item.label === "職業カテゴリー"
          ? [item, { key: "job-position-name", label: "職種名", value: job.title }]
          : [item]
      ),
  }))

  return (
    <>
      <PageIntro title="求人詳細" description="求人の詳細内容を確認できます" backTo={`/companies/${company.id}`} />
      <DetailLayout
        side={
          <div className="space-y-4">
            <SideActionCard title="求人ステータス">
              <Field label="現在のステータス">
                <StaticSelect value={job.status} options={jobStatusOptions} />
              </Field>
              <Button className="w-full rounded-2xl" size="lg">ステータスを変更する</Button>
            </SideActionCard>
          </div>
        }
      >
        <div className="space-y-4">
          <InfoCard
            title="求人情報"
            action={
              <Link
                to={`/companies/${company.id}/jobs/${job.id}/edit`}
                className={buttonVariants({ variant: "outline" })}
              >
                <Pencil className="size-4" />
                編集
              </Link>
            }
          >
            <div className="text-xl font-semibold leading-8 tracking-tight">{job.catchCopy}</div>
            <SummaryBlock
              icon={<BriefcaseBusiness className="size-5" />}
              lines={[
                { icon: <BriefcaseBusiness className="size-4" />, value: job.title },
                { icon: <Building2 className="size-4" />, value: company.name },
                { icon: <CalendarDays className="size-4" />, value: `公開日: ${job.date}` },
              ]}
              footer={<Badge variant={badgeVariant}>{job.status}</Badge>}
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              <img
                src={heroImage.src}
                alt={heroImage.name}
                className="aspect-[16/7] w-full object-cover"
              />
              <div className="flex flex-col gap-3 border-t border-border px-4 py-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  アイキャッチ画像: {heroImage.name}
                </div>
                <a
                  href={heroImage.src}
                  download={heroImage.name}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="size-4" />
                  ダウンロード
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">プロフィール</h3>
              <KvGrid
                items={[
                  { key: "job-company", label: "企業名", value: company.name },
                  { key: "job-title", label: "求人名", value: job.title },
                  { key: "job-catch-copy", label: "求人キャッチコピー", value: job.catchCopy },
                  { key: "job-status", label: "ステータス", value: job.status },
                  { key: "job-date", label: "公開日", value: job.date },
                ]}
              />
            </div>
          </InfoCard>

          {jobDetailSections.map((section) => (
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
                  <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-3">
                    <div className="truncate text-sm font-medium">{image.name}</div>
                    <a
                      href={image.src}
                      download={image.name}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-input bg-background transition hover:bg-accent hover:text-accent-foreground"
                      aria-label={`${image.name}をダウンロード`}
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </FormSection>
        </div>
      </DetailLayout>
    </>
  )
}
