const http = require('http');
const mysql = require('mysql');

console.log({
  database: process.env.DB_MYSQL_DATABASE || 'test',
  host: process.env.DB_MYSQL_HOST || 'localhost',
  port: process.env.DB_MYSQL_PORT || '3306',
  user: process.env.DB_MYSQL_USER || 'root',
  password: process.env.DB_MYSQL_PASSWORD || 'root'
})

const connection = mysql.createConnection({
  database: process.env.DB_MYSQL_DATABASE || 'test',
  host: process.env.DB_MYSQL_HOST || 'localhost',
  port: process.env.DB_MYSQL_PORT || '3306',
  user: process.env.DB_MYSQL_USER || 'root',
  password: process.env.DB_MYSQL_PASSWORD || 'root'
});

const query = 'INSERT INTO people (name) VALUES ("test")';
connection.query(query);
connection.end();

http.createServer((req, res) => {
  const method = req.method;

  console.log(`Request received with method: ${method}`);

  if (method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed\n');
  }
}
).listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});