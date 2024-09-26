const apiKey = "FXBNTWCHC23MCDVMQYZ8DVM9F"; // lol

const formSelection = document.querySelector("#location-selection");
const celButton = document.querySelector("#cel");
const fahrButton = document.querySelector("#fahr");

let submitted = false;

/* °F = °C × (9/5) + 32 */
const celsiusToFahrenheit = (str) => {
	let num = Number(str);
	const result = parseInt(num * (9 / 5) + 32);
	return result.toString();
};

/* °C = (°F - 32) × 5/9 */
const fahrenheitToCelsius = (str) => {
	let num = Number(str);
	const result = parseInt((num - 32) * (5 / 9));
	return result.toString();
};

formSelection.addEventListener("submit", (e) => {
	e.preventDefault();

	const countryToSearch = document.getElementById("country").value;
	const cityToSearch = document.getElementById("city").value;

	const fetchData = async (country, city) => {
		try {
			const res = await fetch(
				`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}?key=${apiKey}`
			);
			const weatherData = await res.json();
			const tempData = weatherData.days[0].temp.toString();
			const highData = weatherData.days[0].tempmin.toString();
			const lowData = weatherData.days[0].tempmax.toString();

			document.querySelector("#temp span").textContent = `${tempData}`;
			document.querySelector(
				"#daily-high span"
			).textContent = `${highData}`;
			document.querySelector(
				"#daily-low span"
			).textContent = `${lowData}`;

			submitted = true;
		} catch (err) {
			console.log("There was an error", err);
		}
	};
	fetchData(countryToSearch, cityToSearch);
});

const changeToCel = () => {
	let currTempText = document.querySelector("#temp .data");
	let dailyHighText = document.querySelector("#daily-high .data");
	let dailyLowText = document.querySelector("#daily-low .data");

	currTempText.textContent = `${fahrenheitToCelsius(currTempText.innerText)}`;
	dailyHighText.textContent = `${fahrenheitToCelsius(
		dailyHighText.innerText
	)}`;
	dailyLowText.textContent = `${fahrenheitToCelsius(dailyLowText.innerText)}`;

	document.querySelector("#temp .symbol").textContent = " °C";
	document.querySelector("#daily-high .symbol").textContent = " °C";
	document.querySelector("#daily-low .symbol").textContent = " °C";
};

const changeToFahr = () => {
	let currTempText = document.querySelector("#temp .data");
	let dailyHighText = document.querySelector("#daily-high .data");
	let dailyLowText = document.querySelector("#daily-low .data");

	currTempText.textContent = `${celsiusToFahrenheit(currTempText.innerText)}`;
	dailyHighText.textContent = `${celsiusToFahrenheit(
		dailyHighText.innerText
	)}`;
	dailyLowText.textContent = `${celsiusToFahrenheit(dailyLowText.innerText)}`;

	document.querySelector("#temp .symbol").textContent = " °F";
	document.querySelector("#daily-high .symbol").textContent = " °F";
	document.querySelector("#daily-low .symbol").textContent = " °F";
};

celButton.addEventListener("click", () => {
	if (submitted !== true) {
		alert("You need to first pick a location");
	} else {
		fahrButton.classList.remove("active");
		celButton.classList.add("active");
		changeToCel();
	}
});

fahrButton.addEventListener("click", () => {
	if (submitted !== true) {
		alert("You need to first pick a location");
	} else {
		celButton.classList.remove("active");
		fahrButton.classList.add("active");
		changeToFahr();
	}
});
