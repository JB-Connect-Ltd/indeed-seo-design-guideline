export const jobSeekerStatusOptions = ["採用活動中", "他社紹介NG", "他社紹介済み"]

export const applicationStatusOptions = [
  "未対応",
  "選考前辞退",
  "書類送付依頼",
  "書類選考中",
  "書類合格",
  "書類不合格",
  "二次書類審査中",
  "二次書類審査不合格",
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
  { id: "1", companyId: "1", appliedJobIds: ["job-1", "job-2", "job-4", "job-5"], applicationStatuses: { "job-1": "二次書類審査中", "job-2": "二次書類審査不合格", "job-4": "面接調整開始", "job-5": "書類合格" }, name: "田中 花子", lastName: "田中", firstName: "花子", furigana: "タナカ ハナコ", lastNameKana: "タナカ", firstNameKana: "ハナコ", gender: "女性", postalCode: "150-0002", address: "東京都渋谷区渋谷1-2-3", phone: "090-1234-5678", email: "tanaka.hanako@example.com", source: "Q-Mate", createdAt: "2026年02月27日", interviewAt: "2026年04月18日 10:00", status: "採用活動中", memo: "営業経験あり。土日面接希望。" },
  { id: "2", companyId: "1", appliedJobIds: ["job-2", "job-3", "job-4", "job-5"], applicationStatuses: { "job-2": "書類送付依頼", "job-3": "面接調整開始", "job-4": "面接日確定", "job-5": "書類合格" }, name: "古谷 颯人", lastName: "古谷", firstName: "颯人", furigana: "フルヤ ハヤト", lastNameKana: "フルヤ", firstNameKana: "ハヤト", gender: "男性", postalCode: "160-0022", address: "東京都新宿区新宿2-4-5", phone: "080-5678-1234", email: "furuyahayato@icloud.com", source: "Airwork", createdAt: "2026年02月27日", interviewAt: "未設定", status: "採用活動中", memo: "電話連絡は平日18時以降が希望。" },
  { id: "3", companyId: "2", appliedJobIds: [], name: "前田 崇志", lastName: "前田", firstName: "崇志", furigana: "マエダ タカシ", lastNameKana: "マエダ", firstNameKana: "タカシ", gender: "男性", postalCode: "220-0012", address: "神奈川県横浜市西区みなとみらい3-1-1", phone: "070-2468-1357", email: "maeda.aqua@gmail.com", source: "Q-Mate", createdAt: "2026年01月15日", interviewAt: "2026年04月19日 14:00", status: "採用活動中", memo: "接客経験が長く、オンライン面談調整済み。" },
  { id: "4", companyId: "3", appliedJobIds: [], name: "中山 創太", lastName: "中山", firstName: "創太", furigana: "ナカヤマ ソウタ", lastNameKana: "ナカヤマ", firstNameKana: "ソウタ", gender: "男性", postalCode: "330-0846", address: "埼玉県さいたま市大宮区大門町1-1", phone: "090-8765-4321", email: "soutanakayama876@gmail.com", source: "Airwork", createdAt: "2026年01月08日", interviewAt: "未設定", status: "他社紹介NG", memo: "履歴書確認待ち。" },
  { id: "5", companyId: "1", appliedJobIds: ["job-3", "job-5"], applicationStatuses: { "job-3": "内定通知", "job-5": "採用" }, name: "木村 理香子", lastName: "木村", firstName: "理香子", furigana: "キムラ リカコ", lastNameKana: "キムラ", firstNameKana: "リカコ", gender: "女性", postalCode: "150-0043", address: "東京都渋谷区道玄坂2-10-7", phone: "080-1122-3344", email: "kimura.lifeap@gmail.com", source: "Q-Mate", createdAt: "2026年01月05日", interviewAt: "2026年04月21日 16:30", status: "他社紹介済み", memo: "事務職も併願中。勤務地は渋谷希望。" },
  { id: "6", companyId: "4", appliedJobIds: [], name: "マッカラー BBS", lastName: "マッカラー", firstName: "BBS", furigana: "マッカラー ビービーエス", lastNameKana: "マッカラー", firstNameKana: "ビービーエス", gender: "その他", postalCode: "460-0008", address: "愛知県名古屋市中区栄3-5-1", phone: "070-9988-7766", email: "jbc.makara+11@gmail.com", source: "Airwork", createdAt: "2026年01月01日", interviewAt: "未設定", status: "他社紹介済み", memo: "日本語でのメール連絡を希望。" },
]

export const memoHistory = [
  { date: "2026年04月12日 15:30", author: "山田 太郎", body: "来月の採用計画について打ち合わせ済み。営業職2名の募集を優先。" },
  { date: "2026年04月07日 11:00", author: "山田 太郎", body: "求人票の文言修正依頼あり。サイトURLとメールアドレスを確認済み。" },
  { date: "2026年03月29日 17:45", author: "佐藤 美咲", body: "企業担当者より応募者対応のフロー共有あり。一次面接はオンライン実施。" },
]

export const secondaryScreeningAnswerSamples = {
  "1": {
    "job-1": [
      { question: "当企業に応募する理由を教えてください。", answer: "不動産営業の現場に近い環境で、営業アシスタントとして顧客対応力と事務処理力を高めたいと考えたためです。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "前職の接客経験を活かし、営業担当のサポートとお客様への丁寧な初期対応で、商談化率の向上に貢献できます。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "まずは営業アシスタントとして基礎を固め、将来的には提案や業務改善も担える存在になりたいです。" },
    ],
    "job-2": [
      { question: "当企業に応募する理由を教えてください。", answer: "顧客対応品質を大切にしている点に魅力を感じ、カスタマーサポートとして長期的に成長できると考えました。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "問い合わせの一次解決率を高めるため、FAQ整備や対応フロー改善にも主体的に関わります。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "サポート業務だけでなく、顧客の声をサービス改善へつなげられる担当者を目指します。" },
    ],
    "job-4": [
      { question: "当企業に応募する理由を教えてください。", answer: "未経験からでも挑戦できる反響営業の環境で、提案力を磨きながら成長したいと考えたためです。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "傾聴力と行動量を活かし、お客様の不安を解消しながら契約までのフォロー精度を高めます。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "反響営業の主力として成果を出し、将来的には後輩育成も担当できる人材になりたいです。" },
    ],
    "job-5": [
      { question: "当企業に応募する理由を教えてください。", answer: "営業支援を通じてチーム全体の成果に貢献できる役割に魅力を感じたためです。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "書類作成や顧客対応の正確性を高め、営業担当が提案活動に集中できる環境づくりに貢献できます。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "営業サポートの中心メンバーとして、業務改善提案も継続的に行える存在を目指します。" },
    ],
  },
  "2": {
    "job-2": [
      { question: "当企業に応募する理由を教えてください。", answer: "お客様の声に寄り添うサポート体制に共感し、自分の対応力を活かせると感じたためです。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "電話とチャットの両方で迅速かつ丁寧な対応を行い、顧客満足度向上に貢献できます。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "サポートチームの中核として、後輩育成や品質改善にも関わる存在になりたいです。" },
    ],
    "job-3": [
      { question: "当企業に応募する理由を教えてください。", answer: "不動産事務として、正確な事務処理と社内連携で現場を支える仕事に魅力を感じました。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "書類作成や進捗管理を丁寧に進めることで、営業の負荷軽減と対応スピード向上に貢献できます。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "業務フローを理解したうえで、事務部門の改善提案もできる担当者になりたいです。" },
    ],
    "job-4": [
      { question: "当企業に応募する理由を教えてください。", answer: "営業とサポートの両面で経験を積める点に魅力を感じ、自分の接客経験を活かせると考えました。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "お客様対応のスピードと丁寧さを両立し、面接前後の調整も含めて信頼構築に貢献します。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "まずは成果を安定して出し、将来的には顧客対応全体の品質向上を牽引したいです。" },
    ],
    "job-5": [
      { question: "当企業に応募する理由を教えてください。", answer: "賃貸営業の現場を支えるサポート業務に興味があり、チームで成果を出す働き方に魅力を感じました。" },
      { question: "自分自身をどの様に当企業へ貢献できますか。", answer: "調整力と事務処理力を活かし、営業担当と顧客双方がスムーズに動ける環境づくりを行います。" },
      { question: "当企業に将来にどのような姿になりますでしょうか。", answer: "営業サポートの実務を極め、繁忙期でも安定運用できる仕組み作りに貢献したいです。" },
    ],
  },
}

export const secondaryScreeningConsentText =
  "求職者情報をシステムに保持すること、および求職者が新しい勤め先をすばやく見つけられるよう、求職者情報を他の企業へ紹介することに同意します。"
