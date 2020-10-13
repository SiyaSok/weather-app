import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Weather/Weather.css';
import { Spring } from 'react-spring/renderprops';

const Weather = ({ city, country, temperature, description, err, weatherConvertor, units }) => {
	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		let days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getDate();

		return `${day} ${date} ${month} ${year}`;
	};
	const today = new Date(),
		date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	return (
		<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 2000, duration: 2000 }}>
			{(props) => (
				<div style={props}>
					<div className='col-sm-12 Weather'>
						{<p>{date}</p>}

						{city && (
							<p>
								<span>Current</span>
							</p>
						)}

						{city &&
						country && (
							<h2 className='display-5'>
								{city}, {country}
							</h2>
						)}

						{temperature && (
							<h4>
								<span>
									{Math.round(temperature)}
									<sup onClick={weatherConvertor(city)}>{units}</sup>
								</span>
							</h4>
						)}
						{description && <p>{description} </p>}
						{err && <p>{err} </p>}
					</div>
				</div>
			)}
		</Spring>
	);
};

export default Weather;
