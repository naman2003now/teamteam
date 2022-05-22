const mongo_url = "https://technica-hack.herokuapp.com";

const footer = `<footer>
		<img id="footer-home" src="./resources/home.svg" />
		<img id="footer-faq" src="./resources/faq.svg" />
	</footer>`;

const tap_to_scan = {
	head: `
    <link rel="stylesheet" href="./common/footer/footer.css" />
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
		<img id="tap-to-scan-image" src="./resources/tapToScan.svg" />
		${footer}
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
		${footer}

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
			href="./common/mobile-navbar/mobile-navbar.css"
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
			<img src="./resources/leftarrow.svg" id="navbar-back" />
		</navbar>
		<img
			id="randomPhoto"
			src="./resources/someRandomPhotoDetailsPage.svg"
		/>
		<form id="member-form">
			<div class="form-field-container">
				<p class="form-field-lable">Serial Number</p>
				<input type="disabled" class="form-field-input" id="serialNumber"/>
			</div>
			<div class="form-field-container">
				<p class="form-field-lable">Name</p>
				<input type="text" class="form-field-input" id="name"/>
			</div>
			<div class="form-field-container">
				<p class="form-field-lable">Phone Number</p>
				<input type="text" class="form-field-input" id="phoneNumber"/>
			</div>
			<div class="form-field-container">
				<p class="form-field-lable">Email</p>
				<input type="text" class="form-field-input" id="email"/>
			</div>
		</form>
		<button id="form-next-button">Next</button>
		${footer}
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

	if (!("NDEFReader" in window)) {
		set_add_member("Nfc not supported");
		return;
	}

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

	const ndef = new NDEFReader();
	await ndef.scan();

	ndef.addEventListener("reading", (card) => {
		set_add_member(card.serialNumber);
	});
};

const create_member = async () => {
	const serialNumber = document.getElementById("serialNumber").value;
	const name = document.getElementById("name").value;
	const phoneNumber = document.getElementById("phoneNumber").value;
	const email = document.getElementById("email").value;

	const responst = await fetch(`${mongo_url}/attendee/create`, {
		method: "POST",

		body: JSON.stringify({
			serialNumber,
			name,
			phoneNumber,
			email,
		}),

		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});

	set_tap_to_scan();
};

const set_add_member = async (serialNumber) => {
	document.body.innerHTML = add_member.body;
	document.head.innerHTML = add_member.head;

	document.getElementById("serialNumber").value = serialNumber;

	const response = await fetch(
		`${mongo_url}/attendee/serialNumber/${serialNumber}`
	);
	if (response.status == 200) {
		const data = await response.json();
		document.getElementById("name").value = data.name;
		document.getElementById("phoneNumber").value = data.phoneNumber;
		document.getElementById("email").value = data.email;
	}

	document.getElementById("form-next-button").onclick = create_member;
};

set_tap_to_scan();
