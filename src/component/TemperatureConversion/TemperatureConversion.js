const TemperatureConversion = ({ temperature, units }) => {
	if (units === '°F') {
		return Math.round(temperature * 1.8 + 32);
	}
	else {
		return Math.round(temperature);
	}
};

export default TemperatureConversion;
