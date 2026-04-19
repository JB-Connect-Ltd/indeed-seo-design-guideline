import { Building2, Users, X } from "lucide-react"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { InfoCard } from "@/components/page/page-cards"
import { PageIntro } from "@/components/page/page-header"
import { StatusBadge } from "@/components/page/page-lists"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { companies, publicJobs } from "@/data/companies"
import { jobSeekers, jobSeekerStatusOptions } from "@/data/job-seekers"

const callTargetSeekers = jobSeekers.filter(
  (seeker) => seeker.appliedJobIds?.length && seeker.status !== "電話連絡済み"
)
const buildCallTargetRows = () =>
  callTargetSeekers.flatMap((seeker) =>
    (seeker.appliedJobIds ?? []).map((jobId) => {
      const job = publicJobs.find((item) => item.id === jobId)
      const company = companies.find((item) => item.id === job?.companyId)

      return {
        key: `${seeker.id}-${jobId}`,
        seeker,
        job,
        company,
        applicationStatus: seeker.applicationStatuses?.[jobId] ?? "未対応",
      }
    })
  )

export function DashboardPage() {
  const navigate = useNavigate()
  const seekerSectionRef = useRef(null)
  const companySectionRef = useRef(null)
  const callTargetRows = buildCallTargetRows()
  const callTargetCompanyRows = callTargetRows.filter((row) => row.seeker.interviewAt !== "未設定")
  const callTargetCompanyIds = new Set(
    callTargetCompanyRows.map((row) => row.company?.id).filter(Boolean)
  )
  const metrics = [
    { label: "架電対象求職者", value: `${callTargetSeekers.length}件`, icon: Users, target: "seekers" },
    { label: "架電対象企業", value: `${callTargetCompanyIds.size}件`, icon: Building2, target: "companies" },
  ]
  const [seekerStatuses, setSeekerStatuses] = useState(() =>
    Object.fromEntries(callTargetSeekers.map((seeker) => [seeker.id, seeker.status]))
  )
  const [memos, setMemos] = useState(() =>
    Object.fromEntries(callTargetSeekers.map((seeker) => [seeker.id, seeker.memo]))
  )
  const [editingContact, setEditingContact] = useState(null)
  const scrollToSection = (target) => {
    const section = target === "companies" ? companySectionRef.current : seekerSectionRef.current

    section?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const openContactEditDialog = (seeker) => {
    setEditingContact({
      id: seeker.id,
      name: seeker.name,
      status: seekerStatuses[seeker.id] ?? seeker.status,
      memo: memos[seeker.id] ?? seeker.memo,
    })
  }
  const closeContactEditDialog = () => setEditingContact(null)
  const saveContactEdit = () => {
    if (!editingContact) {
      return
    }

    setSeekerStatuses((current) => ({ ...current, [editingContact.id]: editingContact.status }))
    setMemos((current) => ({ ...current, [editingContact.id]: editingContact.memo }))
    closeContactEditDialog()
  }

  return (
    <>
      <PageIntro title="ダッシュボード" description="管理状況の概要を確認できます" />
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 xl:max-w-2xl">
          {metrics.map((metric) => {
            const Icon = metric.icon

            return (
              <button
                key={metric.label}
                type="button"
                onClick={() => scrollToSection(metric.target)}
                className="rounded-3xl border border-border bg-white/90 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-base font-semibold tracking-tight">{metric.label}</h2>
                  <Icon className="size-5 text-muted-foreground" />
                </div>
                <div className="mt-10">
                  <div className="text-4xl font-semibold tracking-tight">{metric.value}</div>
                </div>
              </button>
            )
          })}
        </div>

        <div ref={seekerSectionRef} className="scroll-mt-6">
        <InfoCard title={`架電対象求職者一覧 (${callTargetRows.length}件)`}>
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[11%]">氏名</TableHead>
                <TableHead className="w-[13%]">電話番号</TableHead>
                <TableHead className="w-[17%]">応募求人</TableHead>
                <TableHead className="w-[13%]">応募日時</TableHead>
                <TableHead className="w-[17%]">求職者ステータス</TableHead>
                <TableHead className="w-[13%]">応募ステータス</TableHead>
                <TableHead className="w-[16%]">メモ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callTargetRows.map(({ key, seeker, job, applicationStatus }) => (
                <TableRow
                  key={key}
                  className="cursor-pointer"
                  onClick={() => navigate(`/job-seekers/${seeker.id}`)}
                >
                  <TableCell className="truncate font-medium" title={seeker.name}>{seeker.name}</TableCell>
                  <TableCell className="truncate text-xs">{seeker.phone}</TableCell>
                  <TableCell>
                    <HoverText value={job?.title ?? "-"} />
                  </TableCell>
                  <TableCell className="truncate text-xs">{seeker.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusBadge value={seekerStatuses[seeker.id] ?? seeker.status} />
                      <Button
                        variant="outline"
                        size="xs"
                        className="rounded-xl"
                        onClick={(event) => {
                          event.stopPropagation()
                          openContactEditDialog(seeker)
                        }}
                      >
                        変更
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="truncate">
                      <StatusBadge value={applicationStatus} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className="group relative h-9 w-full min-w-0 rounded-xl border border-border bg-muted/20 px-3 text-left text-sm transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      title={memos[seeker.id] ?? ""}
                      onClick={(event) => {
                        event.stopPropagation()
                        openContactEditDialog(seeker)
                      }}
                    >
                      <span className="block truncate">{memos[seeker.id] || "メモを追加"}</span>
                      {memos[seeker.id] ? (
                        <span className="pointer-events-none absolute right-0 bottom-[calc(100%+8px)] z-20 hidden w-80 rounded-2xl border border-border bg-white px-4 py-3 text-sm leading-6 text-foreground shadow-xl group-hover:block">
                          {memos[seeker.id]}
                        </span>
                      ) : null}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoCard>
        </div>

        <div ref={companySectionRef} className="scroll-mt-6">
        <InfoCard title={`架電対象企業一覧 (${callTargetCompanyRows.length}件)`}>
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[24%]">企業名</TableHead>
                <TableHead className="w-[16%]">電話番号</TableHead>
                <TableHead className="w-[18%]">求職者名</TableHead>
                <TableHead className="w-[18%]">面接日時</TableHead>
                <TableHead className="w-[24%]">求人</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callTargetCompanyRows.map(({ key, seeker, job, company }) => (
                <TableRow
                  key={`company-${key}`}
                  className="cursor-pointer"
                  onClick={() => company?.id && navigate(`/companies/${company.id}`)}
                >
                  <TableCell className="truncate font-medium" title={company?.name ?? "-"}>
                    {company?.name ?? "-"}
                  </TableCell>
                  <TableCell className="truncate text-xs">{company?.phone ?? "-"}</TableCell>
                  <TableCell className="truncate" title={seeker.name}>{seeker.name}</TableCell>
                  <TableCell className="truncate text-xs">{seeker.interviewAt}</TableCell>
                  <TableCell>
                    <HoverText value={job?.title ?? "-"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoCard>
        </div>
      </div>
      <ContactEditDialog
        contact={editingContact}
        onChange={setEditingContact}
        onClose={closeContactEditDialog}
        onSave={saveContactEdit}
      />
    </>
  )
}

function HoverText({ value }) {
  return (
    <span className="group relative block min-w-0">
      <span className="block truncate">{value}</span>
      {value && value !== "-" ? (
        <span className="pointer-events-none absolute left-0 bottom-[calc(100%+8px)] z-20 hidden w-96 rounded-2xl border border-border bg-white px-4 py-3 text-sm leading-6 text-foreground shadow-xl group-hover:block">
          {value}
        </span>
      ) : null}
    </span>
  )
}

function ContactEditDialog({ contact, onChange, onClose, onSave }) {
  if (!contact) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
      <div className="w-full max-w-xl rounded-[22px] border border-border bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">架電対応を更新</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              求職者ステータスとメモをまとめて更新します。
            </p>
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

        <div className="space-y-5 px-5 py-5">
          <div className="rounded-2xl border border-border bg-muted/20 px-4 py-3">
            <div className="text-xs font-semibold text-muted-foreground">対象求職者</div>
            <div className="mt-1 font-semibold">{contact.name}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-muted-foreground">求職者ステータス</div>
            <Select
              value={contact.status}
              onValueChange={(value) => onChange((current) => ({ ...current, status: value }))}
            >
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {jobSeekerStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-muted-foreground">メモ</div>
            <Textarea
              className="min-h-32 rounded-xl bg-background"
              value={contact.memo}
              onChange={(event) => onChange((current) => ({ ...current, memo: event.target.value }))}
              placeholder="架電内容や次回対応メモを入力してください"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 pb-5">
          <Button variant="outline" size="lg" className="min-w-32 rounded-2xl" onClick={onClose}>
            キャンセル
          </Button>
          <Button size="lg" className="min-w-32 rounded-2xl" onClick={onSave}>
            保存する
          </Button>
        </div>
      </div>
    </div>
  )
}
