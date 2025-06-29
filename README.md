# 紹介
集中しすぎて時間を忘れがちなあなたへ

# 使い方
## ローカル環境にクローンなど
```
git clone https://github.com/YOUR_USERNAME/break-your-concentration.git
cd break-your-concentration
npm install
```

## 通知時刻の設定変更
punchInHourとpunchInMinuteの数字を、通知を受け取りたい時刻に合わせて変更してください。

例: 毎日平日午前9時55分に通知したい場合
```
main.js
// --- スケジュール設定start ---
  const punchInHour = 9;
  const punchInMinute = 55;
```

## アプリ起動
```
npm run build
```
release配下に生成された.dmgファイルを開いて、アプリを起動してください。

# 参考
https://zenn.dev/sprout2000/books/6f6a0bf2fd301c/viewer/13263

https://www.electronjs.org/ja/docs/latest/
