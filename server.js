'use strict';

const fs = require('fs');
const http = require('https');
const options = {
	  key: fs.readFileSync('/etc/letsencrypt/live/chat.techedu.cf/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/chat.techedu.cf/cert.pem')
};


const port = 3001;

const server = http.createServer(options, (req, res) => {
	let file = req.url;
	if(file === '/') {
		file = '/index.html';
	}

	file = __dirname + '/public' + file;

	fs.readFile(file, (err, data) => {
		if(err) {
			return;
		}

		res.write(data);
		res.end();
	});
}).listen(port, '127.0.0.1');

const io = require('socket.io')(server);
const users = require('./app/users.js');

io.sockets.on('connection', users.connect);
