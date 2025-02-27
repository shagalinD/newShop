const http = require('http')
const fs = require('fs')
const path = require('path')

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

const PORT = 3000

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === '/' ? 'index.html' : req.url
  )
  const extname = path.extname(filePath)
  const contentType = mimeTypes[extname] || 'text/plain'

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Файл не найден
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404: Файл не найден')
      } else {
        // Другая ошибка сервера
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Ошибка сервера')
      }
    } else {
      // Успешный ответ
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
