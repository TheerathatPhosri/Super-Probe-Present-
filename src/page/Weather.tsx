import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  name: {
    common: string;
  };
  alpha2Code: string;
}

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed:number;
    deg:number;
    gust:number;
  }
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('Thailand'); // ให้ค่าเริ่มต้นเป็นรหัสประเทศของไทย
  const [countryList, setCountryList] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
        // เรียงลำดับตามตัวอักษร
        const sortedCountries = response.data.sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setCountryList(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&appid=18ae536b002d38e1ced774f1f33ef919`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [selectedCountry]);

  const convertKelvinToCelsius = (kelvin: number) => kelvin - 273.15;

  const handleCountryChange = (alpha2Code: string) => {
    setSelectedCountry(alpha2Code);
  };

  const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-5'>
      <div>
        <label className='font-bold'>เลือกประเทศ : </label>
        <select onChange={(e) => handleCountryChange(e.target.value)} value={selectedCountry}
        className='block w-full p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          {countryList.map((country) => (
            <option key={country.alpha2Code} value={country.alpha2Code}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {weatherData ? (
        // <div>
        //   <h1>อุณหภูมิ : {convertKelvinToCelsius(weatherData.main.temp).toFixed(2)} °C</h1>
        //   <p>{weatherData.weather[0].description}</p>
        // </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
                      <div className="font-bold text-xl">{selectedCountry}</div>
                      {weatherData && (
                        <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
                      )}
                      <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
          <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                      </div>
                      <div className="flex flex-row items-center justify-center mt-6">
                        <div className="font-medium text-6xl">{convertKelvinToCelsius(weatherData.main.temp).toFixed(2)}°</div>
                        <div className="flex flex-col items-center ml-6">
                          <div>{weatherData.weather[0].description}</div>
                          {/* <div className="mt-1">
                            <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                            <span className="text-sm font-light text-gray-500">28°C</span>
                          </div>
                          <div>
                            <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                            <span className="text-sm font-light text-gray-500">20°C</span>
                          </div> */}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between mt-6">
                        <div className="flex flex-col items-center">
                          <div className="font-medium text-sm">Speed</div>
                          <div className="text-sm text-gray-500">{weatherData.wind.speed}</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="font-medium text-sm">Direction</div>
                          <div className="text-sm text-gray-500">{weatherData.wind.deg}</div>
                        </div>
                        <div className="flex flex-col items-center">  
                          <div className="font-medium text-sm">Gust</div>
                          <div className="text-sm text-gray-500">{weatherData.wind.gust}</div>
                        </div>
                      </div>
                    </div>
          </div>  
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherApp;
