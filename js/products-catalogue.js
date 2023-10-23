window.addEventListener("DOMContentLoaded", getAllproducts);

class ProductRenderer {
  constructor(product) {
    this.product = product;
    this.rate = 1;
  }
  renderProduct() {
    const { category, id, name, fits, availability, price} =
      this.product;
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
                    <p class="status ${
                      availability ? "instock" : "outstock"
                    }">${availability ? "instock" : "out stock"}</p>
                </td>
                <td class="editable-cell">${price} <select class="products__currency"> 
                <option value=USD>USD</option>
                <option value=EUR>EUR</option>
                <option value=UAH>UAH</option>
                </select></td>
                <td>
                    <button onclick='editProduct(${id})' class="catalogue__table-btn btn-edit" id="edit-${id}">EDIT</button>
                    <button onclick='deleteProduct(${id})' class="catalogue__table-btn btn-delete" id="del-${id}">DEL</button>
                </td>
            </tr>
        `
    );
    const convertTo = document.querySelector('.products__currency').value;
  }
}

async function deleteProduct(id) {
  const catalogueList = await fetch(
    `http://localhost:3000/api/catalogue.json/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await catalogueList.json();
  console.log(data);
  if (data) {
    document.getElementById(`product${id}`).remove();
  }
}

function editProduct(id) {
  const row = document.getElementById(id);
  const editButton = document.getElementById("edit-" + id);
  const editableCells = row.getElementsByClassName("editable-cell");

  // Перевіряємо поточний стан і змінюємо його
  if (editButton.textContent === "EDIT") {
    // Режим редагування
    for (let i = 0; i < editableCells.length; i++) {
      const cell = editableCells[i];
      cell.contentEditable = true; // Робимо поле редагування активним
      cell.classList.add("edit-mode"); // Додаємо стиль для виділення активного поля
    }
    editButton.textContent = "SAVE";
  } else {
    // Зберігаємо зміни та виходимо з режиму редагування
    for (let i = 0; i < editableCells.length; i++) {
      const cell = editableCells[i];
      cell.contentEditable = false; // Закриваємо поле редагування
      cell.classList.remove("edit-mode"); // Видаляємо стиль виділення активного поля
    }
    editButton.textContent = "EDIT";
  }
}

// async function editProduct(id) {
//     const catalogueList = await fetch(`http://localhost:3000/api/catalogue.json/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const data = await catalogueList.json();
//     console.log(data);
// }

async function getAllproducts() {
  const catalogueList = await fetch("/UA-1039-Samokhvalov/API/catalogue.json");
  const products = await catalogueList.json();
  products.forEach((product) => {
    const productRenderer = new ProductRenderer(product);
    productRenderer.renderProduct();
  });
  convertCurrency(convertTo);
}

async function convertCurrency(rate) {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const currencies = await response.json();
    return rate = currencies.rates[convertTo];
}