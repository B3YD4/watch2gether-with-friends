function videoAc() {
	var embed = document.getElementById("url").value
	var embed2 = embed.slice("-11");
	document.getElementById('frame').src = "https://www.youtube.com/embed/" + embed2 + "?";
}