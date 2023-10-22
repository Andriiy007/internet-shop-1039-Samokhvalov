const addForm = document.querySelectorAll('.add__form-text');
const addBtn = document.querySelector('.add__btn');

addBtn.addEventListener('click', async () => {
    submitForm(addForm);
});

function checkAllFields(item) {
    for (const key of item) {
        if (key.value === '') {
            return false;
        }
    }
    return true;
}

function checkPrice(price) {
    return !isNaN(parseFloat(price));
}

async function submitForm(item) {
    if (checkAllFields(item)) {
        const data = {
            category: item[0].value,
            id: parseInt(item[1].value),
            name: item[2].value,
            fits: item[3].value,
            availability: new Boolean(item[4].value),
            price: parseInt(item[5].value),
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
    } else {
        console.error('Помилка: всі поля повинні бути заповнені.');
    }
}




/* ============================================================================================ мій працюючий код 
document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.querySelectorAll('.add__form-text');
    const addBtn = document.querySelector('.add__btn');

    addBtn.addEventListener('click', async () => {
        submitForm(addForm);
    });

    function checkAllFields(item) {
        for (const key of item) {
            if (key.value === '') {
                return false;
            }
        }
        return true;
    }

    function checkPrice(price) {
        return !isNaN(parseFloat(price));
    }

    function submitForm(item) {
        if (checkAllFields(item)) {
            const data = {
                category: item[0].value ,
                id: item[1].value,
                name: item[2].value,
                fits: item[3].value,
                aviability: item[4].value,
                price: item[5].value,
            };

            if (checkPrice(data.price)) {
                const jsonData = JSON.stringify(data);
                const key = data.name.toString();
                localStorage.setItem(key, jsonData);
                console.log('Дані були збережені в LocalStorage.');
            } else {
                console.log('Помилка: ціна повинна бути числовою.');
            }
        } else {
            console.log('Помилка: всі поля повинні бути заповнені.');
        }
    }
}); 
*/