import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"

export function PageIntro({ title, description, backTo, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        {backTo ? (
          <Link to={backTo} className={buttonVariants({ variant: "outline", size: "lg" })}>
            <ArrowLeft className="size-4" />
            戻る
          </Link>
        ) : null}
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {action}
        <div className="flex size-12 items-center justify-center rounded-full bg-white font-semibold ring-1 ring-border">1M</div>
      </div>
    </div>
  )
}
