import { ChevronDown, ChevronUp, ExternalLink, Mail, Pencil, User } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import { InterviewScheduleSendDialog } from "@/components/job-seekers/interview-schedule-send-dialog"
import { JobApplicationDrawer } from "@/components/job-seekers/job-application-drawer"
import { SecondaryScreeningSendDialog } from "@/components/job-seekers/secondary-screening-send-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DetailLayout, InfoCard, SideActionCard } from "@/components/page/page-cards"
import { SummaryBlock, KvGrid } from "@/components/page/page-data"
import { Field, StaticSelect } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { StatusBadge } from "@/components/page/page-lists"
import { TaskAlertCard } from "@/components/tasks/task-alert-card"
import { companies, publicJobs } from "@/data/companies"
import { applicationStatusOptions, jobSeekers, jobSeekerStatusOptions, memoHistory, secondaryScreeningAnswerSamples, secondaryScreeningConsentText } from "@/data/job-seekers"
import { jobSeekerTasks } from "@/data/tasks"

export function JobSeekerDetailPage() {
  const { id = "1" } = useParams()
  const seeker = jobSeekers.find((item) => item.id === id) ?? jobSeekers[0]
  const [showAllMemos, setShowAllMemos] = useState(false)
  const [sendDialogTarget, setSendDialogTarget] = useState(null)
  const [interviewDialogTarget, setInterviewDialogTarget] = useState(null)
  const [selectedAppliedJob, setSelectedAppliedJob] = useState(null)
  const visibleMemos = showAllMemos ? memoHistory : memoHistory.slice(0, 1)
  const appliedJobs = publicJobs.filter((job) => seeker.appliedJobIds?.includes(job.id))
  const seekerTaskAlerts = jobSeekerTasks.filter((task) => task.seekerId === seeker.id)
  const [secondaryScreeningStatuses, setSecondaryScreeningStatuses] = useState(() =>
    seeker.id === "1"
      ? {
          "job-1": "二次書類審査受領",
          "job-2": "二次書類審査送信済み",
          "job-4": "二次書類審査下書き保存",
        }
      : {}
  )
  const [interviewScheduleStatuses, setInterviewScheduleStatuses] = useState(() =>
    seeker.id === "2"
      ? {
          "job-2": { status: "送信済み" },
          "job-3": { status: "日程確定", confirmedAt: "2026年05月14日 14:00" },
          "job-4": { status: "期限切れ" },
        }
      : {}
  )
  const [applicationStatuses, setApplicationStatuses] = useState(() =>
    Object.fromEntries(
      (seeker.appliedJobIds ?? []).map((jobId) => [
        jobId,
        seeker.applicationStatuses?.[jobId] ?? "未対応",
      ])
    )
  )
  const getCompanyName = (companyId) => companies.find((company) => company.id === companyId)?.name ?? "-"
  const getCompany = (companyId) => companies.find((company) => company.id === companyId)
  const selectedApplicationAnswers = selectedAppliedJob
    ? secondaryScreeningAnswerSamples[seeker.id]?.[selectedAppliedJob.id] ?? [
        { question: "当企業に応募する理由を教えてください。", answer: "未回答" },
        { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "未回答" },
        { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "未回答" },
      ]
    : []
  const closeSendDialog = () => setSendDialogTarget(null)
  const confirmSendDialog = () => {
    if (sendDialogTarget?.jobId) {
      setSecondaryScreeningStatuses((current) => ({
        ...current,
        [sendDialogTarget.jobId]: "二次書類審査送信済み",
      }))
    }

    closeSendDialog()
  }
  const closeInterviewDialog = () => setInterviewDialogTarget(null)
  const confirmInterviewDialog = () => {
    if (interviewDialogTarget?.jobId) {
      setInterviewScheduleStatuses((current) => ({
        ...current,
        [interviewDialogTarget.jobId]: { status: "送信済み" },
      }))
    }

    closeInterviewDialog()
  }
  return (
    <>
      <PageIntro title="求職者管理" description="求職者情報の詳細表示と管理" backTo="/job-seekers" />
      <div className="mb-4">
        <TaskAlertCard
          tasks={seekerTaskAlerts}
          getTargetLabel={(task) => publicJobs.find((job) => job.id === task.jobId)?.title ?? ""}
        />
      </div>
      <DetailLayout
        side={
          <div className="space-y-4">
            <SideActionCard title="求職者ステータス">
              <Field label="現在のステータス">
                <StaticSelect value={seeker.status} options={jobSeekerStatusOptions} />
              </Field>
              <Field label="メモ">
                <Textarea placeholder="メモを追加..." className="min-h-32 rounded-xl bg-background" />
              </Field>
              <Button className="w-full">ステータスを変更する</Button>
            </SideActionCard>
            <SideActionCard title="メモ履歴">
              {visibleMemos.map((note) => (
                <div key={note.date} className="rounded-2xl border border-border bg-muted/10 p-4">
                  <div className="text-xs text-muted-foreground">{note.date} {note.author}</div>
                  <div className="mt-2 text-sm leading-7">{note.body}</div>
                </div>
              ))}
              {memoHistory.length > 1 ? (
                <Button
                  variant="ghost"
                  className="w-full justify-center rounded-2xl text-muted-foreground"
                  onClick={() => setShowAllMemos((current) => !current)}
                >
                  {showAllMemos ? (
                    <>
                      閉じる
                      <ChevronUp className="size-4" />
                    </>
                  ) : (
                    <>
                      もっと見る
                      <ChevronDown className="size-4" />
                    </>
                  )}
                </Button>
              ) : null}
            </SideActionCard>
          </div>
        }
      >
        <div className="space-y-4">
          <InfoCard
            title="求職者情報"
            action={
              <Link to={`/job-seekers/${seeker.id}/edit`} className={buttonVariants({ variant: "outline" })}>
                <Pencil className="size-4" />
                編集
              </Link>
            }
          >
            <SummaryBlock
              icon={<User className="size-5" />}
              lines={[
                { icon: <User className="size-4" />, value: seeker.name },
                { icon: <span>☎</span>, value: seeker.phone },
                { icon: <Mail className="size-4" />, value: seeker.email },
              ]}
            />
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">プロフィール</h3>
              <KvGrid
                items={[
                  { label: "名前", value: seeker.name },
                  { label: "フリガナ", value: seeker.furigana },
                  { label: "性別", value: seeker.gender },
                  { label: "電話番号", value: seeker.phone },
                  { label: "メールアドレス", value: seeker.email },
                  { label: "郵便番号", value: seeker.postalCode },
                  { label: "住所", value: seeker.address },
                  { label: "流入経路", value: seeker.source },
                  { label: "登録日", value: seeker.createdAt },
                  { label: "メモ", value: seeker.memo },
                ]}
              />
            </div>
          </InfoCard>

          <InfoCard title={`応募求人一覧 (${appliedJobs.length}件)`}>
            {appliedJobs.length ? (
              <div className="grid gap-3">
                {appliedJobs.map((job) => (
                  <div
                    key={job.id}
                    role="button"
                    tabIndex={0}
                    className="grid gap-4 rounded-2xl border border-border bg-muted/10 p-4 transition hover:bg-muted/20 md:grid-cols-[1fr_auto] md:items-start"
                    onClick={() => setSelectedAppliedJob(job)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setSelectedAppliedJob(job)
                      }
                    }}
                  >
                    <div>
                      <div className="font-semibold">{job.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{getCompanyName(job.companyId)}</div>
                      <a
                        href={`/companies/${job.companyId}/jobs/${job.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-3 rounded-xl`}
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        求人詳細を確認する
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                    <div className="flex flex-col gap-3 text-sm text-muted-foreground md:items-end">
                      <div
                        className="flex items-center gap-2"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <span className="whitespace-nowrap text-xs font-semibold text-muted-foreground">
                          応募ステータス <span className="text-red-500">※暫定</span>
                        </span>
                        <Select
                          value={applicationStatuses[job.id] ?? "未対応"}
                          onValueChange={(value) =>
                            setApplicationStatuses((current) => ({ ...current, [job.id]: value }))
                          }
                        >
                          <SelectTrigger className="h-9 w-44 rounded-xl bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {applicationStatusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>応募日 {seeker.createdAt}</div>
                      <div
                        className="flex flex-wrap items-center justify-end gap-2"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <a
                          href="/secondary-screening-form"
                          target="_blank"
                          rel="noreferrer"
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          二次書類審査フォーム
                          <ExternalLink className="size-4" />
                        </a>
                        {secondaryScreeningStatuses[job.id] ? (
                          <StatusBadge value={secondaryScreeningStatuses[job.id]} />
                        ) : (
                          <Button
                            size="sm"
                            className="rounded-xl"
                            onClick={(event) => {
                              event.stopPropagation()
                              setSendDialogTarget({
                                jobId: job.id,
                                label: `${job.title}の二次書類審査フォーム`,
                                phone: seeker.phone,
                                url: `/secondary-screening-form`,
                              })
                            }}
                          >
                            二次書類審査フォーム送信
                          </Button>
                        )}
                      </div>
                      <div
                        className="flex flex-wrap items-center justify-end gap-2"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <span className="whitespace-nowrap text-xs font-semibold text-muted-foreground">
                          面接日程調整
                        </span>
                        {interviewScheduleStatuses[job.id] ? (
                          <>
                            <StatusBadge value={interviewScheduleStatuses[job.id].status} />
                            {interviewScheduleStatuses[job.id].status === "日程確定" && interviewScheduleStatuses[job.id].confirmedAt ? (
                              <span className="text-xs font-medium text-muted-foreground">
                                確定日 {interviewScheduleStatuses[job.id].confirmedAt}
                              </span>
                            ) : null}
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="rounded-xl"
                            onClick={(event) => {
                              event.stopPropagation()
                              setInterviewDialogTarget({
                                jobId: job.id,
                                label: `${job.title}の面接日程調整`,
                                phone: seeker.phone,
                                url: getCompany(job.companyId)?.timerex ?? "/",
                              })
                            }}
                          >
                            面接日程調整を連絡
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/10 px-5 py-8 text-sm text-muted-foreground">
                応募求人はありません。
              </div>
            )}
          </InfoCard>
        </div>
      </DetailLayout>
      <SecondaryScreeningSendDialog
        open={Boolean(sendDialogTarget)}
        onClose={closeSendDialog}
        onConfirm={confirmSendDialog}
        target={sendDialogTarget}
      />
      <InterviewScheduleSendDialog
        open={Boolean(interviewDialogTarget)}
        onClose={closeInterviewDialog}
        onConfirm={confirmInterviewDialog}
        target={interviewDialogTarget}
      />
      <JobApplicationDrawer
        open={Boolean(selectedAppliedJob)}
        onClose={() => setSelectedAppliedJob(null)}
        job={selectedAppliedJob}
        companyName={selectedAppliedJob ? getCompanyName(selectedAppliedJob.companyId) : ""}
        interviewSchedule={selectedAppliedJob ? interviewScheduleStatuses[selectedAppliedJob.id] : null}
        screeningAnswers={selectedApplicationAnswers}
        consentText={secondaryScreeningConsentText}
        onReschedule={() => {
          if (!selectedAppliedJob) {
            return
          }

          setInterviewDialogTarget({
            jobId: selectedAppliedJob.id,
            label: `${selectedAppliedJob.title}の面接日程調整`,
            phone: seeker.phone,
            url: getCompany(selectedAppliedJob.companyId)?.timerex ?? "/",
          })
        }}
      />
    </>
  )
}
