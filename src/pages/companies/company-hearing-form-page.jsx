import { useState } from "react"

import { Link, useParams, useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DeleteConfirmDialog, DeleteIconButton } from "@/components/page/delete-actions"
import { FormSection } from "@/components/page/page-cards"
import { ChoiceCard, ChoiceRow, Field, RadioBlock, StaticSelect } from "@/components/page/page-forms"
import { countryLanguageOptions, hearingConfirmationSections, hearingImagePreviews } from "@/data/companies"
import { ImagePlus } from "lucide-react"

const selectionFlowOptions = ["書類選考", "一次面接(オンライン)", "最終面接(来社)"]

export function CompanyHearingFormPage() {
  const { id = "1" } = useParams()
  const [searchParams] = useSearchParams()
  const [prefillNoteId] = useState(() =>
    searchParams.get("note") ??
    (typeof window !== "undefined" ? window.localStorage.getItem("hearingFormPrefillNoteId") : "") ??
    ""
  )
  const isPrefilledFromHearingNote = Boolean(prefillNoteId)
  const prefilledValues = Object.fromEntries(
    hearingConfirmationSections.flatMap((section) =>
      section.items.map((item) => [item.label, item.value])
    )
  )
  const prefillValue = (label) => (isPrefilledFromHearingNote ? prefilledValues[label] ?? "" : "")
  const textProps = (label, placeholder) => {
    const value = prefillValue(label)

    return value ? { defaultValue: value, placeholder } : { placeholder }
  }
  const isChoiceChecked = (label, option) => prefillValue(label).includes(option)
  const splitAmountRange = (value) => {
    const [min = "", max = ""] = value.split("〜")

    return [min.trim(), max.trim()]
  }
  const [salaryMin, salaryMax] = splitAmountRange(prefillValue("給与"))
  const [trialSalaryMin, trialSalaryMax] = splitAmountRange(prefillValue("試用期間中の給与"))
  const fixedOvertimeMatch = prefillValue("固定残業代").match(/（(.+)〜(.+)）/)
  const [selectionFlow, setSelectionFlow] = useState(() =>
    prefillValue("選考フロー") ? prefillValue("選考フロー").split(" → ") : []
  )
  const [salaryFormat, setSalaryFormat] = useState(() => (prefillValue("給与") ? "range" : ""))
  const [fixedOvertime, setFixedOvertime] = useState(() =>
    prefillValue("固定残業代").includes("あり") ? "yes" : ""
  )
  const [fixedOvertimeFormat, setFixedOvertimeFormat] = useState(() =>
    prefillValue("固定残業代").includes("範囲") ? "range" : ""
  )
  const [trialPeriod, setTrialPeriod] = useState(() => (prefillValue("試用期間").includes("あり") ? "yes" : ""))
  const [trialCondition, setTrialCondition] = useState(() =>
    prefillValue("試用期間中の労働条件") === "異なる" ? "different" : ""
  )
  const [trialSalaryFormat, setTrialSalaryFormat] = useState(() =>
    prefillValue("試用期間中の給与") ? "range" : ""
  )
  const [deleteTarget, setDeleteTarget] = useState(null)

  const toggleSelectionFlow = (label) => {
    setSelectionFlow((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label]
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_24%),linear-gradient(180deg,#f8f8f9_0%,#f3f5f7_100%)] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-3 px-1">
          <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Indeed_SEO</div>
          <h1 className="text-4xl font-semibold tracking-tight">求人ヒアリングフォーム</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            求人掲載に必要な情報をご入力ください。ご入力内容をもとに原稿案を作成し、確認のご連絡を差し上げます。
          </p>
        </div>

        <FormSection title="基本情報">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="職業カテゴリー">
              <StaticSelect value={prefillValue("職業カテゴリー")} placeholder="職業カテゴリーを選択してください" options={["営業", "企画/マーケティング/カスタマーサクセス/サポート", "コーポレートスタッフ", "不動産専門職", "IT"]} />
            </Field>
            <Field label="掲載国/言語">
              <>
                <Input className="h-12 rounded-2xl bg-background" list="country-language-options" {...textProps("掲載国/言語", "例：日本、日本語、英語")} />
                <datalist id="country-language-options">
                  {countryLanguageOptions.map((option) => <option key={option} value={option} />)}
                </datalist>
              </>
            </Field>
            <div className="md:col-span-2">
              <Field label="企業情報">
                <Textarea className="min-h-28 rounded-2xl bg-background" {...textProps("企業情報", "例：不動産売買・仲介を中心に首都圏で事業展開。若手営業採用を強化中。")} />
              </Field>
            </div>
            <Field label="雇用形態">
              <StaticSelect value={prefillValue("雇用形態")} placeholder="雇用形態を選択してください" options={["正社員", "アルバイト・パート", "派遣社員", "契約社員", "業務委託", "インターン", "新卒", "ボランティア"]} />
            </Field>
            <Field label="採用予定人数">
              <StaticSelect value={prefillValue("採用予定人数")} placeholder="採用予定人数を選択してください" options={["1名", "2名", "3名", "4名", "5名", "6名", "7名", "8名", "9名", "10名", "11人以上", "常時募集"]} />
            </Field>
            <Field label="人材紹介事業（有料職業紹介事業）としての求人ですか？">
              <StaticSelect value={prefillValue("人材紹介事業（有料職業紹介事業）としての求人ですか？")} placeholder="選択してください" options={["はい", "いいえ"]} />
            </Field>
          </div>
        </FormSection>

        <FormSection title="勤務地・勤務条件">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label="勤務地住所">
                <Input className="h-12 rounded-2xl bg-background" {...textProps("勤務地住所", "例：東京都渋谷区道玄坂2-10-7 ネクスト渋谷ビル 8F")} />
              </Field>
            </div>
            <Field label="転勤・出向">
              <StaticSelect value={prefillValue("転勤・出向")} placeholder="転勤・出向の有無を選択してください" options={["転勤なし", "転勤あり", "出向あり"]} />
            </Field>
            <Field label="アクセス">
              <Input className="h-12 rounded-2xl bg-background" {...textProps("アクセス", "例：渋谷駅から徒歩5分")} />
            </Field>
            <div className="md:col-span-2">
              <Field label="勤務地の補足">
                <Textarea className="min-h-28 rounded-2xl bg-background" {...textProps("勤務地の補足", "例：営業車の利用あり。直行直帰は事前申請制。")} />
              </Field>
            </div>
            <div className="grid gap-5 md:col-span-2 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-start">
              <Field label="勤務形態">
                <ChoiceCard>
                  {["固定時間制", "シフト制", "変形労働時間制", "フレックスタイム制度", "専門業務型裁量労働制", "企画業務型裁量労働制", "事業場外みなし労働時間制", "高度プロフェッショナル制度"].map((label, index) => (
                    <ChoiceRow key={label} label={label} checked={isPrefilledFromHearingNote ? isChoiceChecked("勤務形態", label) : index === 0} />
                  ))}
                </ChoiceCard>
              </Field>
              <div className="grid gap-5">
                <Field label="平均所定労働時間 (月)">
                  <Input className="h-12 rounded-2xl bg-background" {...textProps("平均所定労働時間 (月)", "例：160時間")} />
                </Field>
                <Field label="残業">
                  <Input className="h-12 rounded-2xl bg-background" {...textProps("残業", "例：平均残業時間：30分")} />
                </Field>
              </div>
            </div>
            <div className="md:col-span-2">
              <Field label="就業時間・曜日">
                <Textarea className="min-h-32 rounded-2xl bg-background" {...textProps("就業時間・曜日", `勤務時間：〇時〇分～〇時〇分\n休憩：〇時間\nその他条件があればテキストで記載`)} />
              </Field>
            </div>
          </div>
        </FormSection>

        <FormSection title="給与情報">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="給与形態">
              <StaticSelect value={prefillValue("給与形態")} placeholder="給与形態を選択してください" options={["時給", "日給", "週給", "月給", "年俸"]} />
            </Field>
            <div className="md:col-span-2">
              <Field label="給与">
                <ChoiceCard>
                  <RadioBlock
                    name="salary-format"
                    value={salaryFormat}
                    onValueChange={setSalaryFormat}
                    items={[
                      { value: "range", label: "範囲で入力", checked: true },
                      { value: "min", label: "最低額のみ入力" },
                      { value: "fixed", label: "固定額を入力" },
                    ]}
                  />
                      {salaryFormat === "range" ? (
                    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
                      <Input className="h-12 rounded-2xl bg-background" defaultValue={salaryMin} placeholder="最低額を入力" />
                      <div className="flex items-center justify-center text-sm font-semibold text-muted-foreground">〜</div>
                      <Input className="h-12 rounded-2xl bg-background" defaultValue={salaryMax} placeholder="最高額を入力" />
                    </div>
                  ) : null}
                  {salaryFormat === "min" ? (
                    <Input className="h-12 rounded-2xl bg-background" defaultValue={salaryMin} placeholder="最低額を入力" />
                  ) : null}
                  {salaryFormat === "fixed" ? (
                    <Input className="h-12 rounded-2xl bg-background" defaultValue={prefillValue("給与")} placeholder="固定額を入力" />
                  ) : null}
                </ChoiceCard>
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="固定残業代">
                <ChoiceCard>
                  <RadioBlock
                    name="fixed-overtime"
                    value={fixedOvertime}
                    onValueChange={setFixedOvertime}
                    items={[
                      { value: "yes", label: "固定残業代あり", checked: true },
                      { value: "no", label: "固定残業代なし" },
                    ]}
                  />
                  {fixedOvertime === "yes" ? (
                    <div className="rounded-2xl border border-border bg-white p-4">
                      <div className="mb-3 text-sm font-semibold text-muted-foreground">固定残業代の表示方法</div>
                      <RadioBlock
                        name="fixed-overtime-format"
                        value={fixedOvertimeFormat}
                        onValueChange={setFixedOvertimeFormat}
                        items={[
                          { value: "range", label: "範囲で表示（最低額〜最高額）", checked: true },
                          { value: "fixed", label: "固定額を表示" },
                        ]}
                      />
                      {fixedOvertimeFormat === "range" ? (
                        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
                          <Input className="h-12 rounded-2xl bg-background" defaultValue={fixedOvertimeMatch?.[1] ?? ""} placeholder="最低額を入力" />
                          <div className="flex items-center justify-center text-sm font-semibold text-muted-foreground">〜</div>
                          <Input className="h-12 rounded-2xl bg-background" defaultValue={fixedOvertimeMatch?.[2] ?? ""} placeholder="最高額を入力" />
                        </div>
                      ) : null}
                      {fixedOvertimeFormat === "fixed" ? (
                        <Input className="mt-4 h-12 rounded-2xl bg-background" defaultValue={prefillValue("固定残業代")} placeholder="固定額を入力" />
                      ) : null}
                    </div>
                  ) : null}
                </ChoiceCard>
              </Field>
            </div>
            <Field label="固定残業時間">
              <Input className="h-12 rounded-2xl bg-background" {...textProps("固定残業時間", "例：20時間")} />
            </Field>
            <div className="md:col-span-2">
              <Field label="給与の補足">
                <ChoiceCard>
                  {["昇給年二回", "賞与年二回", "交通費全額支給", "住宅手当(月3万円支給)", "通勤手当(月2万円上限)", "時間外手当(超過分全額支給)"].map((label) => (
                    <ChoiceRow key={label} label={label} checked={isChoiceChecked("給与の補足", label)} />
                  ))}
                  <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("給与の補足", "例：インセンティブ制度あり")} />
                </ChoiceCard>
              </Field>
            </div>
          </div>
        </FormSection>

        <FormSection title="試用期間">
          <Field label="試用期間">
            <ChoiceCard>
              <RadioBlock
                name="trial-period"
                value={trialPeriod}
                onValueChange={setTrialPeriod}
                items={[
                  { value: "yes", label: "試用期間あり", checked: true },
                  { value: "no", label: "試用期間なし" },
                ]}
              />
              {trialPeriod === "yes" ? (
                <>
                  <Input className="h-12 rounded-2xl bg-background" {...textProps("期間", "例：3ヵ月")} />
                  <div className="rounded-2xl border border-border bg-white p-4">
                    <div className="mb-3 text-sm font-semibold text-muted-foreground">試用期間中の労働条件</div>
                    <RadioBlock
                      name="trial-condition"
                      value={trialCondition}
                      onValueChange={setTrialCondition}
                      items={[
                        { value: "same", label: "同条件" },
                        { value: "different", label: "異なる", checked: true },
                      ]}
                    />
                    {trialCondition === "different" ? (
                      <div className="mt-4 space-y-4">
                        <Field label="給与">
                          <ChoiceCard>
                            <RadioBlock
                              name="trial-salary-format"
                              value={trialSalaryFormat}
                              onValueChange={setTrialSalaryFormat}
                              items={[
                                { value: "range", label: "範囲で入力", checked: true },
                                { value: "min", label: "最低額のみ入力" },
                                { value: "fixed", label: "固定額を入力" },
                              ]}
                            />
                            {trialSalaryFormat === "range" ? (
                              <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
                                <Input className="h-12 rounded-2xl bg-background" defaultValue={trialSalaryMin} placeholder="最低額を入力" />
                                <div className="flex items-center justify-center text-sm font-semibold text-muted-foreground">〜</div>
                                <Input className="h-12 rounded-2xl bg-background" defaultValue={trialSalaryMax} placeholder="最高額を入力" />
                              </div>
                            ) : null}
                            {trialSalaryFormat === "min" ? (
                              <Input className="h-12 rounded-2xl bg-background" defaultValue={trialSalaryMin} placeholder="最低額を入力" />
                            ) : null}
                            {trialSalaryFormat === "fixed" ? (
                              <Input className="h-12 rounded-2xl bg-background" defaultValue={prefillValue("試用期間中の給与")} placeholder="固定額を入力" />
                            ) : null}
                          </ChoiceCard>
                        </Field>
                        <Field label="労働時間">
                          <Textarea className="min-h-28 rounded-2xl bg-background" {...textProps("試用期間中の労働時間", `勤務時間：〇時〇分～〇時〇分\n休憩：〇時間\nその他条件があればテキストで記載`)} />
                        </Field>
                        <Field label="その他（雇用形態や手当など）">
                          <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("その他（雇用形態や手当など）", "例：試用期間中は契約社員雇用。通勤手当は上限20,000円。")} />
                        </Field>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </ChoiceCard>
          </Field>
        </FormSection>

        <FormSection title="待遇・福利厚生">
          <div className="grid gap-5">
            <Field label="社会保険">
              <ChoiceCard>
                {["健康保険", "雇用保険", "労災保険", "厚生年金"].map((label) => (
                  <ChoiceRow key={label} label={label} checked={isChoiceChecked("社会保険", label)} />
                ))}
                <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("社会保険", "※適用しない場合：社会保険が適用されない理由を入力してください")} />
              </ChoiceCard>
            </Field>
            <Field label="休日">
              <ChoiceCard>
                {["完全週休二日制", "土日祝休み", "長期休暇", "年休120日以上", "リフレッシュ休暇期間制度", "男女育休制度", "家族都合での急なお休みOK"].map((label) => (
                  <ChoiceRow key={label} label={label} checked={isChoiceChecked("休日", label)} />
                ))}
                <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("休日", "例：水曜・日曜休み、GW・夏季・年末年始休暇あり")} />
              </ChoiceCard>
            </Field>
            <Field label="待遇・福利厚生">
              <ChoiceCard>
                {["社保加入", "社員登用あり", "共済保険", "社員食堂完備", "各種オンラインクラス受講・試験の補助", "社員旅行", "資格補助"].map((label) => (
                  <ChoiceRow key={label} label={label} checked={isChoiceChecked("待遇・福利厚生", label)} />
                ))}
                <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("待遇・福利厚生", "例：社用携帯貸与あり")} />
              </ChoiceCard>
            </Field>
          </div>
        </FormSection>

        <FormSection title="応募条件・人物像">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label="条件">
                <ChoiceCard>
                  {["未経験歓迎", "学歴不問", "経験不問", "自動車免許(ATでOK)が必要"].map((label) => (
                    <ChoiceRow key={label} label={label} checked={isChoiceChecked("条件", label)} />
                  ))}
                </ChoiceCard>
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="求める人材">
                <ChoiceCard>
                  <div className="rounded-2xl border border-border bg-white p-4">
                    <div className="mb-3 text-sm font-semibold text-muted-foreground">性別</div>
                    {["男性", "女性", "問わず"].map((label) => (
                      <ChoiceRow key={label} label={label} checked={isChoiceChecked("求める人材", label)} />
                    ))}
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-4">
                    <div className="mb-3 text-sm font-semibold text-muted-foreground">年代</div>
                    {["10代", "20代", "30代", "40代", "50代", "60代以上"].map((label) => (
                      <ChoiceRow key={label} label={label} checked={isChoiceChecked("求める人材", label)} />
                    ))}
                  </div>
                  <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("求める人材", "例：20代～40代くらいの稼ぎたいガッツのある方")} />
                </ChoiceCard>
              </Field>
            </div>
            <Field label="年齢制限">
              <StaticSelect value={prefillValue("年齢制限")} placeholder="選択してください" options={["制限なし", "45歳以下"]} />
            </Field>
            <Field label="性別制限">
              <StaticSelect value={prefillValue("性別制限")} placeholder="選択してください" options={["制限なし", "男性限定", "女性限定"]} />
            </Field>
            <div className="md:col-span-2">
              <Field label="不採用条件">
                <ChoiceCard>
                  {["年齢", "性別"].map((label) => (
                    <ChoiceRow key={label} label={label} checked={isChoiceChecked("不採用条件", label)} />
                  ))}
                  <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("不採用条件", "例：自由入力")} />
                </ChoiceCard>
              </Field>
            </div>
          </div>
        </FormSection>

        <FormSection title="選考・職場情報">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label="アピールポイント">
                <ChoiceCard>
                  {["ノルマ無し", "アットホーム", "20代で年収1,000万超え実績あり", "未経験が90%"].map((label) => (
                    <ChoiceRow key={label} label={label} checked={isChoiceChecked("アピールポイント", label)} />
                  ))}
                  <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("アピールポイント", "例：自由入力")} />
                </ChoiceCard>
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="仕事内容">
                <Textarea className="min-h-32 rounded-2xl bg-background" {...textProps("仕事内容", "例：反響営業中心。来店・問い合わせ顧客への物件提案、内見案内、契約手続き対応。")} />
              </Field>
            </div>
            <Field label="選考フロー">
              <ChoiceCard>
                {selectionFlowOptions.map((label) => (
                  <Label key={label} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-medium">
                    <Checkbox
                      checked={selectionFlow.includes(label)}
                      onCheckedChange={() => toggleSelectionFlow(label)}
                    />
                    <span>{label}</span>
                  </Label>
                ))}
                <div className="rounded-xl border border-border bg-white px-4 py-3">
                  <div className="text-xs font-semibold tracking-wide text-muted-foreground">選択中の選考フロー</div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium">
                    {selectionFlow.length ? (
                      selectionFlow.map((label, index) => (
                        <div key={label} className="flex items-center gap-2">
                          <span>{label}</span>
                          {index < selectionFlow.length - 1 ? (
                            <span className="text-muted-foreground">→</span>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <span className="text-muted-foreground">選考フローを選択してください</span>
                    )}
                  </div>
                </div>
              </ChoiceCard>
            </Field>
            <Field label="職場環境">
                <ChoiceCard>
                  <ChoiceRow label="髪型" />
                <ChoiceRow label="髪色自由" checked={isChoiceChecked("職場環境", "髪色自由")} />
                <ChoiceRow label="ピアスOK" checked={isChoiceChecked("職場環境", "ピアスOK")} />
              </ChoiceCard>
            </Field>
            <div className="md:col-span-2">
              <Field label="その他">
                <Textarea className="min-h-24 rounded-2xl bg-background" {...textProps("その他", "例：入社日は相談可能。業界経験者は条件優遇。")} />
              </Field>
            </div>
          </div>
        </FormSection>

        <FormSection title="連絡先・添付情報">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="通知メールアドレス">
              <Input className="h-12 rounded-2xl bg-background" {...textProps("通知メールアドレス", "例：recruit@example.co.jp")} />
            </Field>
            <Field label="問合せ先電話番号">
              <Input className="h-12 rounded-2xl bg-background" {...textProps("問合せ先電話番号", "例：03-1234-5678")} />
            </Field>
            <div className="md:col-span-2">
              <Field label="掲載画像">
                <div className="space-y-4 rounded-2xl border border-border bg-muted/10 p-4">
                  <div className="flex justify-end">
                    <Button variant="outline" className="rounded-2xl">
                      <ImagePlus className="size-4" />
                      画像を追加
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {hearingImagePreviews.map((image) => (
                      <div key={image.name} className="overflow-hidden rounded-2xl border border-dashed border-border bg-white/80">
                        <div className="flex aspect-[4/3] items-center justify-center bg-muted/40 px-4 text-center text-sm text-muted-foreground">
                          画像プレビュー
                        </div>
                        <div className="border-t border-border px-3 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <Badge variant="secondary" className="max-w-full rounded-full px-3 py-1">
                              <span className="truncate">{image.name}</span>
                            </Badge>
                            <DeleteIconButton
                              label={`${image.name}を削除`}
                              onClick={() => setDeleteTarget(image)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Field>
            </div>
          </div>
        </FormSection>

        <CardActions companyId={id} />
      </div>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
        title="掲載画像を削除"
        itemName={deleteTarget?.name}
        description="この画像を削除します。この操作は元に戻せません。"
      />
    </div>
  )
}

function CardActions({ companyId }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">入力内容をご確認のうえ送信してください。</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Button variant="outline" size="lg" className="rounded-2xl">下書き保存</Button>
        <Link
          to={`/companies/${companyId}/hearing-form/confirm`}
          className="inline-flex h-9 items-center justify-center rounded-2xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          確認画面へ
        </Link>
      </div>
    </div>
  )
}
