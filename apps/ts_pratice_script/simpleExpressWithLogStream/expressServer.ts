import express, { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

// 創建 Express 應用
const app = express();

// 設定 log 檔案的路徑
const logFilePath = path.join(__dirname, 'requests.log');

// 創建一個可寫流，寫入到 log 檔案
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// 定義 middleware 記錄所有 HTTP 請求
app.use((req: Request, res: Response, next: NextFunction) => {
  const logEntry = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  logStream.write(logEntry, 'utf8');
  next();
});

// 設置一些範例路由
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/about', (req: Request, res: Response) => {
  res.send('About Page');
});

// 啟動伺服器
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
