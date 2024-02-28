import { getCityWeather } from "Api/getCityWeather";
import { useQuery } from "@tanstack/react-query";
import "./WeatherCard.css";

type WeatherCardProps = {
	city: string;
};

const WeatherCard = ({ city }: WeatherCardProps) => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["weather", city],
		queryFn: () => getCityWeather(city),
	});

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<div className="weatherCard" data-testid={`weather-card-${city}`}>
			<h1 className="country" data-testid={"country"}>
				{data.location.country}
			</h1>
			<h2 className="city"> {data.location.name}</h2>
			<h2 className="text">{data.current.condition.text}</h2>
			<h1 className="temperature" data-testid={"temperature"}>
				{data.current.temp_c} °C
			</h1>
			<img src={data.current.condition.icon} alt="" className="picture" />
			<h2 className="wind">wind: {data.current.wind_kph} kph</h2>
		</div>
	);
};

export default WeatherCard;
