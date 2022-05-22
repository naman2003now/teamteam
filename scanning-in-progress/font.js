const setFontSize = () => {
	document.getElementById("scanning-in-progress-text").style.fontSize = `${
		window.innerWidth / 10
	}px`;
};

window.addEventListener("resize", () => {
	setFontSize();
});

var i = 0;

setInterval(() => {
	i++;
	document.getElementById("scanning-in-progress-text").innerHTML =
		"Scanning" + ".".repeat(i % 5 > 3 ? 3 : i % 5);
}, 500);

setFontSize();
