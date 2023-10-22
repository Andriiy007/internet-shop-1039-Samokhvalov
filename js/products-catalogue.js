// const search = document.querySelector('.products-catalogue__search-input');
// const tableRows = document.querySelectorAll('tbody tr');

// search.addEventListener('input', searchTable);

// function searchTable() {
//     tableRows.forEach((row, i) => {
//         let catalogueData = row.textContent.toLocaleLowerCase();
//         let searchData = search.value.toLocaleLowerCase();
//         row.classList.toggle('hidden', catalogueData.indexOf(searchData) < 0);
//         row.style.setProperty('--delay', i / 25 + 's');
//         setTimeout(() => {
//             if (row.classList.contains('hidden')) {
//                 row.remove();
//             }
//         }, 1000);
//     });
// }

// const sortBtns = document.querySelectorAll('.table__item-title');



// ================================================================================================ рендер продуктів на сайті метод GET =======================>>>



// document.addEventListener('DOMContentLoaded', function () {




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

async function getAllproducts() {
    const catalogueList = await fetch('/UA-1039-Samokhvalov/API/catalogue.json'); // существует гет параметр ?_limit=10
    const products = await catalogueList.json();
    console.log(products);
    products.forEach(product => productsToHTML(product));
}

window.addEventListener('DOMContentLoaded', getAllproducts);

function productsToHTML({ category, id, name, fits, aviability, price, currency }) {
    const productList = document.getElementById('catalogue');

    productList.insertAdjacentHTML('beforeend', `
    <tr class="catalogue__table-li" id="${id}">
    <td>${category}</td>
    <td>${id}</td>
    <td>${name}</td>
    <td>${fits}</td>
    <td>
        <p class="status ${aviability ? 'instock' : 'outstock'}"> ${aviability ? 'instock' : 'outstock'}</p>
    </td>
    <td>${price} ${currency}</td>
    <td>
        <button class="catalogue__table-btn btn-edit">EDIT</button>
        <button onclick='deleteProduct(${id})' class="catalogue__table-btn btn-delete" id="${id}">DELETE</button>
    </td>
    </tr>
    `);
}
// }); 