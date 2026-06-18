# Node.js formidable 使用練習

原生 Node.js 不會自動解析表單和上傳的檔案，因此常借助套件來將表單內容和檔案資料解析和儲存。
此練習使用 formidable 套件來解析 `multipart/form-data` 格式的表單資料，並完成檔案上傳功能。

---

## 功能

- 解析 `multipart/form-data` 請求
- 接收文字欄位資料
- 接收圖片檔案
- 將上傳檔案儲存至 `uploads` 資料夾
- 顯示檔案資訊

---

## 使用技術

- Node.js
- HTTP Module
- fs/promises
- formidable

---

## 專案結構

```text
.
├─ app.js
├─ index.html
└─ uploads/
```

---

## 學習重點

### multipart/form-data

檔案上傳時，瀏覽器會使用 `multipart/form-data` 格式傳送資料。

```html
<form
  action="/upload"
  method="POST"
  enctype="multipart/form-data"
>
```

---

### formidable v3

formidable 會將解析結果分為：

- `fields`：非檔案資料欄位
- `files`：檔案資料欄位

```js
fields = {
  username: ["celia"]
};

files = {
  avatar: [fileObject]
};
```

---

### fields / files 結構

- `fields` / `files` 都是物件（Object）
- key = 前端 `<input>` 的 `name`
- value = 陣列（Array）

例如：

```html
<input type="text" name="username" />
<input type="file" name="avatar" />
```

解析結果：

```js
fields = {
  username: ["celia"]
};

files = {
  avatar: [fileObject]
};
```

因此需要透過：

```js
fields.username?.[0];
files.avatar?.[0];
```

取得第一個值或第一個檔案物件。

---

## 範例結果

```js
fields = {
  username: ["celia"],
  age: ["29"]
};

files = {
  avatar: [
    PersistentFile {
      originalFilename: "cat.png",
      size: 166677,
      filepath: "./uploads/xxxxx.png"
    }
  ]
};
```

---

## 心得

透過本次練習了解：

- `multipart/form-data` 的用途
- formidable 的基本使用方式
- `fields` 與 `files` 的資料結構
