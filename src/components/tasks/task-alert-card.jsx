import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { SectionHeading } from "@/components/page/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTaskStatusClassName } from "@/components/tasks/task-status"
import { taskStatusOptions } from "@/data/tasks"

const today = "2026-04-17"

function formatDueDate(value) {
  return value.replace(/^\d{4}年/, "")
}

function getDueLabel(task) {
  if (task.dueDateValue < today) {
    return { text: "期限切れ", className: "border-red-200 bg-red-50 text-red-700" }
  }

  if (task.dueDateValue === today) {
    return { text: "今日", className: "border-amber-200 bg-amber-50 text-amber-700" }
  }

  return { text: "予定", className: "border-slate-200 bg-slate-50 text-slate-600" }
}

export function TaskAlertCard({ tasks, getTargetLabel }) {
  const [collapsed, setCollapsed] = useState(false)
  const [taskStatuses, setTaskStatuses] = useState(() =>
    Object.fromEntries(tasks.map((task) => [task.id, task.status]))
  )
  const activeTasks = tasks
    .map((task) => ({ ...task, status: taskStatuses[task.id] ?? task.status }))
    .filter((task) => task.status !== "完了")
    .sort((a, b) => a.dueDateValue.localeCompare(b.dueDateValue))
  const urgentCount = activeTasks.filter((task) => task.dueDateValue <= today).length

  return (
    <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
      <CardHeader className="border-b border-amber-200/80">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            title={
              <span className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="size-4 text-amber-600" />
                タスクアラート ({urgentCount}件)
              </span>
            }
          />
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-xl bg-white">
              <Link to="/tasks">タスク管理を開く</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-xl bg-white"
              onClick={() => setCollapsed((current) => !current)}
              aria-label={collapsed ? "タスクアラートを開く" : "タスクアラートを閉じる"}
            >
              {collapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {!collapsed ? (
        <CardContent className="pt-4">
          {activeTasks.length ? (
            <div className="grid gap-2">
              {activeTasks.slice(0, 4).map((task) => {
                const dueLabel = getDueLabel(task)

                return (
                  <div
                    key={task.id}
                    className="grid gap-3 rounded-2xl border border-amber-200/70 bg-white/80 p-3 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div className="min-w-0">
                      <div className="whitespace-normal break-words text-sm font-semibold leading-6" title={task.type}>
                        {task.type}
                      </div>
                      <div className="mt-1 truncate text-xs text-muted-foreground" title={getTargetLabel?.(task)}>
                        {getTargetLabel?.(task)}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <Badge variant="outline" className={dueLabel.className}>
                        {dueLabel.text}
                      </Badge>
                      <span className="text-xs font-semibold text-muted-foreground">
                        期限 {formatDueDate(task.dueDate)}
                      </span>
                      <Badge variant="outline" className={getTaskStatusClassName(task.status)}>
                        {task.status}
                      </Badge>
                      <Select
                        value={task.status}
                        onValueChange={(value) =>
                          setTaskStatuses((current) => ({ ...current, [task.id]: value }))
                        }
                      >
                        <SelectTrigger className="h-8 w-28 rounded-xl bg-background text-xs">
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
                      <Button
                        type="button"
                        size="sm"
                        className="h-8 rounded-xl px-3 text-xs"
                        onClick={() =>
                          setTaskStatuses((current) => ({ ...current, [task.id]: "完了" }))
                        }
                      >
                        完了する
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-amber-200 bg-white/60 px-5 py-6 text-sm text-muted-foreground">
              現在、対応が必要なタスクはありません。
            </div>
          )}
        </CardContent>
      ) : null}
    </Card>
  )
}
