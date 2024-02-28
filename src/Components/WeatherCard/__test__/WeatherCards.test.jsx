import { render, screen } from "test/setup";
import WeatherCard from "../WeatherCard";
import { getCityWeather } from "Api/getCityWeather";
const nock = require("nock");

describe("WeatherCard", () => {
	it("should show fetched data from function getWeatherCity", async () => {
		const expectation = nock("http://api.weatherapi.com")
			.defaultReplyHeaders({
				"access-control-allow-origin": "*",
			})
			.get("/v1/current.json?key=c6068278a47d4030aad124640241101&q=Paris&aqi=no")
			.reply(200, {
				current: {
					condition: {
						text: "Sunny",
						icon: "icon",
					},
					temp_c: 10,
					wind_kph: 10,
				},
				location: {
					country: "France",
					name: "Paris",
				},
			});

		render(<WeatherCard city={"Paris"} />);
		const countryInformation = await screen.findByTestId("country");
		const temperatureInformation = await screen.findByTestId("temperature");
		expect(countryInformation.textContent).toBe(`France`);
		expect(temperatureInformation.textContent).toBe(`10 °C`);
	});
});
