import React, { Component } from 'react';
import './App.css';
import Title from './component/Title/Title';
import Search from './component/Search/Search';
import Weather from './component/Weather/Weather';
import Areas from './component/Areas/Areas';
import Forecast from './component/Forecast/Forecast';
import Condition from './component/Condition/Condition';
import 'bootstrap/dist/css/bootstrap.min.css';

const Api_key = '63ab3b428a73887d42c040e8e2260e49';
const Api_Url = 'https://api.openweathermap.org/data/2.5/';

class App extends Component {
	state = {
		temperature: undefined,
		city: 'Durban',
		country: 'ZA',
		humidity: undefined,
		description: undefined,
		err: '',
		cities: undefined,
		forecast: undefined,
		Condition: undefined,
		units: undefined
	};

	componentDidMount() {
		this.weatherSearch(this.state.city, this.state.country);
	}

	weatherSearch = async (city, country) => {
		if (city && country) {
			let cityData = await fetch(`${Api_Url}/weather?q=${city},${country}&appid=${Api_key}&units=metric`);
			let City = await cityData.json();

			// console.log(City);
			if (!City.coord) {
				return this.setState({
					temperature: undefined,
					city: undefined,
					country: undefined,
					humidity: undefined,
					description: undefined,
					cities: undefined,
					forecast: undefined,
					Condition: undefined,
					err: 'Please enter the correct data and try again',
					units: undefined
				});
			}

			let ThreeHoulyforecast = await fetch(
				`${Api_Url}/forecast?lat=${City.coord.lat}&lon=${City.coord.lon}&appid=${Api_key}&cnt=8&units=metric`
			);
			let ThreeHoulyforecastData = await ThreeHoulyforecast.json();

			let citiesData = await fetch(
				`${Api_Url}/find?lat=${City.coord.lat}&lon=${City.coord.lon}&appid=${Api_key}&cnt=7&units=metric`
			);
			let cities = await citiesData.json();

			City.weather.push(ThreeHoulyforecastData.list);
			City.weather.push(cities.list);

			if (City.name) {
				this.setState({
					temperature: City.main.temp,
					city: City.name,
					country: City.sys.country,
					humidity: City.main.humidity,
					description: City.weather[0].description,
					cities: cities.list,
					err: '',
					forecast: ThreeHoulyforecastData.list,
					Condition: City,
					units: '°C'
				});
			}
			else {
				this.setState({
					temperature: undefined,
					city: undefined,
					country: undefined,
					humidity: undefined,
					description: undefined,
					cities: undefined,
					forecast: undefined,
					err: City.message,
					Condition: undefined,
					units: undefined
				});
			}
		}
		else {
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				cities: undefined,
				forecast: undefined,
				Condition: undefined,
				err: 'Please enter the correct data and try again',
				units: undefined
			});
		}
	};

	weatherConvertor = () => async (e) => {
		if (e.target.textContent.includes('C', 0)) {
			if (this.state.city && this.state.country) {
				this.setState({
					temperature: this.state.Condition.main.temp * 1.8 + 32,
					units: '°F'
				});
				e.target.textContent = '°F';
			}
			else {
				this.setState({
					temperature: undefined,
					city: undefined,
					country: undefined,
					humidity: undefined,
					description: undefined,
					cities: undefined,
					forecast: undefined,
					Condition: undefined,
					units: undefined,
					err: 'Please enter the correct data and try again'
				});
			}
		}
		else {
			this.setState({
				temperature: this.state.Condition.main.temp,
				units: '°C'
			});
			e.target.textContent = '°C';
		}
	};

	backgroundSelect = () => {
		if (
			(this.state.units === '°F' && this.state.temperature > 61) ||
			(this.state.units === '°C' && this.state.temperature > 16)
		) {
			return 'App warm container-fluid';
		}
		else {
			return 'App  container-fluid';
		}
	};

	SelectedArea = (city) => {
		console.log(this.state);
		if (!city) return null;
		// console.log(city);
		// console.log(city.sys.country);
		this.weatherSearch(city.name, city.sys.country);
	};

	render() {
		return (
			<div className={this.backgroundSelect()}>
				<div className='row'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>
								<Title />
							</div>

							<div className='col-sm-6'>
								<Search weatherSearch={this.weatherSearch} />

								<Weather
									temperature={this.state.temperature}
									city={this.state.city}
									country={this.state.country}
									humidity={this.state.humidity}
									description={this.state.description}
									err={this.state.err}
									weatherConvertor={this.weatherConvertor}
									units={this.state.units}
								/>
							</div>
							<div className='col-sm-6'>
								<Condition Condition={this.state.Condition} units={this.state.units} />
							</div>
							<div className='col-sm-12'>
								<Forecast forecast={this.state.forecast} units={this.state.units} />

								<Areas
									cities={this.state.cities}
									SelectedArea={this.SelectedArea}
									units={this.state.units}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
