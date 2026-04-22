import { Mail, User } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { DetailLayout, InfoCard } from "@/components/page/page-cards"
import { SummaryBlock } from "@/components/page/page-data"
import { Field, StaticSelect } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { jobSeekers } from "@/data/job-seekers"

const sourceOptions = ["Q-Mate", "Airwork"]
const genderOptions = ["男性", "女性", "その他", "回答しない"]

export function JobSeekerEditPage() {
  const { id = "1" } = useParams()
  const seeker = jobSeekers.find((item) => item.id === id) ?? jobSeekers[0]
  return <JobSeekerFormPage mode="edit" seeker={seeker} />
}

export function JobSeekerCreatePage() {
  return <JobSeekerFormPage mode="create" />
}

function JobSeekerFormPage({ mode, seeker }) {
  const isCreate = mode === "create"
  const title = isCreate ? "新規求職者の登録" : "求職者情報の編集"
  const cardTitle = isCreate ? "求職者新規登録" : "求職者編集"
  const actionText = isCreate ? "求職者を登録する" : "保存する"
  const cancelTo = isCreate ? "/job-seekers" : `/job-seekers/${seeker?.id ?? "1"}`

  return (
    <>
      <PageIntro title="求職者管理" description={title} backTo={cancelTo} />
      <DetailLayout>
        <div className="space-y-4">
          <InfoCard title={cardTitle}>
            <SummaryBlock
              icon={<User className="size-5" />}
              lines={
                isCreate
                  ? [{ icon: <User className="size-4" />, value: "新しい求職者の基本情報を入力してください" }]
                  : [
                      { icon: <User className="size-4" />, value: seeker.name },
                      { icon: <span>☎</span>, value: seeker.phone },
                      { icon: <Mail className="size-4" />, value: seeker.email },
                    ]
              }
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="姓" required>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.lastName ?? ""} placeholder="例：山田" />
              </Field>
              <Field label="名">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.firstName ?? ""} placeholder="例：太郎" />
              </Field>
              <Field label="セイ">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.lastNameKana ?? ""} placeholder="例：ヤマダ" />
              </Field>
              <Field label="メイ">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.firstNameKana ?? ""} placeholder="例：タロウ" />
              </Field>
              <Field label="性別">
                <StaticSelect value={seeker?.gender} placeholder="性別を選択してください" options={genderOptions} />
              </Field>
              <Field label="電話番号" required>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.phone ?? ""} placeholder="例：090-1234-5678" />
              </Field>
              <Field label="メールアドレス">
                <Input className="h-12 rounded-2xl bg-background" type="email" defaultValue={seeker?.email ?? ""} placeholder="example@indeed-seo.jp" />
              </Field>
              <Field label="郵便番号">
                <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.postalCode ?? ""} placeholder="例：150-0002" />
              </Field>
              <div className="md:col-span-2">
                <Field label="住所">
                  <Input className="h-12 rounded-2xl bg-background" defaultValue={seeker?.address ?? ""} placeholder="例：東京都渋谷区渋谷1-2-3" />
                </Field>
              </div>
              <Field label="流入経路" required>
                <StaticSelect value={seeker?.source} placeholder="流入経路を選択してください" options={sourceOptions} />
              </Field>
              <div className="md:col-span-2">
                <Field label="メモ">
                  <Textarea className="min-h-32 rounded-2xl bg-background" defaultValue={seeker?.memo ?? ""} placeholder="求職者に関するメモを入力してください" />
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
