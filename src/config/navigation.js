import { Building2, ClipboardList, Database, LayoutGrid, UserCog, Users } from "lucide-react"

export const navItems = [
  { to: "/dashboard", label: "ダッシュボード", icon: LayoutGrid },
  { to: "/tasks", label: "タスク管理", icon: ClipboardList },
  { to: "/job-seekers", label: "求職者管理", icon: Users },
  { to: "/companies", label: "企業管理", icon: Building2 },
  { to: "/users", label: "ユーザー管理", icon: UserCog },
  { to: "#", label: "Q-mate管理", icon: Database, bottom: true },
]
