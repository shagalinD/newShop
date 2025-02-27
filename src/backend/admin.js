const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8080

let products = [
  {
    id: 1,
    title: 'Продукт 1',
    price: '5000',
    description: 'Описание продукта 1',
    category: 'Электроника',
  },
  {
    id: 2,
    title: 'Продукт 2',
    price: '3000',
    description: 'Описание продукта 2',
    category: 'Одежда',
  },
  {
    id: 3,
    title: 'Продукт 3',
    price: '2000',
    description: 'Описание продукта 3',
    category: 'Электроника',
  },
]

const categories = ['Электроника', 'Одежда', 'Мебель']

const server = http.createServer((req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Обработка предварительных запросов (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // Возвращаем HTML-страницу для /admin
  if (req.url === '/' && req.method === 'GET') {
    const filePath = path.join(__dirname, '..', 'frontend', 'admin.html')
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Ошибка сервера')
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      }
    })
    return
  }

  // API для получения списка категорий
  if (req.url === '/api/categories' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(categories))
    return
  }

  // API для получения списка товаров
  if (req.url === '/api/products' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
    return
  }

  // API для получения товаров по категории
  if (req.url.startsWith('/api/products/category/') && req.method === 'GET') {
    const category = decodeURIComponent(req.url.split('/')[4])
    const filteredProducts = products.filter(
      (product) => product.category === category
    )
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(filteredProducts))
    return
  }

  // API для добавления товара
  if (req.url === '/api/products' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const newProduct = JSON.parse(body)
      newProduct.id = products.length + 1
      products.push(newProduct)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newProduct))
    })
    return
  }

  // API для удаления товара
  if (req.url.startsWith('/api/products/') && req.method === 'DELETE') {
    const productId = parseInt(req.url.split('/')[3])
    products = products.filter((product) => product.id !== productId)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Товар удалён' }))
    return
  }

  // API для редактирования товара
  if (req.url.startsWith('/api/products/') && req.method === 'PUT') {
    const productId = parseInt(req.url.split('/')[3])
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const updatedProduct = JSON.parse(body)
      products = products.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updatedProduct))
    })
    return
  }

  // Если маршрут не найден
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('404: Страница не найдена')
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
