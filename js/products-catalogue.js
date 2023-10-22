window.addEventListener('DOMContentLoaded', getAllproducts);

class ProductRenderer {
    constructor(product) {
        this.product = product;
    }
    renderProduct() {
        const { category, id, name, fits, availability, price, currency } = this.product;
        const productList = document.getElementById('catalogue');
        productList.insertAdjacentHTML('beforeend', `
            <tr class="catalogue__table-li" id="${id}">
                <td>${category}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${fits}</td>
                <td>
                    <p class="status ${availability ? 'instock' : 'outstock'}">${availability ? 'instock' : 'out stock'}</p>
                </td>
                <td>${price} ${currency}</td>
                <td>
                    <button onclick='editProduct(${id})' class="catalogue__table-btn btn-edit">EDIT</button>
                    <button onclick='deleteProduct(${id})' class="catalogue__table-btn btn-delete" id="${id}">DEL</button>
                </td>
            </tr>
        `);
    }
}

async function deleteProduct(id) {
    const catalogueList = await fetch(`http://localhost:3000/api/catalogue.json/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await catalogueList.json();
    console.log(data);
    if (data) {
        document.getElementById(`product${id}`).remove();
    }
}

async function editProduct(id) {
    const catalogueList = await fetch(`http://localhost:3000/api/catalogue.json/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await catalogueList.json();
    console.log(data);
}

async function getAllproducts() {
    const catalogueList = await fetch('/UA-1039-Samokhvalov/API/catalogue.json');
    const products = await catalogueList.json();
    products.forEach(product => {
        const productRenderer = new ProductRenderer(product);
        productRenderer.renderProduct();
    });
}