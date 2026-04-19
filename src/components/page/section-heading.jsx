import { CircleDot } from "lucide-react"

import { CardTitle } from "@/components/ui/card"

export function SectionHeading({ title, icon }) {
  const Icon = icon ?? CircleDot

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-4 items-center justify-center text-muted-foreground/70">
        <Icon className="size-3.5 stroke-[1.75]" />
      </div>
      <CardTitle className="text-base font-semibold tracking-tight md:text-[1.05rem]">{title}</CardTitle>
    </div>
  )
}
