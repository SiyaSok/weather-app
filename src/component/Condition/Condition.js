import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Condition/Condition.css';
import { Spring } from 'react-spring/renderprops';
import TemperatureConversion from '../TemperatureConversion/TemperatureConversion';

const Condition = ({ Condition, units }) => {
	if (!Condition) return null;

	return (
		<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 1500, duration: 1500 }}>
			{(props) => (
				<div style={props}>
					<div className='Condition col-sm-12'>
						<div className='panel-heading'>
							<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 1500, duration: 1500 }}>
								{(props) => (
									<div style={props}>
										<h3 className='display-5'>Today's Condition</h3>
									</div>
								)}
							</Spring>
						</div>
						<div className='panel-body  col-sm-12'>
							<ul className='list-unstyled list-group '>
								<Spring
									from={{ opacity: 0 }}
									to={{ opacity: 1 }}
									config={{ delay: 1500, duration: 1500 }}>
									{(props) => (
										<div style={props}>
											<li className='list-group-item'>
												<i className='fas fa-fan' />Humidity{' '}
												<span className='pull-right '>{Condition.main.humidity}%</span>
											</li>
										</div>
									)}
								</Spring>
								<li className='list-group-item'>
									<i className='fas fa-temperature-low' />Min Temperature<span className='pull-right '>
										{<TemperatureConversion temperature={Condition.main.temp_min} units={units} />}
										<sup>{units}</sup>
									</span>
								</li>

								<li className='list-group-item'>
									<i className='fas fa-temperature-high' />Max Temperature<span className='pull-right '>
										{<TemperatureConversion temperature={Condition.main.temp_max} units={units} />}
										<sup>{units}</sup>
									</span>
								</li>

								<li className='list-group-item'>
									<i className='fas fa-tint' />Weather Condition<span className='pull-right '>{Condition.weather[0].description}</span>
								</li>

								<li className='list-group-item'>
									<i className='fas fa-wind' />Wind Speed<span className='pull-right '>{Condition.wind.speed} km/h</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</Spring>
	);
};

export default Condition;
