import { Building2, Copy, ExternalLink, Eye, FileText, Mail, Pencil } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { HearingFormSendDialog } from "@/components/companies/hearing-form-send-dialog"
import { HearingNoteDrawer } from "@/components/companies/hearing-note-drawer"
import { DeleteConfirmDialog, DeleteIconButton } from "@/components/page/delete-actions"
import { StatusBadge } from "@/components/page/page-lists"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DetailLayout, InfoCard } from "@/components/page/page-cards"
import { SummaryBlock, KvGrid } from "@/components/page/page-data"
import { PageIntro } from "@/components/page/page-header"
import { TaskAlertCard } from "@/components/tasks/task-alert-card"
import { aiInputOutputItems, companies, hearingConfirmationSections, hearingImagePreviews, publicJobs, secondaryScreeningSections } from "@/data/companies"
import { jobSeekers } from "@/data/job-seekers"
import { companyTasks } from "@/data/tasks"

export function CompanyDetailPage() {
  const navigate = useNavigate()
  const { id = "1" } = useParams()
  const company = companies.find((item) => item.id === id) ?? companies[0]
  const [selectedHearingJob, setSelectedHearingJob] = useState(null)
  const [isSecondaryDrawerOpen, setIsSecondaryDrawerOpen] = useState(false)
  const [selectedAiItem, setSelectedAiItem] = useState(null)
  const [sendDialogTarget, setSendDialogTarget] = useState(null)
  const [deleteDialogTarget, setDeleteDialogTarget] = useState(null)
  const [jobStatuses, setJobStatuses] = useState(() =>
    Object.fromEntries(publicJobs.map((job) => [job.id, job.status]))
  )
  const [hearingNoteStatuses, setHearingNoteStatuses] = useState({
    "job-1": "返信受領",
    "job-2": "送信済み",
    "job-3": "下書き保存",
    "job-4": "未送信",
    "job-5": "未送信",
  })
  const applicants = jobSeekers.filter((item) => item.companyId === company.id)
  const jobStatusOptions = ["非公開", "管理者確認中", "企業確認中", "募集中", "終了"]
  const companyPublicJobs = publicJobs
    .filter((item) => item.companyId === company.id)
    .map((job) => ({ ...job, status: jobStatuses[job.id] ?? job.status }))
  const companyTaskAlerts = companyTasks.filter((task) => task.companyId === company.id)
  const temporaryLabel = (label) => (
    <span>
      {label} <span className="text-red-500">※暫定</span>
    </span>
  )
  const selectedAiSections = selectedAiItem
    ? [
        {
          title: "AI詳細",
          items: [
            { key: "ai-input", label: "インプット", value: selectedAiItem.input },
            { key: "ai-output", label: "アウトプット", value: selectedAiItem.output },
            { key: "ai-status", label: "ステータス", value: selectedAiItem.status },
            { key: "ai-updated-at", label: "更新日", value: selectedAiItem.updatedAt },
          ],
        },
      ]
    : []
  const getJobStatusVariant = (status) => {
    if (status === "募集中") {
      return "default"
    }

    if (status === "終了") {
      return "destructive"
    }

    return "secondary"
  }
  const hearingFormUrl = `/companies/${company.id}/hearing-form`
  const openSendDialog = (target) => setSendDialogTarget(target)
  const closeSendDialog = () => setSendDialogTarget(null)
  const getHearingNoteStatusVariant = (status) => {
    if (status === "返信受領") {
      return "default"
    }

    if (status === "送信済み") {
      return "secondary"
    }

    return "outline"
  }
  const confirmSendHearingForm = () => {
    if (sendDialogTarget?.jobId) {
      setHearingNoteStatuses((current) => ({
        ...current,
        [sendDialogTarget.jobId]: "送信済み",
      }))
    }

    closeSendDialog()
  }

  return (
    <>
      <PageIntro title="企業管理" description="企業情報の詳細表示と管理" backTo="/companies" />
      <div className="mb-4">
        <TaskAlertCard
          tasks={companyTaskAlerts}
          getTargetLabel={(task) => publicJobs.find((job) => job.id === task.jobId)?.title ?? ""}
        />
      </div>
      <DetailLayout>
        <div className="min-w-0 space-y-4">
          <InfoCard
            title="企業情報"
            action={
              <Link to={`/companies/${company.id}/edit`} className={buttonVariants({ variant: "outline" })}>
                <Pencil className="size-4" />
                編集
              </Link>
            }
          >
            <SummaryBlock
              icon={<Building2 className="size-5" />}
              lines={[
                { icon: <Building2 className="size-4" />, value: company.name },
                { icon: <span>☎</span>, value: company.phone },
                { icon: <Mail className="size-4" />, value: company.email },
              ]}
            />
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">プロフィール</h3>
              <KvGrid
                items={[
                  { key: "company-name", label: "企業名", value: company.name },
                  { key: "company-phone", label: "電話番号", value: company.phone },
                  { key: "company-email", label: "担当者メールアドレス", value: company.email },
                  { key: "company-url", label: "サイトURL", value: company.url },
                  { key: "company-contact", label: "担当者名", value: company.contactName },
                  { key: "company-airwork", label: temporaryLabel("AirWork id/pass"), value: company.airworkCredentials },
                  { key: "company-forwarding-email", label: temporaryLabel("転送元メールアドレス"), value: company.forwardingSourceEmail },
                  { key: "company-qmate", label: temporaryLabel("Qmate企業 id"), value: company.qmateCompanyId },
                  { key: "company-timerex", label: temporaryLabel("Timerex"), value: company.timerex },
                  { key: "company-created-at", label: "登録日", value: company.createdAt },
                  { key: "company-address", label: "住所", value: company.address },
                  { key: "company-notes", label: "備考", value: company.notes },
                ]}
              />
            </div>
          </InfoCard>

          <InfoCard title="ヒアリングノート">
            <div className="space-y-4">
              <div className="rounded-3xl border border-foreground/15 bg-gradient-to-br from-white to-muted/30 p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                      <FileText className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-semibold">新規ヒアリングフォーム</div>
                      <div className="mt-1 text-sm leading-6 text-muted-foreground">
                        企業担当者にヒアリングフォームURLを送信し、URL先のフォームに入力してもらいます。
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:w-72 md:shrink-0">
                    <a
                      href={`/companies/${company.id}/hearing-form`}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: "outline", className: "rounded-2xl" })}
                      onClick={() => window.localStorage.removeItem("hearingFormPrefillNoteId")}
                    >
                      フォームURLをプレビューする
                      <ExternalLink className="size-4" />
                    </a>
                    <Button
                      className="rounded-2xl"
                      onClick={() => {
                        window.localStorage.removeItem("hearingFormPrefillNoteId")
                        openSendDialog({
                          label: "新規ヒアリングフォーム",
                          email: company.email,
                          url: hearingFormUrl,
                        })
                      }}
                    >
                      フォームURLを送信する
                    </Button>
                  </div>
                </div>
              </div>
              {companyPublicJobs.length ? (
                <div className="space-y-3">
                  {companyPublicJobs.map((job) => (
                    <div
                      key={job.id}
                      role="button"
                      tabIndex={0}
                      className="grid cursor-pointer gap-3 rounded-2xl border border-border bg-muted/10 px-4 py-3 text-left transition hover:bg-muted/20 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center"
                      onClick={() => setSelectedHearingJob(job)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          setSelectedHearingJob(job)
                        }
                      }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-border">
                          <FileText className="size-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <div className="min-w-0 max-w-full truncate font-semibold" title={job.title}>{job.title}</div>
                            <Badge variant={getHearingNoteStatusVariant(hearingNoteStatuses[job.id] ?? "未送信")}>
                              {hearingNoteStatuses[job.id] ?? "未送信"}
                            </Badge>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">登録日 {job.date}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                        <span className="text-sm font-medium text-muted-foreground">開く</span>
                        <a
                          href={`/companies/${company.id}/hearing-form`}
                          target="_blank"
                          rel="noreferrer"
                          className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-xl" })}
                          onClick={(event) => {
                            event.stopPropagation()
                            window.localStorage.setItem("hearingFormPrefillNoteId", job.id)
                          }}
                        >
                          フォームURLプレビュー
                          <ExternalLink className="size-3.5" />
                        </a>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={(event) => {
                            event.stopPropagation()
                            window.localStorage.setItem("hearingFormPrefillNoteId", job.id)
                            openSendDialog({
                              label: `${job.title}のヒアリングフォーム`,
                              jobId: job.id,
                              email: company.email,
                              url: hearingFormUrl,
                            })
                          }}
                        >
                          企業へ送信
                        </Button>
                        <button
                          type="button"
                          className={buttonVariants({ variant: "outline", size: "icon-sm", className: "rounded-xl" })}
                          onClick={(event) => event.stopPropagation()}
                          aria-label={`${job.title}のヒアリングノートを複製`}
                        >
                          <Copy className="size-4" />
                        </button>
                        <DeleteIconButton
                          label={`${job.title}のヒアリングノートを削除`}
                          onClick={(event) => {
                            event.stopPropagation()
                            setDeleteDialogTarget({
                              title: "ヒアリングノートを削除",
                              itemName: job.title,
                              description: "このヒアリングノートを削除します。この操作は元に戻せません。",
                            })
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-muted/10 px-5 py-8 text-sm text-muted-foreground">
                  ヒアリングノートはありません。
                </div>
              )}
            </div>
          </InfoCard>

          <InfoCard title={<span>【AI】インプット・アウトプット一覧 <span className="text-red-500">※暫定</span></span>}>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[36%]">インプット</TableHead>
                  <TableHead className="w-[36%]">アウトプット</TableHead>
                  <TableHead className="w-[18%]">ステータス</TableHead>
                  <TableHead className="w-[10%]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiInputOutputItems.map((item, index) => (
                  <TableRow
                    key={`${item.input}-${index}`}
                    className="cursor-pointer"
                    onClick={() => setSelectedAiItem(item)}
                  >
                    <TableCell>
                      <div className="truncate text-sm" title={item.input}>{item.input}</div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate text-sm" title={item.output}>{item.output}</div>
                    </TableCell>
                    <TableCell className="pr-1">
                      <Badge variant={item.status === "求人データ作成済み" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-0">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          className="rounded-xl"
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelectedAiItem(item)
                          }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          className="rounded-xl"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfoCard>

          <InfoCard title={<span>二次書類審査フォーム <span className="text-red-500">※暫定</span></span>}>
            <div className="space-y-4">
              <div className="rounded-3xl border border-foreground/15 bg-gradient-to-br from-white to-muted/30 p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        二次書類審査フォーム作成 <span className="text-red-500">※暫定</span>
                      </div>
                      <div className="mt-1 text-sm leading-6 text-muted-foreground">
                        ヒアリング内容をもとに、二次書類審査フォームを作成します。
                      </div>
                    </div>
                  </div>
                  <Button className="rounded-2xl md:min-w-72" size="lg">
                    二次書類審査フォームを作成する
                  </Button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSecondaryDrawerOpen(true)}
                className="flex w-full items-center justify-between rounded-2xl border border-border bg-muted/10 px-5 py-4 text-left transition hover:bg-muted/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white ring-1 ring-border">
                    <FileText className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">二次書類審査フォーム内容を確認する</div>
                    <div className="text-sm text-muted-foreground">右サイド画面で作成内容を確認できます</div>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">開く</span>
              </button>
              <KvGrid
                items={[
                  { key: "secondary-created-at", label: "登録日", value: company.secondaryFormCreatedAt },
                  { key: "secondary-updated-at", label: "更新日", value: company.secondaryFormUpdatedAt },
                ]}
              />
            </div>
          </InfoCard>

          <InfoCard title={`応募者一覧 (${applicants.length}件)`}>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[18%]">氏名</TableHead>
                  <TableHead className="w-[18%]">電話番号</TableHead>
                  <TableHead className="w-[18%]">応募日</TableHead>
                  <TableHead className="w-[20%]">面接日時</TableHead>
                  <TableHead className="w-[16%]">ステータス</TableHead>
                  <TableHead className="w-[10%]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow
                    key={applicant.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/job-seekers/${applicant.id}`)}
                  >
                    <TableCell className="truncate font-medium" title={applicant.name}>{applicant.name}</TableCell>
                    <TableCell className="truncate">{applicant.phone}</TableCell>
                    <TableCell className="truncate">{applicant.createdAt}</TableCell>
                    <TableCell className="truncate">{applicant.interviewAt}</TableCell>
                    <TableCell><StatusBadge value={applicant.status} /></TableCell>
                    <TableCell>
                      <Link
                        to={`/job-seekers/${applicant.id}`}
                        onClick={(event) => event.stopPropagation()}
                        className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                      >
                        <Eye className="size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfoCard>

          <InfoCard title="求人一覧">
            {companyPublicJobs.length ? (
              <div className="space-y-3">
                {companyPublicJobs.map((job) => (
                  <div
                    key={job.id}
                    className="grid cursor-pointer gap-4 rounded-2xl border border-border bg-muted/10 p-4 transition hover:bg-muted/20 md:grid-cols-[1fr_auto] md:items-center"
                    onClick={() => navigate(`/companies/${company.id}/jobs/${job.id}`)}
                  >
                    <div className="min-w-0">
                      <div className="truncate font-semibold" title={job.title}>{job.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{job.detail}</div>
                    </div>
                    <div
                      className="space-y-2 text-sm md:min-w-52 md:text-right"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center justify-start gap-2 md:justify-end">
                        <span className="text-xs font-semibold text-muted-foreground">ステータス</span>
                        <Badge variant={getJobStatusVariant(job.status)}>{job.status}</Badge>
                      </div>
                      <Select
                        value={job.status}
                        onValueChange={(value) =>
                          setJobStatuses((current) => ({ ...current, [job.id]: value }))
                        }
                      >
                        <SelectTrigger className="h-10 rounded-xl bg-background md:ml-auto md:w-44">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {jobStatusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-muted-foreground">公開日 {job.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/10 px-5 py-8 text-sm text-muted-foreground">
                求人はありません。
              </div>
            )}
          </InfoCard>
        </div>
      </DetailLayout>
      <HearingNoteDrawer
        open={Boolean(selectedHearingJob)}
        onClose={() => setSelectedHearingJob(null)}
        sections={hearingConfirmationSections}
        images={hearingImagePreviews}
        title={selectedHearingJob ? `${selectedHearingJob.title}のヒアリング内容` : "ヒアリング内容"}
        description="求人ごとのヒアリングフォーム入力内容を確認できます。"
      />
      <HearingNoteDrawer
        open={isSecondaryDrawerOpen}
        onClose={() => setIsSecondaryDrawerOpen(false)}
        sections={secondaryScreeningSections}
        images={[]}
        title="二次書類審査フォーム内容 ※暫定"
        description="作成された二次書類審査フォームの内容を確認できます。"
      />
      <HearingNoteDrawer
        open={Boolean(selectedAiItem)}
        onClose={() => setSelectedAiItem(null)}
        sections={selectedAiSections}
        images={[]}
        title="【AI】インプット・アウトプット詳細 ※暫定"
        description="選択したAI処理のインプットとアウトプットを確認できます。"
      />
      <HearingFormSendDialog
        open={Boolean(sendDialogTarget)}
        onClose={closeSendDialog}
        onConfirm={confirmSendHearingForm}
        target={sendDialogTarget}
      />
      <DeleteConfirmDialog
        open={Boolean(deleteDialogTarget)}
        onClose={() => setDeleteDialogTarget(null)}
        onConfirm={() => setDeleteDialogTarget(null)}
        title={deleteDialogTarget?.title}
        itemName={deleteDialogTarget?.itemName}
        description={deleteDialogTarget?.description}
      />
    </>
  )
}
