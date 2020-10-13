import React from 'react';
import '../Areas/Areas.css';
import { Spring } from 'react-spring/renderprops';
import TemperatureConversion from '../TemperatureConversion/TemperatureConversion';

const Areas = ({ cities, SelectedArea, units }) => {
	if (!cities) return null;

	const mainCity = cities[0].name;
	const filteredCities = cities.filter((city, i) => {
		return mainCity !== city.name;
	});

	return (
		<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 1800, duration: 1800 }}>
			{(props) => (
				<div style={props}>
					<div className='col-sm-12 Areas mt-2'>
						{filteredCities.map((city) => (
							<div
								onClick={() => {
									SelectedArea(city);
								}}
								className='Area'
								key={city.id}>
								<h2>{city.name}</h2>

								<img
									src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}
									alt={city.weather[0].description}
								/>
								<p>
									<span className='max-temp'>
										{<TemperatureConversion temperature={city.main.temp_max} units={units} />}
										<sup>°</sup>
									</span>
									<span className='min-temp'>
										{<TemperatureConversion temperature={city.main.temp_min} units={units} />}
										<sup>°</sup>
									</span>
								</p>
								<p>{city.weather[0].description}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</Spring>
	);
};

export default Areas;
