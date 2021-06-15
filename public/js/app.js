const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const weather_widget = document.querySelector('.weather-widget')

const weather_location = document.querySelector('#weather-location');
const weather_desc = document.querySelector('#weather-description');
const weather_time = document.querySelector('#weather-time');
const weather_date = document.querySelector('#weather-date');
const weather_temp = document.querySelector('#weather-temp');
const weather_feels_like = document.querySelector('#weather-feels-like');
const weather_wind = document.querySelector('#weather-wind');
const weather_wind_direction = document.querySelector('#weather-wind-direction')
const weather_humidity = document.querySelector('#weather-humidity');
const weather_precipitation = document.querySelector('#weather-precipitation');
const weather_icon = document.querySelector('#weather-icon');
const weather_visibility = document.querySelector('#weather-visibility');
const weather_cloud_cover = document.querySelector('#weather-cloud-cover');
const weather_uv_index = document.querySelector('#weather-uv-index');

const weather_error = document.querySelector('#weather-error');
const loadingMessage = document.querySelector('#loading');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // hide everything on db call
    loadingMessage.classList.toggle('hide');
    weather_widget.classList.add('hide');
    weather_error.classList.add('hide');

    fetch(`/weather?address=${searchInput.value}`)
        .then(result => {
            result.json()
                .then(async data => {
                    if (data.errorMessage) {
                        weather_error.classList.remove('hide');
                        weather_error.textContent = data.errorMessage;
                    } else {

                        weather_widget.classList.remove('hide');

                        // get only time from date
                        let dateArr = data.localtime.split(' ');

                        // Get icon class based on weather description
                        if (weather_icon.classList.length === 2) {
                            weather_icon.classList.remove(weather_icon.classList[1]);
                        }
                        await weather_icon.classList.add(getWeatherIconClassName(data.weather_descriptions, dateArr[1]));

                        // setup weather widget text content
                        weather_location.textContent =`${data.country} ${data.name}`;
                        weather_desc.textContent = data.weather_descriptions;
                        weather_time.textContent = dateArr[1];
                        weather_date.textContent = new Date(Date.now()).toLocaleDateString();
                        weather_temp.textContent = `${data.temperature} °C`;
                        weather_feels_like.textContent = `Feels like: ${data.feelslike} °C`;
                        weather_wind.textContent = `Wind: ${data.wind_speed} km/h`;
                        weather_wind_direction.textContent = `Wind direction: ${data.wind_dir}`;
                        weather_humidity.textContent = `Humidity: ${data.humidity} %`;
                        weather_precipitation.textContent = `Precipitation: ${data.precipitation} mm`;
                        weather_visibility.textContent = `Visibility: ${data.visibility} km`;
                        weather_cloud_cover.textContent = `Cloud cover: ${data.cloudcover} %`
                        weather_uv_index.textContent = `UV index: ${data.uv_index}`
                    }
                    loadingMessage.classList.toggle('hide');
                });
        });
});

getWeatherIconClassName = (weather_desc, time) => {
    // setup time comparison to determine if its night or day
    let duskTime = new Date();
    let morningTime = new Date();
    let currentTime = new Date();
    const hoursAndMinutes = time.split(':');

    currentTime.setHours(parseInt(hoursAndMinutes[0]), parseInt(hoursAndMinutes[1]));
    duskTime.setHours(19, 30);
    morningTime.setHours(5,0);

    weather_desc = weather_desc.toLowerCase();

    if (currentTime <= duskTime && currentTime >= morningTime) {
        switch (weather_desc) {
            case 'clear':
            case 'sunny':
                return 'wi-day-sunny';
            case 'cloudy':
            case 'partly cloudy':
                return 'wi-day-cloudy';
            case 'overcast':
                return 'wi-day-sunny-overcast';
            case 'mist':
            case 'haze':
            case 'fog':
            case 'shallow fog':
                return 'wi-day-fog';
            case 'light rain':
            case 'light rain shower':
            case 'light drizzle':
            case 'heavy rain':
            case 'moderate or heavy rain shower':
            case 'light drizzle and rain, rain shower':
                return 'wi-day-rain';
            case 'patchy rain possible':
            case 'shower in vicinity':
                return 'wi-day-sprinkle';
            case 'patchy snow possible':
            case 'patchy moderate snow':
            case 'snow Shower':
            case 'heavy snow':
            case 'moderate snow':
                return 'wi-day-snow';
            case 'light freezing rain':
                return 'wi-day-rain-mix';
        }
    } else {
        switch (weather_desc) {
            case 'clear':
                return 'wi-night-clear';
            case 'cloudy':
            case 'partly cloudy':
                return 'wi-night-cloudy';
            case 'overcast':
                return 'wi-night-alt-partly-cloudy';
            case 'mist':
            case 'fog':
            case 'haze':
            case 'shallow fog':
                return 'wi-night-fog';
            case 'light Rain':
            case 'light rain shower':
            case 'heavy rain':
            case 'moderate or heavy rain shower':
                return 'wi-night-alt-rain';
            case 'patchy rain possible':
            case 'shower In Vicinity':
            case 'light drizzle and rain, rain shower':
                return 'wi-night-alt-sprinkle';
            case 'patchy snow possible':
            case 'patchy moderate snow':
            case 'snow shower':
                return 'wi-night-alt-snow-wind';
            case 'moderate snow':
            case 'heavy snow':
                return 'wi-snow-wind';
            case 'light freezing rain':
                return 'wi-night-rain-mix';
        }
    }
    return undefined;
}
