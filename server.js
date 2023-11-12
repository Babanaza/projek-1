const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Используем middleware для разбора тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Хранилище данных
const products = [];

// Разрешаем запросы с других доменов (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Роут для получения списка товаров
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Роут для добавления нового товара
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
});

// Роут для удаления товара
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));