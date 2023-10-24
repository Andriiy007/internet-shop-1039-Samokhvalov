const fs = require("fs").promises;
const http = require("http");
const url = require("url");
const catalogue = require("./API/catalogue.json");

const PORT = 5000;

const server = http.createServer(async function (req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, PUT, GET, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": 2592000, // 30 days
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  } else if (req.method === "GET" && req.url === "/api/catalogue.json") {
    res.writeHead(200, {
      ...headers,
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(catalogue));
    return;
  } else if (
    req.method === "DELETE" &&
    req.url.startsWith("/api/catalogue.json/")
  ) {
    const parts = req.url.split("/");
    const id = parseInt(parts[parts.length - 1], 10);
    const index = catalogue.findIndex((product) => product.id === id);
    if (index !== -1) {
      catalogue.splice(index, 1);
      await fs.writeFile("API/catalogue.json", JSON.stringify(catalogue));
      res.writeHead(202, {
        ...headers,
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ id }));
    } else {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("Продукт не знайдено");
    }
  } else if (req.method === "POST" && req.url === "/api/catalogue.json") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        catalogue.push(data);
        await fs.writeFile("api/catalogue.json", JSON.stringify(catalogue));

        res.writeHead(200, {
          ...headers,
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(data));
      } catch (error) {
        res.writeHead(400, { ...headers, 'Content-Type': 'application/json' });
        res.end("Помилка при обробці запиту.");
      }
    });
  } else if (
    req.method === "PUT" &&
    req.url.startsWith("/api/catalogue.json/")
  ) {
    const parts = req.url.split("/");
    const id = parseInt(parts[parts.length - 1], 10);
    const index = catalogue.findIndex((product) => product.id === id);

    if (index !== -1) {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", async () => {
        try {
          const body = JSON.parse(data);
          catalogue[index] = body;
          await writeFile("API/catalogue.json", JSON.stringify(catalogue));
          await writeFile(index + ".json", JSON.stringify(body));
          res.writeHead(200, {
            ...headers,
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({ message: "updated succesfully"}));
        } catch (error) {
          res.writeHead(400, { ...headers, 'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: "Некоректні дані" }));
        }
      });
    } else {
      res.writeHead(404, { ...headers, "Content-Type": "application/json" });
      res.end("Сторінку не знайдено");
    }
  }
});

server.listen(PORT);
console.log(`Сервер працює на порті ${PORT}`);
