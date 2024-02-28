import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../../App";
import { cities } from "citiesToFetchData.js";
const nock = require("nock");

window.alert = jest.fn();
jest.mock("citiesToFetchData.js", () => ({
	cities: ["Paris"],
}));

describe("Search", () => {
	it("should show ResultSeatchedCard when you find your city and click search button", async () => {
		window.alert.mockClear();

		const WeatherCardList = nock("http://api.weatherapi.com")
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
			})
			.get("/v1/current.json?key=c6068278a47d4030aad124640241101&q=Gujranwala&aqi=no")
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
					country: "Pakistan ",
					name: "Gujranwala",
				},
			});

		const SearchedCity = nock("https://api.api-ninjas.com")
			.persist()
			.defaultReplyHeaders({
				"access-control-allow-origin": "*",
				"access-control-allow-headers": "X-Api-Key",
			})
			.get("/v1/city?name=Gujranwala&limit=5")
			.reply(200, [{ name: "Gujranwala" }])
			.options("/v1/city?name=Gujranwala&limit=5")
			.reply(200)
			.get("/v1/city?name=Wal&limit=5")
			.reply(200, [
				{ name: "Rawalpindi" },
				{ name: "Gujranwala" },
				{ name: "Gwalior" },
				{ name: "Bahawalpur" },
				{ name: "Sahiwal" },
			])
			.options("/v1/city?name=Wal&limit=5")
			.reply(200);

		render(<App />);
		const inputSearch = screen.getByPlaceholderText("Search...");
		const searchButton = screen.getByText(/Search/i);
		fireEvent.change(inputSearch, { target: { value: "Wal" } });
		const searchProposition = await screen.findByTestId("searchProposition-1");
		expect(searchProposition.textContent).toBe("Gujranwala");
		fireEvent.click(searchProposition);
		await waitFor(() => expect(searchButton).not.toBeDisabled(), {
			timeout: 2000,
		});
		fireEvent.click(searchButton);
		const resultCountry = await screen.findByTestId("resultCountry");
		expect(resultCountry.textContent).toBe(`Pakistan `);
	});
});
