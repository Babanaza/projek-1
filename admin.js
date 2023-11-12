document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');

    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;

        // Получаем значения четырех описаний
        const productDescription1 = document.getElementById('productDescription1').value;
        const productDescription2 = document.getElementById('productDescription2').value;
        const productDescription3 = document.getElementById('productDescription3').value;
        const productDescription4 = document.getElementById('productDescription4').value;

        // Получаем массив выбранных изображений
        const productImagesInput = document.getElementById('productImages');
        const productImages = productImagesInput.files;

        // Проверяем, что выбран хотя бы один файл изображения
        if (!productImages || productImages.length === 0) {
            alert('Please select at least one image.');
            return;
        }

        // Создаем элемент товара
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div id="preview_${productName}" class="preview-container"></div>
            <div>
                <h3>${productName}</h3>
                <p>$${productPrice}</p>
                <p>${productDescription1}</p>
                <p>${productDescription2}</p>
                <p>${productDescription3}</p>
                <p>${productDescription4}</p>
            </div>
            <button class="delete-btn" onclick="deleteProduct(this)">Delete</button>
        `;

        // Добавляем товар в список
        productList.appendChild(productItem);

        // Показываем превью изображений
        const previewContainer = document.getElementById(`preview_${productName}`);
        for (let i = 0; i < productImages.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(productImages[i]);
        }

        // Очищаем форму
        addProductForm.reset();
    });

    window.deleteProduct = function(button) {
        const productItem = button.closest('.product-item');
        productItem.remove();
    };
});

// Функция для отображения превью изображений
function previewImages() {
    const input = document.getElementById('productImages');
    const previewContainer = document.getElementById('imagesPreview');
    previewContainer.innerHTML = '';

    const files = input.files;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'preview-image';
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
    }
}