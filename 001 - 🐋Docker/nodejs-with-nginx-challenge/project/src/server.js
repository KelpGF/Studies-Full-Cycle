const http = require('http');
const { executeQuery } = require('./db-helper');

const port = process.env.API_PORT || 3000

http.createServer(async (req, res) => {
  const method = req.method

  if (method === 'GET') {
    const randomUsername = 'user-'+Math.random().toString(36).substring(7)
    const insertQuery = `INSERT INTO people (name) VALUES ('${randomUsername}')`
    await executeQuery(insertQuery)

    const selectQuery = `SELECT name FROM people`
    const peopleList = await executeQuery(selectQuery)

    let pageHTML = '<h1>Full Cycle Rocks!</h1>'
    peopleList.forEach(people => {
      pageHTML += `<p>${people.name}</p>`
    });

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(pageHTML)
  } else {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('<h1>Method not allowed</h1>')
  }
}).listen(port, () => { console.log('Server is running on http://localhost:'+port) })
