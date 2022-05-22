const tap_to_scan = {
	head: `
    <link rel="stylesheet" href="../common/footer/footer.css" />
		<link
			rel="stylesheet"
			href="./common/mobile-navbar/mobile-navbar.css"
		/>
		<link rel="stylesheet" href="./tap-to-scan/tap-to-scan-image.css" />
		<title>Scanning card</title>
  `,
	body: `
    <navbar>
			<img src="./resources/leftarrow.svg" id="navbar-back" />
			<img src="./resources/ScanCard.svg" id="navbar-text" />
		</navbar>
		<img id="tap-to-scan-image" src="../resources/tapToScan.svg" />
		<footer>
			<img id="footer-home" src="./resources/home.svg" />
			<img id="footer-faq" src="./resources/home.svg" />
		</footer>
  `,
};

const scanning_in_progress = {
	body: `
    <navbar>
			<img src="./resources/leftarrow.svg" id="navbar-back" />
		</navbar>
		<div id="scanning-in-progress">
			<img
				id="scanning-in-progress-image"
				src="./resources/scanning.svg"
			/>
			<h1 id="scanning-in-progress-text">Scanning</h1>
		</div>
		<footer>
			<img id="footer-home" src="./resources/home.svg" />
			<img id="footer-faq" src="./resources/home.svg" />
		</footer>

		<script src="./scanning-in-progress/font.js"></script>
  `,

	head: `
    <title>Document</title>
		<link rel="stylesheet" href="./scanning-in-progress/style.css" />
		<link rel="stylesheet" href="./scanning-in-progress/scanning-in-progress.css" />

		<link rel="stylesheet" href="./common/footer/footer.css" />

		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
			rel="stylesheet"
		/>

		<link
			rel="stylesheet"
			href="../common/mobile-navbar/mobile-navbar.css"
		/>
    `,
};

const add_member = {
	head: `
    <link rel="stylesheet" href="./common/footer/footer.css" />
		<link
			rel="stylesheet"
			href="./common/mobile-navbar/mobile-navbar.css"
		/>
		<link rel="stylesheet" href="./add-member/add-member.css" />

		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
			rel="stylesheet"
		/>
		<title>Document</title>
  `,

	body: `
    <navbar style="background-color: white">
			<img src="../resources/leftarrow.svg" id="navbar-back" />
		</navbar>
		<img
			id="randomPhoto"
			src="../resources/someRandomPhotoDetailsPage.svg"
		/>
		<form id="member-form">
			<div class="form-field-container">
				<p class="form-field-lable">Serial Number</p>
				<input type="text" class="form-field-input" id="serialNumber"/>
			</div>
			<div class="form-field-container">
				<p class="form-field-lable">Name</p>
				<input type="text" class="form-field-input" />
			</div>
			<div class="form-field-container">
				<p class="form-field-lable">Phone Number</p>
				<input type="text" class="form-field-input" />
			</div>
			<div class="form-field-container">
				<p class="form-field-lable">Email</p>
				<input type="text" class="form-field-input" />
			</div>
		</form>
		<button id="form-next-button">Next</button>
		<footer>
			<img id="footer-home" src="../resources/home.svg" />
			<img id="footer-faq" src="../resources/home.svg" />
		</footer>
  `,
};

const set_tap_to_scan = async () => {
	document.head.innerHTML = tap_to_scan.head;
	document.body.innerHTML = tap_to_scan.body;

	document
		.getElementById("tap-to-scan-image")
		.addEventListener("click", () => {
			set_scanning_in_progress();
		});
};

const set_scanning_in_progress = async () => {
	document.body.innerHTML = scanning_in_progress.body;
	document.head.innerHTML = scanning_in_progress.head;

	const setFontSize = () => {
		document.getElementById(
			"scanning-in-progress-text"
		).style.fontSize = `${window.innerWidth / 10}px`;
	};

	window.addEventListener("resize", () => {
		setFontSize();
	});

	var i = 0;

	const scanning_animation = setInterval(() => {
		i++;
		document.getElementById("scanning-in-progress-text").innerHTML =
			"Scanning" + ".".repeat(i % 5 > 3 ? 3 : i % 5);
	}, 500);

	setFontSize();

	document.getElementById("navbar-back").addEventListener("click", () => {
		clearInterval(scanning_animation);
		set_tap_to_scan();
	});

	if (!("NDEFReader" in window)) {
		document.body.innerHTML = "No support for NFC!";
	}

	const ndef = new NDEFReader();
	await ndef.scan();

	ndef.addEventListener("reading", (card) => {
		set_add_member(card.serialNumber);
	});
};

const set_add_member = (serialNumber) => {
	document.body.innerHTML = add_member.body;
	document.head.innerHTML = add_member.head;

	document.getElementById("serialNumber").value = serialNumber;
};

set_tap_to_scan();
