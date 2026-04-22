import { ChevronDown, ChevronUp, Mail, Pencil, User } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Button, buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DetailLayout, InfoCard, SideActionCard } from "@/components/page/page-cards"
import { SummaryBlock, KvGrid } from "@/components/page/page-data"
import { Field, StaticSelect } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { TaskAlertCard } from "@/components/tasks/task-alert-card"
import { companies, publicJobs } from "@/data/companies"
import { applicationStatusOptions, jobSeekers, jobSeekerStatusOptions, memoHistory } from "@/data/job-seekers"
import { jobSeekerTasks } from "@/data/tasks"

export function JobSeekerDetailPage() {
  const navigate = useNavigate()
  const { id = "1" } = useParams()
  const seeker = jobSeekers.find((item) => item.id === id) ?? jobSeekers[0]
  const [showAllMemos, setShowAllMemos] = useState(false)
  const visibleMemos = showAllMemos ? memoHistory : memoHistory.slice(0, 1)
  const appliedJobs = publicJobs.filter((job) => seeker.appliedJobIds?.includes(job.id))
  const seekerTaskAlerts = jobSeekerTasks.filter((task) => task.seekerId === seeker.id)
  const [applicationStatuses, setApplicationStatuses] = useState(() =>
    Object.fromEntries(
      (seeker.appliedJobIds ?? []).map((jobId) => [
        jobId,
        seeker.applicationStatuses?.[jobId] ?? "未対応",
      ])
    )
  )
  const getCompanyName = (companyId) => companies.find((company) => company.id === companyId)?.name ?? "-"
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
                  { label: "郵便番号", value: seeker.postalCode },
                  { label: "住所", value: seeker.address },
                  { label: "電話番号", value: seeker.phone },
                  { label: "メールアドレス", value: seeker.email },
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
                    className="grid gap-4 rounded-2xl border border-border bg-muted/10 p-4 transition hover:bg-muted/20 md:grid-cols-[1fr_auto] md:items-center"
                    onClick={() => navigate(`/companies/${job.companyId}/jobs/${job.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        navigate(`/companies/${job.companyId}/jobs/${job.id}`)
                      }
                    }}
                  >
                    <div>
                      <div className="font-semibold">{job.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{getCompanyName(job.companyId)}</div>
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
    </>
  )
}
