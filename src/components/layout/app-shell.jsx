import { Building2 } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Separator } from "@/components/ui/separator"
import { navItems } from "@/config/navigation"

export function AppShell({ children }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-b border-border bg-white/80 px-4 py-5 backdrop-blur md:border-r md:border-b-0">
        <div className="flex items-center gap-3 px-2 pb-5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Building2 className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Indeed_SEO</div>
          </div>
        </div>

        <nav className="grid gap-2">
          {navItems.filter((item) => !item.bottom).map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </nav>

        <Separator className="my-4" />

        <nav className="grid gap-2">
          {navItems.filter((item) => item.bottom).map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </nav>
      </aside>

      <main className="p-4 md:p-6">{children}</main>
    </div>
  )
}

function SidebarLink({ to, label, icon: Icon }) {
  if (to === "#") {
    return (
      <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        <span>{label}</span>
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
          isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
        }`
      }
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </NavLink>
  )
}
