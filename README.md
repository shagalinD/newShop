# README для проекта

## Описание проекта

Данный проект представляет собой серверное приложение, которое предоставляет API для управления товарами и категориями. Он включает в себя два основных компонента:

1. **admin.js** - сервер для администрирования товаров.
2. **server.js** - сервер для обслуживания статических файлов и основной логики приложения.

## Установка

### Требования

- Node.js (версии 12 и выше)
- npm (Node Package Manager)

### Шаги установки

1. Клонируйте репозиторий:
   ```bash
   git clone <URL_репозитория>
   cd <имя_папки_репозитория>
   ```

2. Установите зависимости (если есть):
   ```bash
   npm install
   ```

## Запуск приложения

### Запуск сервера администрирования

Для запуска сервера администрирования выполните следующую команду:

```bash
node MultipleFiles/admin.js
```

Сервер будет доступен по адресу: `http://localhost:8080`

### Запуск основного сервера

Для запуска основного сервера выполните следующую команду:

```bash
node MultipleFiles/server.js
```

Сервер будет доступен по адресу: `http://localhost:3000`

## API

### Эндпоинты

- **GET /api/categories**: Получить список категорий.
- **GET /api/products**: Получить список всех товаров.
- **GET /api/products/category/{category}**: Получить список товаров по категории.
- **POST /api/products**: Добавить новый товар.
- **PUT /api/products/{id}**: Обновить существующий товар.
- **DELETE /api/products/{id}**: Удалить товар.

### Пример запросов

- Получение всех товаров:
  ```bash
  curl -X GET http://localhost:8080/api/products
  ```

- Добавление нового товара:
  ```bash
  curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"title": "Продукт 4", "price": "4000", "description": "Описание продукта 4", "category": "Мебель"}'
  ```

## Структура проекта

```
/project-root
│
├── MultipleFiles
│   ├── admin.js        # Сервер для администрирования товаров
│   └── server.js       # Сервер для обслуживания статических файлов
│
└── frontend
    ├── admin.html      # HTML-страница для администрирования
    └── index.html      # Главная HTML-страница
```

## Лицензия

Этот проект лицензирован под MIT License. 

## Контакты

Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по электронной почте: [ваш_email@example.com]
