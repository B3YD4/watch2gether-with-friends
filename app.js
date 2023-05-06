const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const usercli = require('./routes/authroutes');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const socketio = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// Görüntü Motoru Yüklüyoruz
app.set('view engine', 'ejs');

// Server'ı Dinlemeye Aldık
server = http.listen(PORT, (req, res) => {
    console.log("Server Ayağa Kaldırıldı!");
});

// Css dosyaları ve Terminal İçin Gerekli İşlemleri Yaptık
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('video'));
app.use(express.static('libarys'));
app.use(morgan('dev'));


// Socket İşlemleri
const io = socketio.listen(server);

io.on('connection', (socket) => {

	// Başlat İşlemi

	socket.on('baslatti', () => {
		socket.broadcast.emit('baslatti')
	});

	// Durdur İşlemi

	socket.on('durdurdu', () => {
		socket.broadcast.emit('durdurdu')
	})

	// Geriye Al İşlemi
	socket.on('gal', () => {
		socket.broadcast.emit('gal')
	});

	// İleriye Al İşlemi
	socket.on('ial', () => {
		socket.broadcast.emit('ial')
	});

	// Başa Al İşlemi
	socket.on('bal', () => {
		socket.broadcast.emit('bal')
	});
	
	socket.on('oal', (data) => {
		socket.broadcast.emit('oal', data)
	});

	socket.on('alarm', () => {
		socket.broadcast.emit('alarm')
	});

});

// Yönlendirmeler - Şema
app.use('/',usercli);
