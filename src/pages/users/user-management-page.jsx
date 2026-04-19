import { Eye, FilePlus2 } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Button, buttonVariants } from "@/components/ui/button"
import { DeleteConfirmDialog, DeleteIconButton } from "@/components/page/delete-actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ManagementTableCard } from "@/components/page/page-cards"
import { PageIntro } from "@/components/page/page-header"
import { DataTableFooter, SearchPanel, StatusBadge } from "@/components/page/page-lists"
import { roleOptions, users, userStatusOptions } from "@/data/users"

export function UserManagementPage() {
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeTab, setActiveTab] = useState("users")
  const isInvitedTab = activeTab === "invited"
  const visibleUsers = activeTab === "invited"
    ? users.filter((user) => user.status === "招待中")
    : users
  const tabs = [
    { key: "users", label: "ユーザー一覧" },
    { key: "invited", label: "招待されたユーザー" },
  ]

  return (
    <>
      <PageIntro title="ユーザー管理" description="ユーザー情報の管理" />
      <div className="mb-5 inline-flex rounded-2xl bg-muted p-1">
        {tabs.map((tab) => (
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
            {tab.label}
          </button>
        ))}
      </div>
      <SearchPanel
        placeholder="氏名、メールアドレスで検索..."
        filters={[
          { label: "役割", value: "すべて", options: ["すべて", ...roleOptions] },
          { label: "ステータス", value: "すべて", options: ["すべて", ...userStatusOptions] },
        ]}
      />
      <ManagementTableCard
        title={`${tabs.find((tab) => tab.key === activeTab)?.label ?? "ユーザー一覧"} (${visibleUsers.length}件)`}
        action={<Link to="/users/new" className={buttonVariants({ size: "lg", className: "rounded-2xl" })}><FilePlus2 className="size-4" />新規登録</Link>}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>氏名</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>役割</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>登録日</TableHead>
              <TableHead className="w-[96px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow
                key={user.id}
                className={isInvitedTab ? "" : "cursor-pointer"}
                onClick={() => {
                  if (!isInvitedTab) {
                    navigate(`/users/${user.id}`)
                  }
                }}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell><StatusBadge value={user.status} /></TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  {isInvitedTab ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      再送信
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/users/${user.id}`}
                        onClick={(event) => event.stopPropagation()}
                        className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                      >
                        <Eye className="size-4" />
                      </Link>
                      <DeleteIconButton
                        label={`${user.name}を削除`}
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedUser(user)
                        }}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTableFooter count={visibleUsers.length} />
      </ManagementTableCard>
      <DeleteConfirmDialog
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        onConfirm={() => setSelectedUser(null)}
        title="ユーザーを削除"
        itemName={selectedUser?.name}
        description="このユーザーに関連するすべてのデータが削除されます。この操作は元に戻せません。"
      />
    </>
  )
}
