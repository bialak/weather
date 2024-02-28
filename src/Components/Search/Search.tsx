import "./Search.css";
import { fetchCitiesToSearcher } from "Api/fetchCitiesToSearcher";
import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const debounce = require("lodash.debounce");

type SearchProps = {
	onSearchClick: (searchText: string) => void;
};

const Search = ({ onSearchClick }: SearchProps) => {
	const [searchText, setSearchText] = useState("");
	const [visibleSearchPropositionList, setVisibleSearchPropositionList] = useState(true);

	const { isLoading, data } = useQuery({
		queryKey: ["city-weather", searchText],
		queryFn: () => fetchCitiesToSearcher(searchText),
		enabled: Boolean(searchText),
	});

	if (isLoading) {
		<span className="loader"></span>;
	}

	const searchResult = data ?? [];

	function handleSubmit(e): void {
		e.preventDefault();
		let listSearchedResults = searchResult.map((city) => city.name);
		if (listSearchedResults.includes(searchText)) {
			onSearchClick(searchText);
			return;
		} else {
			alert("Write correct city");
		}
	}

	const debounceFn = useCallback(debounce(handleDebounceFn, 500), []);

	function handleDebounceFn(e) {
		setSearchText(e.target.value);
		setVisibleSearchPropositionList(true);
	}

	function handleChange(e) {
		setSearchText(e.target.value);
		debounceFn(e);
	}

	function handleClick(clickedCity: string) {
		setVisibleSearchPropositionList(false);
		setSearchText(clickedCity);
	}

	let tabIndexValue = 0;
	return (
		<>
			<h1 className="header">What the weather is like in your country </h1>
			<form onSubmit={handleSubmit} className="searcher">
				<input
					className="searchInput"
					onChange={handleChange}
					type="search"
					placeholder={"Search..."}
					value={searchText}
				/>
				<button className="searchButton" disabled={isLoading}>
					Search
				</button>
			</form>
			{visibleSearchPropositionList && (
				<ul className="searchPropositionList">
					{searchResult?.map((result) => (
						<li
							key={tabIndexValue}
							data-testid={`searchProposition-${tabIndexValue}`}
							className="searchProposition"
							tabIndex={tabIndexValue++}
							onClick={() => handleClick(result.name)}
						>
							{result.name}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default Search;
