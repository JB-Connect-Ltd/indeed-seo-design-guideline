export function getTaskStatusClassName(status) {
  if (status === "完了") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700"
  }

  if (status === "対応中") {
    return "border-blue-200 bg-blue-50 text-blue-700"
  }

  return "border-amber-200 bg-amber-50 text-amber-700"
}
