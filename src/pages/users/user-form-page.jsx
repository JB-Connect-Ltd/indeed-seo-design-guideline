import { Mail, User } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DetailLayout, InfoCard } from "@/components/page/page-cards"
import { SummaryBlock } from "@/components/page/page-data"
import { Field, StaticSelect } from "@/components/page/page-forms"
import { PageIntro } from "@/components/page/page-header"
import { roleOptions, users } from "@/data/users"

export function UserEditPage() {
  const { id = "1" } = useParams()
  const user = users.find((item) => item.id === id) ?? users[0]
  return <UserFormPage mode="edit" user={user} />
}

export function UserCreatePage() {
  return <UserFormPage mode="create" />
}

function UserFormPage({ mode, user }) {
  const isCreate = mode === "create"
  const title = isCreate ? "新規ユーザーの登録" : "ユーザー情報の編集"
  const cardTitle = isCreate ? "ユーザー新規登録" : "ユーザー編集"
  const actionText = isCreate ? "ユーザーを登録する" : "保存する"
  const cancelTo = isCreate ? "/users" : `/users/${user?.id ?? "1"}`

  return (
    <>
      <PageIntro title="ユーザー管理" description={title} backTo={cancelTo} />
      <DetailLayout>
        <div className="space-y-4">
          <InfoCard title={cardTitle}>
            <SummaryBlock
              icon={<User className="size-5" />}
              lines={
                isCreate
                  ? [{ icon: <User className="size-4" />, value: "新しいユーザーの基本情報を入力してください" }]
                  : [
                      { icon: <User className="size-4" />, value: user.name },
                      { icon: <Mail className="size-4" />, value: user.email },
                      { icon: <span>◌</span>, value: user.role },
                    ]
              }
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="姓" required>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={user?.lastName ?? ""} placeholder="例：山田" />
              </Field>
              <Field label="名" required>
                <Input className="h-12 rounded-2xl bg-background" defaultValue={user?.firstName ?? ""} placeholder="例：太郎" />
              </Field>
              <div className="md:col-span-2">
                <Field label="メールアドレス" required={isCreate}>
                  {isCreate ? (
                    <Input className="h-12 rounded-2xl bg-background" type="email" placeholder="example@indeed-seo.jp" />
                  ) : (
                    <div className="flex h-12 items-center rounded-2xl border border-border bg-muted/30 px-4 text-sm text-muted-foreground">
                      {user?.email}
                    </div>
                  )}
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="役割" required>
                  <StaticSelect
                    value={isCreate ? undefined : user?.role}
                    placeholder="役割を選択してください"
                    options={roleOptions}
                  />
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
