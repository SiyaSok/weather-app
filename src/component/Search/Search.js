import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Search/Search.css';
import { Spring } from 'react-spring/renderprops';

class Search extends Component {
	state = {
		cityQuery: '',
		countryQuery: ''
	};

	updateCityQuery = (event) => {
		this.setState({ cityQuery: event.target.value });
	};

	updateCountryQuery = (event) => {
		this.setState({ countryQuery: event.target.value });
	};

	headleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.weatherSearch();
		}
	};

	weatherSearch = (e) => {
		e.preventDefault();
		this.props.weatherSearch(this.state.cityQuery, this.state.countryQuery);
		this.setState({ cityQuery: ''});
		this.setState({ countryQuery: '' });

	};

	render() {
		return (
			<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 1800, duration: 1800 }}>
				{(props) => (
					<div style={props}>
						<form className='row Search' onKeyPress={this.headleKeyPress}>
							<div className='form-group col-sm-5'>
								<input
									className=''
									type='text'
									name='city'
									value={this.state.cityQuery}
									placeholder='City'
									onChange={this.updateCityQuery}
									onKeyPress={this.headleKeyPress}
								/>
							</div>
							<div className='form-group col-sm-5'>
								<input
									className=''
									type='text'
									value={this.state.countryQuery}
									name='country'
									placeholder='Country'
									onChange={this.updateCountryQuery}
									onKeyPress={this.headleKeyPress}
								/>
							</div>
							<div className='col-sm-2'>
								<button className='btn' type='submit' onClick={this.weatherSearch}>
									<i className='fas fa-search' />
								</button>
							</div>
						</form>
					</div>
				)}
			</Spring>
		);
	}
}

export default Search;
