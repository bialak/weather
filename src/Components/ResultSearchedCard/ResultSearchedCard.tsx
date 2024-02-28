import { getCityWeather } from "Api/getCityWeather";
import { useQuery } from "@tanstack/react-query";
import "./ResultSearchedCard.css";

type ResultSearchedCardProps = {
	city: string;
};

const ResultSearchedCard = ({ city }: ResultSearchedCardProps) => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["weatherResult", city],
		queryFn: () => getCityWeather(city),
	});

	if (isPending) {
		return <span>Loading..</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<>
			<div className="resultSearchedCard">
				<h1 className="country" data-testid="resultCountry">
					{data.location.country}
				</h1>
				<h2 className="city"> {city}</h2>
				<h2 className="text">{data.current.condition.text}</h2>
				<h1 className="temperature" data-testid={"resultTemperature"}>
					{data.current.temp_c} °C
				</h1>
				<img src={data.current.condition.icon} alt="" className="picture" />
				<h2 className="wind">wind: {data.current.wind_kph} kph</h2>
			</div>
		</>
	);
};

export default ResultSearchedCard;
