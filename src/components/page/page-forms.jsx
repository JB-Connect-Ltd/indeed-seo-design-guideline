import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Field({ label, required = false, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-muted-foreground">
        {label}
        {required ? <span className="ml-1 text-red-500">※必須</span> : null}
      </Label>
      {children}
    </div>
  )
}

export function StaticSelect({ value, options, placeholder = "選択してください" }) {
  return (
    <Select defaultValue={value}>
      <SelectTrigger className="h-11 w-full rounded-xl bg-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ChoiceCard({ children }) {
  return <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4">{children}</div>
}

export function ChoiceRow({ label, checked = false }) {
  return (
    <Label className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-medium">
      <Checkbox defaultChecked={checked} />
      <span>{label}</span>
    </Label>
  )
}

export function RadioBlock({ name, items, ...props }) {
  return (
    <RadioGroup defaultValue={items.find((item) => item.checked)?.value} {...props}>
      {items.map((item) => (
        <Label key={item.value} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-medium">
          <RadioGroupItem value={item.value} name={name} />
          <span>{item.label}</span>
        </Label>
      ))}
    </RadioGroup>
  )
}
