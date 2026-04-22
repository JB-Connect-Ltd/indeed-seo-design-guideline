export const jobSeekerStatusOptions = ["採用活動中", "他社紹介NG", "他社紹介済み"]

export const applicationStatusOptions = [
  "未対応",
  "選考前辞退",
  "書類送付依頼",
  "書類選考中",
  "書類合格",
  "書類不合格",
  "面接調整開始",
  "面接日確定",
  "面接合格",
  "面接不合格",
  "選考中辞退",
  "内定通知",
  "内定辞退",
  "採用",
]

export const jobSeekers = [
  { id: "1", companyId: "1", appliedJobIds: ["job-1", "job-4"], applicationStatuses: { "job-1": "書類選考中", "job-4": "面接調整開始" }, name: "田中 花子", lastName: "田中", firstName: "花子", furigana: "タナカ ハナコ", lastNameKana: "タナカ", firstNameKana: "ハナコ", phone: "090-1234-5678", email: "tanaka.hanako@example.com", source: "Q-Mate", createdAt: "2026年02月27日", interviewAt: "2026年04月18日 10:00", status: "採用活動中", memo: "営業経験あり。土日面接希望。" },
  { id: "2", companyId: "1", appliedJobIds: ["job-2"], applicationStatuses: { "job-2": "書類送付依頼" }, name: "古谷 颯人", lastName: "古谷", firstName: "颯人", furigana: "フルヤ ハヤト", lastNameKana: "フルヤ", firstNameKana: "ハヤト", phone: "080-5678-1234", email: "furuyahayato@icloud.com", source: "Airwork", createdAt: "2026年02月27日", interviewAt: "未設定", status: "採用活動中", memo: "電話連絡は平日18時以降が希望。" },
  { id: "3", companyId: "2", appliedJobIds: [], name: "前田 崇志", lastName: "前田", firstName: "崇志", furigana: "マエダ タカシ", lastNameKana: "マエダ", firstNameKana: "タカシ", phone: "070-2468-1357", email: "maeda.aqua@gmail.com", source: "Q-Mate", createdAt: "2026年01月15日", interviewAt: "2026年04月19日 14:00", status: "採用活動中", memo: "接客経験が長く、オンライン面談調整済み。" },
  { id: "4", companyId: "3", appliedJobIds: [], name: "中山 創太", lastName: "中山", firstName: "創太", furigana: "ナカヤマ ソウタ", lastNameKana: "ナカヤマ", firstNameKana: "ソウタ", phone: "090-8765-4321", email: "soutanakayama876@gmail.com", source: "Airwork", createdAt: "2026年01月08日", interviewAt: "未設定", status: "他社紹介NG", memo: "履歴書確認待ち。" },
  { id: "5", companyId: "1", appliedJobIds: ["job-3", "job-5"], applicationStatuses: { "job-3": "内定通知", "job-5": "採用" }, name: "木村 理香子", lastName: "木村", firstName: "理香子", furigana: "キムラ リカコ", lastNameKana: "キムラ", firstNameKana: "リカコ", phone: "080-1122-3344", email: "kimura.lifeap@gmail.com", source: "Q-Mate", createdAt: "2026年01月05日", interviewAt: "2026年04月21日 16:30", status: "他社紹介済み", memo: "事務職も併願中。勤務地は渋谷希望。" },
  { id: "6", companyId: "4", appliedJobIds: [], name: "マッカラー BBS", lastName: "マッカラー", firstName: "BBS", furigana: "マッカラー ビービーエス", lastNameKana: "マッカラー", firstNameKana: "ビービーエス", phone: "070-9988-7766", email: "jbc.makara+11@gmail.com", source: "Airwork", createdAt: "2026年01月01日", interviewAt: "未設定", status: "他社紹介済み", memo: "日本語でのメール連絡を希望。" },
]

export const memoHistory = [
  { date: "2026年04月12日 15:30", author: "山田 太郎", body: "来月の採用計画について打ち合わせ済み。営業職2名の募集を優先。" },
  { date: "2026年04月07日 11:00", author: "山田 太郎", body: "求人票の文言修正依頼あり。サイトURLとメールアドレスを確認済み。" },
  { date: "2026年03月29日 17:45", author: "佐藤 美咲", body: "企業担当者より応募者対応のフロー共有あり。一次面接はオンライン実施。" },
]
