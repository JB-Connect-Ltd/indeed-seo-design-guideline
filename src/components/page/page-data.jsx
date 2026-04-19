export function SummaryBlock({ icon, lines, footer }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-border/70 bg-muted/20 p-5 md:grid-cols-[auto_1fr]">
      <div className="flex size-14 items-center justify-center rounded-full bg-white ring-1 ring-border">{icon}</div>
      <div className="space-y-3">
        {lines.map((line) => (
          <div key={line.value} className="flex items-center gap-3 text-muted-foreground">
            <div className="flex size-6 items-center justify-center text-muted-foreground">{line.icon}</div>
            <span className="text-[15px] font-semibold leading-7 text-foreground">{line.value}</span>
          </div>
        ))}
        {footer ? <div className="pt-1 text-[15px] font-semibold leading-7 text-foreground">{footer}</div> : null}
      </div>
    </div>
  )
}

export function KvGrid({ items }) {
  return (
    <div className="grid gap-0">
      {items.map((item, index) => (
        <div key={item.key ?? index} className="grid gap-3 border-b border-border py-5 md:grid-cols-[180px_1fr]">
          <div className="text-sm text-muted-foreground">{item.label}</div>
          <div className="font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
