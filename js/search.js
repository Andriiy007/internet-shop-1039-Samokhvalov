import { ProductsService } from './products-service.js';

document.addEventListener("DOMContentLoaded", () => {
    const productService = new ProductsService();

    productService.getProducts().then(products => {
        console.log(products);
        const productId = 1;
        productService.getProductById(productId).then(product => {
            if (product) {
                console.log(`Product found: ${product.name}`);
            } else {
                console.log(`Product with ID ${productId} not found.`);
            }
        });
    });

    const searchForm = document.querySelector(".catalogue__search-box");
    const resultContainer = document.querySelector(".catalogue__search-result");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const productName = document.querySelector(".searchbox__txt").value.trim().toLowerCase();
        const products = await productService.getProducts();
        const foundProduct = products.find(product => product.name.toLowerCase() === productName);

        if (foundProduct) {
            const productInfo = `
                <p><strong>Name:</strong> ${foundProduct.name}</p>
                <p><strong>ID:</strong> ${foundProduct.id}</p>
                <p><strong>Category:</strong> ${foundProduct.category}</p>
                <p><strong>Price:</strong> ${foundProduct.price} ${foundProduct.currency}</p>
                <p><strong>Fits:</strong> ${foundProduct.fits}</p>
            `;
            resultContainer.innerHTML = productInfo;
        } else {
            resultContainer.innerHTML = "<p>Product not found.</p>";
        }
    });
});