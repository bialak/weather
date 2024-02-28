interface WeatherData {
	current: {
		condition: {
			text: string;
			icon: string;
		};
		temp_c: number;
		wind_kph: number;
	};
	location: {
		country: string;
		name: string;
	};
}

interface CountryData {
	name: string;
	latitiude: number;
}
