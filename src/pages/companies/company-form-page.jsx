import { Building2, Mail, Phone } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { DetailLayout, InfoCard } from "@/components/page/page-cards"
import { SummaryBlock } from "@/components/page/page-data"
import { Field } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { companies } from "@/data/companies"

export function CompanyEditPage() {
  const { id = "1" } = useParams()
  const company = companies.find((item) => item.id === id) ?? companies[0]
  return <CompanyFormPage mode="edit" company={company} />
}

export function CompanyCreatePage() {
  return <CompanyFormPage mode="create" />
}

function CompanyFormPage({ mode, company }) {
  const isCreate = mode === "create"
  const title = isCreate ? "新規企業の登録" : "企業情報の編集"
  const cardTitle = isCreate ? "企業新規登録" : "企業編集"
  const actionText = isCreate ? "企業を登録する" : "保存する"
  const cancelTo = isCreate ? "/companies" : `/companies/${company?.id ?? "1"}`
  const temporaryLabel = (label) => (
    <span>
      {label} <span className="text-red-500">※暫定</span>
    </span>
  )

  return (
    <>
      <PageIntro title="企業管理" description={title} backTo={cancelTo} />
      <DetailLayout>
        <div className="space-y-4">
          <InfoCard title={cardTitle}>
            <SummaryBlock
              icon={<Building2 className="size-5" />}
              lines={
                isCreate
                  ? [{ icon: <Building2 className="size-4" />, value: "新しい企業の基本情報を入力してください" }]
                  : [
                      { icon: <Building2 className="size-4" />, value: company.name },
                      { icon: <Phone className="size-4" />, value: company.phone },
                      { icon: <Mail className="size-4" />, value: company.email },
                    ]
              }
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="企業名" required>
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.name ?? ""} placeholder="例：株式会社ネクストホーム" />
                </Field>
              </div>
              <Field label="電話番号" required>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.phone ?? ""} placeholder="例：03-1234-5678" />
              </Field>
              <Field label="担当者メールアドレス" required>
                <Input className="h-12 rounded-2xl bg-background" type="email" defaultValue={company?.email ?? ""} placeholder="example@company.co.jp" />
              </Field>
              <Field label="サイトURL">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.url ?? ""} placeholder="https://example.com" />
              </Field>
              <Field label="担当者名">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.contactName ?? ""} placeholder="例：山田 太郎" />
              </Field>
              <div className="md:col-span-2">
                <Field label="住所">
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.address ?? ""} placeholder="例：東京都渋谷区道玄坂2-10-7 ネクスト渋谷ビル 8F" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label={temporaryLabel("AirWork id/pass")}>
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.airworkCredentials ?? ""} placeholder="例：company_admin / password" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label={temporaryLabel("転送元メールアドレス")}>
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.forwardingSourceEmail ?? ""} placeholder="例：jobs+company@indeed-seo.jp" />
                </Field>
              </div>
              <Field label={temporaryLabel("Qmate企業 id")}>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.qmateCompanyId ?? ""} placeholder="例：QM-CP-000128" />
              </Field>
              <Field label={temporaryLabel("Timerex")}>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={company?.timerex ?? ""} placeholder="https://timerex.net/..." />
              </Field>
              <div className="md:col-span-2">
                <Field label="備考">
                  <Textarea className="min-h-28 rounded-2xl bg-background" defaultValue={company?.notes ?? ""} placeholder="企業情報に関する補足があれば入力してください" />
                </Field>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:justify-end">
              <Link
                to={cancelTo}
                className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-2xl md:min-w-40" })}
              >
                キャンセル
              </Link>
              <Button className="rounded-2xl md:min-w-52" size="lg">{actionText}</Button>
            </div>
          </InfoCard>
        </div>
      </DetailLayout>
    </>
  )
}
