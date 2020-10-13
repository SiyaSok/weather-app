import React from 'react';

const BackgroundSelect = ({ temperature, units }) => {
	if ((units === '°F' && temperature > 61) || (units === '°C' && temperature > 16)) {
		console.log(temperature);
		return 'App warm container-fluid';
	}
	else {
		return 'App  container-fluid';
	}
};

export default BackgroundSelect;
