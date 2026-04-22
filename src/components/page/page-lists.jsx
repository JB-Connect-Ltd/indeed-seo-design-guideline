import { ChevronDown, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Field, StaticSelect } from "@/components/page/page-forms"

export function SearchPanel({ placeholder, filters }) {
  return (
    <Card className="mb-6 border-white/70 bg-white/85 shadow-sm">
      <CardContent className="space-y-5 pt-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-12 rounded-full bg-background pl-11 text-base" placeholder={placeholder} />
        </div>

        {filters?.length ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ChevronDown className="size-4" />
              絞り込み
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:flex-nowrap">
              {filters.map((filter) => (
                <div key={filter.label} className="w-full md:w-[240px] lg:w-[260px] xl:w-[280px]">
                  <div className="flex items-center gap-3">
                    <div className="w-28 shrink-0 whitespace-nowrap text-sm font-semibold text-muted-foreground">{filter.label}</div>
                    <div className="min-w-0 flex-1">
                      <StaticSelect value={filter.value} options={filter.options} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function StatusBadge({ value }) {
  const variant =
    value === "登録済み" || value === "採用活動中" || value === "公開中" || value === "募集中"
      ? "default"
      : value === "ユーザー削除" || value === "削除" || value === "他社紹介NG" || value === "終了"
        ? "destructive"
        : "secondary"

  return <Badge variant={variant}>{value}</Badge>
}

export function DataTableFooter({ count }) {
  return (
    <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span>1 / {count}件</span>
        <Button variant="outline" size="sm">15 ▾</Button>
      </div>
      <div className="flex items-center gap-2">
        {["≪", "‹", "1", "›", "≫"].map((label) => (
          <Button key={label} variant={label === "1" ? "default" : "outline"} size="icon-sm">
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
