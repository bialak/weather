import WeatherCard from "Components/WeatherCard/WeatherCard";
import "./WeatherCardsList.css";
import { cities } from "citiesToFetchData.js";

const WeatherCardsList = () => {
	console.log(cities);
	return (
		<>
			<div className="weatherCardsList">
				{cities.map((city) => (
					<WeatherCard city={city} key={city} />
				))}
			</div>
		</>
	);
};

export default WeatherCardsList;
