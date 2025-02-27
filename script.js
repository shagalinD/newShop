console.log('start')

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:8080/api/products')

    if (!response.ok) {
      throw new Error('Сетевая ошибка при получении данных')
    }

    const products = await response.json()
    displayProducts(products)
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

function displayProducts(products) {
  const container = document.getElementById('product-container')
  container.innerHTML = '' // Очищаем контейнер перед добавлением новых карточек

  products.forEach((product) => {
    const col = document.createElement('div')
    col.className = 'col-md-4 mb-4'
    col.innerHTML = `<div class='card'>
        <div class='card-body'>
          <h5 class='card-title'>${product.title}</h5>
          <h6 class='card-subtitle mb-2 text-muted'>
            Цена: ${product.price} руб.
          </h6>
          <p class='card-text'>${product.description}</p>
        </div>
      </div>`
    container.appendChild(col)
  })
}

// Вызов функции для получения и отображения продуктов при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchProducts)
