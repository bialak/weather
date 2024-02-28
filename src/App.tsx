import { useState } from "react";
import "./App.css";
import Search from "./Components/Search/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherCardsList from "Components/WeatherCardsList/WeatherCardsList";
import ResultSearchedCard from "Components/ResultSearchedCard/ResultSearchedCard";

const queryClient = new QueryClient();

function App() {
	const [city, setCity] = useState("");

	const handleSearchClick = (searchText: string) => {
		setCity(searchText);
	};
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<Search onSearchClick={handleSearchClick} />
				{city && <ResultSearchedCard city={city} />}
				{!city && <WeatherCardsList />}
			</QueryClientProvider>
		</div>
	);
}

export default App;
