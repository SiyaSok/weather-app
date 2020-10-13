import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Forecast/Forecast.css';
import { Spring } from 'react-spring/renderprops';
import TemperatureConversion from '../TemperatureConversion/TemperatureConversion';

const Forecast = ({ forecast, units }) => {
	if (!forecast) return null;

	return (
		<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 1500, duration: 1500 }}>
			{(props) => (
				<div style={props}>
					<div className='col-sm-12 Forecast mt-2'>
						{forecast.slice(0, 6).map((day) => (
							<div className='hours' key={day.dt}>
								<h3>
									{
										new Date(day.dt_txt).getHours() >= 12 ? new Date(day.dt_txt).getHours() +
										':' +
										new Date(day.dt_txt).getMinutes() +
										new Date(day.dt_txt).getSeconds() +
										' pm' :
										new Date(day.dt_txt).getHours() +
										':' +
										new Date(day.dt_txt).getMinutes() +
										new Date(day.dt_txt).getSeconds() +
										' am'}
								</h3>
								<img
									src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
									alt={day.weather[0].description}
								/>
								<p>
									<span>
										{<TemperatureConversion temperature={day.main.temp} units={units} />}
										<sup>{units}</sup>
									</span>
								</p>
								<p>
									<span>{day.weather[0].description}</span>{' '}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</Spring>
	);
};

export default Forecast;
