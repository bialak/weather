import { render, screen, fireEvent } from "../../../test/setup";
import Search from "../Search";
import { useState } from "react";
const nock = require("nock");

describe("Search", () => {
	it("should show proposition when you write something in input", async () => {
		nock("https://api.api-ninjas.com")
			.defaultReplyHeaders({
				"access-control-allow-origin": "*",
				"access-control-allow-headers": "X-Api-Key",
			})
			.options("/v1/city?name=Wal&limit=5")
			.reply(200);
		const expectation = nock("https://api.api-ninjas.com")
			.defaultReplyHeaders({
				"access-control-allow-origin": "*",
			})
			.get("/v1/city?name=Wal&limit=5")
			.reply(200, [
				{ name: "Rawalpindi" },
				{ name: "Gujranwala" },
				{ name: "Gwalior" },
				{ name: "Bahawalpur" },
				{ name: "Sahiwal" },
			]);

		render(<Search />);

		const inputSearch = screen.getByPlaceholderText("Search...");
		fireEvent.change(inputSearch, { target: { value: "Wal" } });
		expect(inputSearch.value).toBe("Wal");
		const searchProposition = await screen.findByTestId("searchProposition 1");
		expect(searchProposition.textContent).toBe("Gujranwala");
	});
});
