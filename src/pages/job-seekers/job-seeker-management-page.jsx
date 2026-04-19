import { Download, Eye, FilePlus2 } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { DeleteConfirmDialog, DeleteIconButton } from "@/components/page/delete-actions"
import { Button, buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ManagementTableCard } from "@/components/page/page-cards"
import { PageIntro } from "@/components/page/page-header"
import { DataTableFooter, SearchPanel, StatusBadge } from "@/components/page/page-lists"
import { jobSeekers, jobSeekerStatusOptions } from "@/data/job-seekers"

export function JobSeekerManagementPage() {
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)

  return (
    <>
      <PageIntro title="求職者管理" description="求職者情報の管理" />
      <SearchPanel
        placeholder="名前、電話番号、メールアドレスで検索..."
        filters={[
          { label: "流入経路", value: "すべて", options: ["すべて", "Q-Mate", "Airwork"] },
          { label: "求職者ステータス", value: "すべて", options: ["すべて", ...jobSeekerStatusOptions] },
        ]}
      />
      <ManagementTableCard
        title={`求職者一覧 (${jobSeekers.length}件)`}
        action={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="size-4" />CSVエクスポート</Button>
            <Link to="/job-seekers/new" className={buttonVariants({ className: "rounded-2xl" })}>
              <FilePlus2 className="size-4" />新規登録
            </Link>
          </div>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>電話番号</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>流入経路</TableHead>
              <TableHead>登録日</TableHead>
              <TableHead>求職者ステータス</TableHead>
              <TableHead className="w-[96px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobSeekers.map((seeker) => (
              <TableRow key={seeker.id} className="cursor-pointer" onClick={() => navigate(`/job-seekers/${seeker.id}`)}>
                <TableCell className="font-medium">{seeker.name}</TableCell>
                <TableCell>{seeker.phone}</TableCell>
                <TableCell>{seeker.email}</TableCell>
                <TableCell>{seeker.source}</TableCell>
                <TableCell>{seeker.createdAt}</TableCell>
                <TableCell><StatusBadge value={seeker.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/job-seekers/${seeker.id}`}
                      onClick={(event) => event.stopPropagation()}
                      className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                    >
                      <Eye className="size-4" />
                    </Link>
                    <DeleteIconButton
                      label={`${seeker.name}を削除`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setDeleteTarget(seeker)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTableFooter count={jobSeekers.length} />
      </ManagementTableCard>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
        title="求職者を削除"
        itemName={deleteTarget?.name}
        description="この求職者に関連するデータを削除します。この操作は元に戻せません。"
      />
    </>
  )
}
