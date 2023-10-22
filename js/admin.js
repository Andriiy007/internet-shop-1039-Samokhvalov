document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.querySelectorAll('.add__form-text');
    const addBtn = document.querySelector('.add__btn');

    addBtn.addEventListener('click', () => {
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