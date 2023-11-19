## 概要

様々なボタンを作って、カスタマイズして、コード化できる [Web サイト](https://yuu-oishi.github.io/color-pickers/)です！

---

## 個人用メモ

svg の型定義 (import エラー回避)

```
# /custom.d.ts
declare module "*.svg" {
  const content: any;
  export default content;
}
```

```
# tsconfig.json

"include": ["src", "custom.d.ts"],
```
