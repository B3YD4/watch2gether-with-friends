const video = document.getElementById('frame');
const control = document.getElementById('kontrol');
const user_id = document.getElementById('id');
const socket = io.connect();

//Butonları Çekttik

const baslat_t = document.getElementById('baslat');
const durdur_t = document.getElementById('durdur');
const ial_t = document.getElementById('ial');
const oal_t = document.getElementById('oal');
const gal_t = document.getElementById('gal');
const bal_t = document.getElementById('bal');
const te_t = document.getElementById('te');
const alarm_t = document.getElementById('alarm');

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
	oal_t.style.display = "inline-block";
	alarm_t.style.display = "inline-block";

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
	socket.emit('durdurdu');
	video.pause();
}

// Olduğun Zamana Alma

function oal(){
	let zaman = video.currentTime;
	socket.emit('oal', zaman)
}

// Geriye Alma Fonskyionu

function gal(){
	socket.emit('gal');
	video.currentTime = video.currentTime - 5;
}

// İleriye Alma Fonskyionu

function ial(){
	socket.emit('ial');
	video.currentTime = video.currentTime + 5;
}

// Başa Alma Fonskyionu

function bal(){
	video.currentTime = 0;
	video.pause();
	socket.emit('bal');
}

// Alarm Fonskyionu

function alarm(){
	socket.emit('alarm');
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

// Başa Alma Socketi

socket.on('oal', (data) => {
	video.currentTime = data;
});

// Alarm Socketi

socket.on('alarm', () => {
	alert('Alarm! Birisi Tarafından Alarm Gönderildi! Bir Sorun Olabilir, Arkadaşların ile İletişimini Kontrol Et!')
});

// Socket ID Bilgisini Alıyoruz

socket.on('id', (data) => {
	user_id.innerHTML = "Kullanıcı ID'niz: " + data.id
});
