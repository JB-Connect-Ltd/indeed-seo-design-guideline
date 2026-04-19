import { Download, Eye, FilePlus2 } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { DeleteConfirmDialog, DeleteIconButton } from "@/components/page/delete-actions"
import { Button, buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ManagementTableCard } from "@/components/page/page-cards"
import { PageIntro } from "@/components/page/page-header"
import { DataTableFooter, SearchPanel } from "@/components/page/page-lists"
import { companies } from "@/data/companies"

export function CompanyManagementPage() {
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)

  return (
    <>
      <PageIntro title="企業管理" description="企業情報の管理" />
      <SearchPanel placeholder="企業名、電話番号、メールアドレスで検索..." />
      <ManagementTableCard
        title={`企業一覧 (${companies.length}件)`}
        action={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="size-4" />CSVエクスポート</Button>
            <Link to="/companies/new" className={buttonVariants({ size: "default" })}>
              <FilePlus2 className="size-4" />新規登録
            </Link>
          </div>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企業名</TableHead>
              <TableHead>電話番号</TableHead>
              <TableHead>担当者メールアドレス</TableHead>
              <TableHead>サイトURL</TableHead>
              <TableHead className="w-[96px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id} className="cursor-pointer" onClick={() => navigate(`/companies/${company.id}`)}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>
                  <a className="text-sm text-primary underline-offset-4 hover:underline" href={company.url}>
                    {company.url}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/companies/${company.id}`}
                      onClick={(event) => event.stopPropagation()}
                      className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                    >
                      <Eye className="size-4" />
                    </Link>
                    <DeleteIconButton
                      label={`${company.name}を削除`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setDeleteTarget(company)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTableFooter count={companies.length} />
      </ManagementTableCard>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
        title="企業を削除"
        itemName={deleteTarget?.name}
        description="この企業に関連するデータを削除します。この操作は元に戻せません。"
      />
    </>
  )
}
