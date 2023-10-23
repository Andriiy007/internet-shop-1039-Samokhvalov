"use strict";
window.addEventListener('DOMContentLoaded', getAllproducts);

function renderProduct(product) {
    const { category, id, name, fits, availability, price, currency } = product;
    const productList = document.getElementById("catalogue");
    productList.insertAdjacentHTML(
        "beforeend",
        `
        <tr class="catalogue__table-li" id="${id}">
          <td class="editable-cell">${category}</td>
          <td class="editable-cell">${id}</td>
          <td class="editable-cell">${name}</td>
          <td class="editable-cell">${fits}</td>
          <td>
            <p class="status ${availability ? "instock" : "outstock"}">${availability ? "instock" : "out stock"
        }</p>
          </td>
          <td class="editable-cell">${price} ${currency}</td>
          <td>
            <button onclick='myModal(${id})' class="catalogue__table-btn btn-edit" id="edit-${id}">EDIT</button>
            <button onclick='deleteProduct(${id})' class="catalogue__table-btn btn-delete" id="del-${id}">DEL</button>
          </td>
        </tr>
      `
    );
}

async function myModal(id) {
    await getProductById(id);
    document.querySelector('.change__form').classList.remove('hidden');
}

async function closeMyModal() {
    document.querySelector('.add__form').remove();
    document.querySelector('.change__form').classList.add('hidden')
}

async function getProductById(id) {
    const response = await fetch('/UA-1039-Samokhvalov/API/catalogue.json');
    const products = await response.json();
    const item = products.find(product => product.id === id);
    window.addEventListener('DOMContentLoaded',changeItem(item));

    await editProduct(item);
}

async function changeItem(product) {
    const changeForm = document.querySelector('.admin__add-form');
    changeForm.insertAdjacentHTML(
        "afterbegin", `
        <ul class="add__form">
            <li class="add__form-li"><span class="add__form-name">Item Category:</span>
                <select class="add__form-text" type="text">
                    <option class="list-item">${product.category}</option>
                    <option class="list-item">Engine</option>
                    <option class="list-item">Brakes</option>
                    <option class="list-item">Exhaust</option>
                    <option class="list-item">Suspension</option>
                    <option class="list-item">Body</option>
                    <option class="list-item">Interior</option>
                </select>
            </li>
            <li class="add__form-li"><label class="add__form-name">Item Code:</label>
                <input class="add__form-text" type="text" value="${product.id}">
            </li>
            <li class="add__form-li"><span class="add__form-name">Item Name:</span>
                <inputclass="add__form-text" type="text"  value="${product.name}">
            </li>
            <li class="add__form-li"><span class="add__form-name">Item Fits:</span>
                 <input class="add__form-text" type="text"  value="${product.fits}">
            </li>
            <li class="add__form-li"><span class="add__form-name">Item Available:</span>
                <select class="add__form-text" type="text">
                    <option class="list-item">${product.availability}</option>
                    <option class="list-item">True</option>
                    <option class="list-item">False</option>
                </select>
            </li>
            <li class="add__form-li"><span class="add__form-name">Item Price:</span><input
                    class="add__form-text" type="text"  value="${product.price}">
            </li>
            <li class="add__form-li"><span class="add__form-name">Currency:</span>
                <select class="add__form-text" type="text">
                    <option class="list-item">${product.currency}</option>
                    <option class="list-item">USD</option>
                    <option class="list-item">EUR</option>
                    <option class="list-item">UAH</option>
                </select>
            </li>
        </ul>
        <div class="add__form-text">
            <span class="login-box"><button onclick="editProduct(item)" class="add__btn btn-change" id="btn-change" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>Confirm changes</button>
            </span>
             <span class="login-box"><button onclick="closeMyModal()" class="btn-close add__btn" id="btn-close" type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>Close</button>
            </span>
        </div>
`
    );
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

async function getAllproducts() {
    const catalogueList = await fetch('/UA-1039-Samokhvalov/API/catalogue.json');
    const products = await catalogueList.json();
    products.forEach(product => {
        renderProduct(product);
    });
}



async function editProduct(item) {
    const data = {
        category: item[0].value,
        id: parseInt(item[1].value),
        name: item[2].value,
        fits: item[3].value,
        availability: new Boolean(item[4].value),
        price: parseInt(item[5].value),
        currency: item[6].value,
    };

    if (checkPrice(data.price)) {
        const jsonData = await fetch('http://localhost:3000/api/catalogue.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (jsonData.ok) {
            const product = await jsonData.json();
            console.log(product);
            console.log('Дані були збережені на сервері.');
        } else {
            console.error('Помилка при відправці даних на сервер.');
        }
    } else {
        console.error('Помилка: поле "price" має бути числовим значенням.');
    }
}