import { Mail, Pencil, User } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { DetailLayout, InfoCard, SideActionCard } from "@/components/page/page-cards"
import { SummaryBlock, KvGrid } from "@/components/page/page-data"
import { PageIntro } from "@/components/page/page-header"
import { UserDeleteDialog } from "@/components/users/user-delete-dialog"
import { users } from "@/data/users"

export function UserDetailPage() {
  const { id = "1" } = useParams()
  const user = users.find((item) => item.id === id) ?? users[0]
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <PageIntro title="ユーザー管理" description="ユーザー情報の詳細表示と管理" backTo="/users" />
      <DetailLayout
        side={
          <div className="space-y-4">
            <SideActionCard title="ユーザー削除">
              <button
                className={buttonVariants({ size: "lg", className: "w-full rounded-2xl" })}
                onClick={() => setDeleteOpen(true)}
              >
                ユーザーを削除する
              </button>
            </SideActionCard>
          </div>
        }
      >
        <div className="space-y-4">
          <InfoCard
            title="ユーザー情報"
            action={<Link to={`/users/${user.id}/edit`} className={buttonVariants({ variant: "outline" })}><Pencil className="size-4" />編集</Link>}
          >
            <SummaryBlock
              icon={<User className="size-5" />}
              lines={[
                { icon: <User className="size-4" />, value: user.name },
                { icon: <Mail className="size-4" />, value: user.email },
                { icon: <span>◌</span>, value: user.role },
              ]}
            />
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">プロフィール</h3>
              <KvGrid
                items={[
                  { label: "氏名", value: user.name },
                  { label: "メールアドレス", value: user.email },
                  { label: "役割", value: user.role },
                  { label: "ステータス", value: user.status },
                  { label: "登録日", value: user.createdAt },
                ]}
              />
            </div>
          </InfoCard>
        </div>
      </DetailLayout>
      <UserDeleteDialog
        user={user}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
      />
    </>
  )
}
