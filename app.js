const http = require("http");
const fs = require("fs/promises");
const { formidable } = require("formidable");
const server = http.createServer(async (req, res) => {
  // 首頁
  if (req.method === "GET" && req.url === "/") {
    const html = await fs.readFile("./index.html", "utf-8");

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    res.end(html);
    return;
  }

  // 上傳
  /*  req.method === "POST" && req.url === "/upload" 對應前端：
    <form action="/upload" method="POST" enctype="multipart/form-data"></form>
  */
  if (req.method === "POST" && req.url === "/upload") {
    //建立 formidable 解析器。
    const form = formidable({
      uploadDir: "./uploads", //上傳檔案會被存到 uploads 資料夾。注意：這個資料夾要先存在。
      keepExtensions: true, //保留副檔名。
    });

    //解析請求
    form.parse(req, (err, fields, files) => {
      /* 
        解析完成後，會進入 callback。
        三個參數：
            err：錯誤。
            fields：非檔案資料欄位。
            files：檔案資料欄位。
    */
      if (err) {
        console.log(err);

        res.writeHead(400, {
          "Content-Type": "text/plain; charset=utf-8",
        });

        res.end("上傳失敗");
        return;
      }

      // 非檔案欄位會出現在 fields；檔案欄位會出現在 files。
      console.log("fields =", fields); //印出非檔案資料物件
      console.log("files =", files); //印出檔案資料物件

      // 前端 <input name="欄位名稱"> 的 name 會成為 fields/files 物件裡的 key。
      /*fields/files 都是物件
        key = 前端 input 的 name
        value = 陣列
                因此需要用 array[0] 取得值或檔案物件。
      */
      const avatar = files.avatar?.[0];
      if (avatar) {
        console.log("原始檔名:", avatar.originalFilename); //印出使用者原本上傳的檔名。
        console.log("大小:", avatar.size); //印出檔案大小。
        console.log("路徑:", avatar.filepath); //印出 formidable 實際存到磁碟的位置。
      }
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
      });

      res.end("上傳成功");
    });

    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(3000, () => {
  console.log("Server running");
});

/*
在前端表單輸入 celia、29
並上傳一張圖片

---- console 結果 -----

fields = { username: [ 'celia' ], age: [ '29' ] }
files = {
  avatar: [
    PersistentFile {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      lastModifiedDate: 2026-06-18T02:37:38.845Z,
      filepath: 'C:\\Users\\celia\\OneDrive\\桌面\\backend\\2026-nodejs-camp\\daily-missions\\05-formidable\\uploads\\ilvtvqt481rixtzvvwq6gwi8e.png',
      newFilename: 'ilvtvqt481rixtzvvwq6gwi8e.png',
      originalFilename: '螢幕擷取畫面 2024-10-16 182040.png',
      mimetype: 'image/png',
      hashAlgorithm: false,
      size: 166677,
      _writeStream: [WriteStream],
      hash: null,
      Symbol(shapeMode): false,
      Symbol(kCapture): false
    }
  ]
}
原始檔名: 螢幕擷取畫面 2024-10-16 182040.png
大小: 166677
路徑: C:\Users\celia\OneDrive\桌面\backend\2026-nodejs-camp\daily-missions\05-formidable\uploads\ilvtvqt481rixtzvvwq6gwi8e.png

*/
