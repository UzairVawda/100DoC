const http = require('http')

function requestHandler(req, res) {
	if (req.url === '/') {
		res.statusCode = 200;
		res.end('<h1>Hello World!</h1>')
	} else if (req.url === '/currenttime') {
		res.statusCode = 200;
		res.end('<h1>' + new Date().toISOString() + '</h1>');
	} else {
		res.statusCode = 404;
		res.end('<h1>PAGE NOT FOUND</h1>')
	}
}

const server = http.createServer(requestHandler)

server.listen(6969)