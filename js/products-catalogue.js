const search = document.querySelector('.products-catalogue__search-input');
const tableRows = document.querySelectorAll('tbody tr');

search.addEventListener('input', searchTable);

function searchTable() {
    tableRows.forEach((row, i) => {
        let catalogueData = row.textContent.toLocaleLowerCase();
        let searchData = search.value.toLocaleLowerCase();
        row.classList.toggle('hidden', catalogueData.indexOf(searchData) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
        setTimeout(() => {
            if (row.classList.contains('hidden')) {
                row.remove();
            }
        }, 1000);
    });
}

const sortBtns = document.querySelectorAll('.table__item-title');

