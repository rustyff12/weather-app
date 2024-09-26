const apiKey = "FXBNTWCHC23MCDVMQYZ8DVM9F"; // lol

const formSelection = document.querySelector("#location-selection");

formSelection.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log(e);
	const country = document.getElementById("country").value;
	const city = document.getElementById("city").value;

	let currTemp = document.querySelector("#temp").innerText;
	const dailyHigh = document.querySelector("#daily-high").innerText;
	const dailyLow = document.querySelector("#daily-low").innerText;

	console.log(currTemp);
	console.log(dailyHigh);
	console.log(dailyLow);

	currTemp += " hello";
	console.log(currTemp);
});
