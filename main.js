const http = require('http');
const users = require('./users');
const fs = require('fs');


const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.end(`<form action="/" method="POST">
        <label>First Name: </label>
        <input type="text" name="Users[firstName]" value="" /><br />
        <label>Last Name: </label>
        <input type="text" name="Users[lastName]" value="" /><br />
        <label>Age: </label>
        <input type="text" name="Users[age]" value="" /><br />
        <input type="submit" value="Submit">
    </form>`)
    }

    if (req.url === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } else if (req.url === '/' && req.method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' })

        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                //Can't get this part to work
                fs.readFile(users, (data) => {
                    let user = JSON.parse(data);
                    user.push(json);
                    fs.writeFile('./users.json', JSON.stringify(user));
                    console.log(user);
                })
            } catch (error) {
                console.error(error.message);
            };
        });
    }
})
server.listen(8080);



