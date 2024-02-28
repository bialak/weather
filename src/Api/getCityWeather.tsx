const baseUrl = "http://api.weatherapi.com";
const endpointPath = "v1/current.json";

const getUrl = (city: string) => {
	const searchParams = new URLSearchParams({
		key: "c6068278a47d4030aad124640241101",
		q: city,
		aqi: "no",
	});
	return `${baseUrl}/${endpointPath}?${searchParams.toString()}`;
};

const fetchDataCountry = async (url) => {
	const response = await fetch(url);
	return response.json() as Promise<WeatherData>;
};

export const getCityWeather = (city: string) => fetchDataCountry(getUrl(city));
