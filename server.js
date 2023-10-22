const fs = require('fs').promises;
const { json } = require('stream/consumers');
const catalogue = require('./API/catalogue.json');
// const admin = require('./js/admin.js');
const http = require('http');
const PORT = 3000; 

const server = http.createServer(function(req, res) {  // <<<<<------  Роутер (функція, яка представляє собою роутер, який аналізує запити користувача (аргумент: req = на який саме ресурс звертається користувач))
    // res - це обєкт який треба викликати, щоб відправити щось на фронт-енд)
    console.log(req.url); // налаштування роутів: якщо постукались туди-то , то треба зробити наступне.
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write('<h1>Names:</h1>');
    catalogue.forEach(item =>{
        res.write(`<li>${item.name}</li>`);
    })
    // необхідно вказати, які саме дані ми передаємо. який заголовок функцією res.writeHead(200, {'Content-Type' : 'text/html'}) - в цьому випадку клієнт розуміє що прийшов html і він його може одразу відрендерити.
    res.end(`</ul>`);

// щоб відправити відповідь, необхідно використати функцію res.end();
});

server.listen(PORT); // щоб відправляти запити на сервери, необхідно вказати функцію listen() , в яку необхідно додати порт, який буде слідкувати за портом і опрацьовувати запити.
console.log(`SERVER running at ${PORT}`);


// async function start() {
//     console.log('STARTED');
//     await fs.writeFile('test.txt', 'hello world');
//     console.log('end of writing');
//     const data = await fs.readFile('./API/catalogue.json', 'utf8');
//     console.log(data);
// }
// start();





// ===================================================================================== Код для роботи без .promises

// fs.writeFile('test.txt', 'hello world', () => {
//     console.log('end of writing');
//     fs.readFile('./API/catalogue.json', 'utf8', (err, data) => {
//         console.log(data);
//         console.log('end');
//     });
// });




// ===================================================================================== Приклад обробки JSON файлу.
/* const server = http.createServer(function(req, res) { 
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write('<h1>Names:</h1>');
    catalogue.forEach(item =>{
        res.write(`<li>${item.name}</li>`);
    })
    res.end(`</ul>`);
});
*/