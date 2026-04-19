import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

import { SectionHeading } from "@/components/page/section-heading"

export function DetailLayout({ children, side }) {
  if (!side) {
    return <div className="grid gap-4">{children}</div>
  }

  return <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_340px]">{children}{side}</div>
}

export function ManagementTableCard({ title, action, children }) {
  return (
    <Card className="border-white/70 bg-white/90 shadow-sm">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SectionHeading title={title} />
          {action}
        </div>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  )
}

export function InfoCard({ title, action, children }) {
  return (
    <Card className="border-white/70 bg-white/90 shadow-sm">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <SectionHeading title={title} />
          {action ? <CardAction>{action}</CardAction> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-5">{children}</CardContent>
    </Card>
  )
}

export function SideActionCard({ title, description, children }) {
  return (
    <Card className="border-white/70 bg-white/90 shadow-sm">
      <CardHeader>
        <SectionHeading title={title} />
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

export function FormSection({ title, children }) {
  return (
    <Card className="border-white/70 bg-white/90 shadow-sm">
      <CardHeader>
        <SectionHeading title={title} />
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  )
}
