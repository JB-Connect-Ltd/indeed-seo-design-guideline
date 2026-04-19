import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { PageIntro } from "@/components/page/page-header"
import { SectionHeading } from "@/components/page/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTaskStatusClassName } from "@/components/tasks/task-status"
import { companies, publicJobs } from "@/data/companies"
import { jobSeekers } from "@/data/job-seekers"
import { companyTasks, jobSeekerTasks, taskStatusOptions } from "@/data/tasks"

const allTasks = [...companyTasks, ...jobSeekerTasks]
const assigneeOptions = [...new Set(allTasks.map((task) => task.assignee))]
const taskTabs = [
  { key: "company", label: "企業" },
  { key: "jobSeeker", label: "求職者" },
]

function formatTaskDueDate(value) {
  return value.replace(/^\d{4}年/, "")
}

export function TaskManagementPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("company")
  const [taskStatuses, setTaskStatuses] = useState(() =>
    Object.fromEntries(allTasks.map((task) => [task.id, task.status]))
  )
  const [taskAssignees, setTaskAssignees] = useState(() =>
    Object.fromEntries(allTasks.map((task) => [task.id, task.assignee]))
  )
  const [collapsedSections, setCollapsedSections] = useState({
    overdue: false,
    today: false,
    incomplete: true,
  })
  const today = "2026-04-17"
  const getPriorityTaskCount = (tasks) => {
    const overdueCount = tasks.filter(
      (task) => task.dueDateValue < today && (taskStatuses[task.id] ?? task.status) !== "完了"
    ).length
    const todayCount = tasks.filter((task) => task.dueDateValue === today).length

    return overdueCount + todayCount
  }
  const taskTabCounts = {
    company: getPriorityTaskCount(companyTasks),
    jobSeeker: getPriorityTaskCount(jobSeekerTasks),
  }
  const sourceTasks = activeTab === "jobSeeker" ? jobSeekerTasks : companyTasks
  const taskRows = sourceTasks.map((task) => {
    const company = task.companyId ? companies.find((item) => item.id === task.companyId) : null
    const seeker = task.seekerId ? jobSeekers.find((item) => item.id === task.seekerId) : null
    const job = publicJobs.find((item) => item.id === task.jobId)

    return {
      ...task,
      company,
      seeker,
      job,
      status: taskStatuses[task.id] ?? task.status,
      assignee: taskAssignees[task.id] ?? task.assignee,
    }
  })
  const overdueTasks = taskRows.filter((task) => task.dueDateValue < today && task.status !== "完了")
  const todayTasks = taskRows.filter((task) => task.dueDateValue === today)
  const incompleteTasks = taskRows.filter((task) => task.dueDateValue > today && task.status !== "完了")

  return (
    <>
      <PageIntro title="タスク管理" description="企業・求職者ごとの対応タスクを管理" />
      <div className="mb-5 inline-flex rounded-2xl bg-muted p-1">
        {taskTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`ml-2 inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ${
                activeTab === tab.key
                  ? "bg-background text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {taskTabCounts[tab.key]}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <TaskSection
          title="期限切れ"
          tasks={overdueTasks}
          emptyText="期限切れのタスクはありません。"
          tone="danger"
          activeTab={activeTab}
          collapsed={collapsedSections.overdue}
          onToggleCollapsed={() =>
            setCollapsedSections((current) => ({ ...current, overdue: !current.overdue }))
          }
          navigate={navigate}
          setTaskStatuses={setTaskStatuses}
          setTaskAssignees={setTaskAssignees}
        />
        <TaskSection
          title="今日のタスク"
          tasks={todayTasks}
          emptyText="今日のタスクはありません。"
          activeTab={activeTab}
          collapsed={collapsedSections.today}
          onToggleCollapsed={() =>
            setCollapsedSections((current) => ({ ...current, today: !current.today }))
          }
          navigate={navigate}
          setTaskStatuses={setTaskStatuses}
          setTaskAssignees={setTaskAssignees}
        />
        <TaskSection
          title="未完了のタスク"
          tasks={incompleteTasks}
          emptyText="未完了のタスクはありません。"
          activeTab={activeTab}
          collapsed={collapsedSections.incomplete}
          onToggleCollapsed={() =>
            setCollapsedSections((current) => ({ ...current, incomplete: !current.incomplete }))
          }
          navigate={navigate}
          setTaskStatuses={setTaskStatuses}
          setTaskAssignees={setTaskAssignees}
        />
      </div>
    </>
  )
}

function TaskSection({
  title,
  tasks,
  emptyText,
  tone,
  activeTab,
  collapsed = false,
  onToggleCollapsed,
  navigate,
  setTaskStatuses,
  setTaskAssignees,
}) {
  const isDanger = tone === "danger"
  const isJobSeekerTab = activeTab === "jobSeeker"
  const entityHeader = isJobSeekerTab ? "求職者 / 求人" : "企業 / 求人"
  const handleRowClick = (task) => {
    if (isJobSeekerTab && task.seeker) {
      navigate(`/job-seekers/${task.seeker.id}`)
      return
    }

    if (task.company) {
      navigate(`/companies/${task.company.id}`)
    }
  }

  return (
    <Card className={`${isDanger ? "border-red-200 bg-red-50/80 shadow-sm" : "border-white/70 bg-white/90 shadow-sm"}`}>
      <CardHeader className={`${isDanger ? "border-b border-red-200" : "border-b border-border/70"}`}>
        <div className="flex items-center justify-between gap-4">
          <SectionHeading
            title={
              <span className={isDanger ? "text-red-700" : ""}>
                {title} ({tasks.length}件)
              </span>
            }
          />
          {onToggleCollapsed ? (
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-xl"
              onClick={onToggleCollapsed}
              aria-label={collapsed ? `${title}を開く` : `${title}を閉じる`}
            >
              {collapsed ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronUp className="size-4" />
              )}
            </Button>
          ) : null}
        </div>
      </CardHeader>
      {!collapsed ? (
      <CardContent className="pt-4">
      {tasks.length ? (
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[28%]">タスク</TableHead>
              <TableHead className="w-[32%]">{entityHeader}</TableHead>
              <TableHead className="w-[18%]">ステータス</TableHead>
              <TableHead className="w-[10%]">期限</TableHead>
              <TableHead className="w-[12%]">担当</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className={`cursor-pointer ${isDanger ? "hover:bg-red-100/70" : ""}`}
                onClick={() => handleRowClick(task)}
              >
                <TableCell>
                  <div className="min-w-0">
                    <div className="whitespace-normal break-words font-medium leading-6" title={task.type}>
                      {task.type}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <div
                      className="truncate font-medium"
                      title={isJobSeekerTab ? task.seeker?.name ?? "-" : task.company?.name ?? "-"}
                    >
                      {isJobSeekerTab ? task.seeker?.name ?? "-" : task.company?.name ?? "-"}
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground" title={task.job?.title ?? "-"}>
                      {task.job?.title ?? "-"}
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={(event) => event.stopPropagation()}>
                  <div className="flex min-w-0 flex-col items-start gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <Badge variant="outline" className={getTaskStatusClassName(task.status)}>
                        {task.status}
                      </Badge>
                      <Button
                        type="button"
                        variant={task.status === "完了" ? "outline" : "default"}
                        size="sm"
                        className="h-8 shrink-0 rounded-xl px-3 text-xs"
                        disabled={task.status === "完了"}
                        onClick={() =>
                          setTaskStatuses((current) => ({ ...current, [task.id]: "完了" }))
                        }
                      >
                        完了する
                      </Button>
                    </div>
                    <div className="flex min-w-0 items-center gap-2">
                      <Select
                        value={task.status}
                        onValueChange={(value) =>
                          setTaskStatuses((current) => ({ ...current, [task.id]: value }))
                        }
                      >
                      <SelectTrigger className="h-8 w-[108px] min-w-0 rounded-xl bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {taskStatusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="truncate text-xs">{formatTaskDueDate(task.dueDate)}</TableCell>
                <TableCell onClick={(event) => event.stopPropagation()}>
                  <Select
                    value={task.assignee}
                    onValueChange={(value) =>
                      setTaskAssignees((current) => ({ ...current, [task.id]: value }))
                    }
                  >
                    <SelectTrigger className="h-8 w-full min-w-0 rounded-xl bg-background text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assigneeOptions.map((assignee) => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/10 px-5 py-8 text-sm text-muted-foreground">
          {emptyText}
        </div>
      )}
      </CardContent>
      ) : null}
    </Card>
  )
}
