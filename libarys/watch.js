const video = document.getElementById('frame');
const control = document.getElementById('kontrol');
const socket = io.connect();

//Butonları Çekttik

const baslat_t = document.getElementById('baslat');
const durdur_t = document.getElementById('durdur');
const ial_t = document.getElementById('ial');
const gal_t = document.getElementById('gal');
const bal_t = document.getElementById('bal');
const te_t = document.getElementById('te');


// Buton Fonksiyonları ve Socket İşlemleri

function kontrol(){
	video.play();
	video.pause();
	video.currentTime = 0;
	
	control.style.display = "none";
	baslat_t.style.display = "inline-block";
	durdur_t.style.display = "inline-block";
	ial_t.style.display = "inline-block";
	gal_t.style.display = "inline-block";
	bal_t.style.display = "inline-block";
	te_t.style.display = "inline-block";

}

// Tam Ekrana Alma Fonksiyonu
function tamekran(){
	video.requestFullscreen();
}

// Başlatma Fonskyionu

function baslat(){
	video.play();
	socket.emit('baslatti');
}

// Durdurma Fonskyionu

function durdur(){
	video.pause();
	socket.emit('durdurdu');
}

// Geriye Alma Fonskyionu

function gal(){
	video.currentTime = video.currentTime - 5;
	socket.emit('gal');
}

// İleriye Alma Fonskyionu

function ial(){
	video.currentTime = video.currentTime + 5;
	socket.emit('ial');
}

// Başa Alma Fonskyionu

function bal(){
	video.currentTime = 0;
	video.pause();
	socket.emit('bal');
}

// Socket İşlemleri

// Başlatma Socketi
socket.on('baslatti', () => {
	video.play();
});

// Durdurma Socketi

socket.on('durdurdu', () => {
	video.pause()
});

// Geriye Alma Socketi

socket.on('gal', () => {
	video.currentTime = video.currentTime - 5;
});

// İleriye Alma Socketi

socket.on('ial', () => {
	video.currentTime = video.currentTime + 5;
});

// Başa Alma Socketi

socket.on('bal', () => {
	video.currentTime = 0;
	video.pause();
});


