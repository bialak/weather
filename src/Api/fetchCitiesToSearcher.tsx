const fetchDataCity = async (url) => {
	const response = await fetch(url, {
		headers: {
			"X-Api-Key": "ltR5wJ+f1gVCJhhbP5N41g==VusBG342pBT6r6cm",
			"Content-Type": "application/json",
		},
	});
	return response.json() as Promise<CountryData[]>;
};

const baseUrlCity = "https://api.api-ninjas.com/v1/city";

const getUrlOfCity = (city: string) => {
	const searchParams = new URLSearchParams({
		name: city,
		limit: "5",
	});
	return `${baseUrlCity}?${searchParams.toString()}`;
};

export const fetchCitiesToSearcher = (city: string) => fetchDataCity(getUrlOfCity(city));
