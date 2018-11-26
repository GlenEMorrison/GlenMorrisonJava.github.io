document.addEventListener("DOMContentLoaded", () => {
let image = document.querySelector('#image');
let all = document.querySelector('html');
let form = document.querySelector('form');
let input = document.querySelector('#city');
let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let key = '&appid=5a622b7663d48d46ad16cd72d2dd3c73';
let units = '&units=imperial';
let url = "";

form.addEventListener('submit', (event) => {
    event.preventDefault();
    url = api + input.value + key + units;

   getWeather(url)
   .then((forecast) => {
    // The promise has been fulfilled, you now have weather data to do as you will.
    let temp = `${forecast.main.temp}`;

    let now = Date.now();

    let sunriseUTC = `${forecast.sys.sunrise}`;
    let sunriseDate = new Date(sunriseUTC * 1000);
    let sunrise = sunriseDate.toLocaleTimeString();

    let sunsetUTC = `${forecast.sys.sunset}`;
    let sunsetDate = new Date(sunsetUTC * 1000);
    let sunset = sunsetDate.toLocaleTimeString();

    if(now >= sunriseDate && now <= sunsetDate){
        all.classList.remove('night');
        all.classList.add('day');
    }else{
        all.classList.remove('day');
        all.classList.add('night');
    };

    //wont change back to day



    //let weatherJSON = `${forecast.weather[0].icon}`;


   // if(temp > 50){
   //     all.classList.add('theme');
   // };


    let listItems = "";
    listItems += `<li>Pressure: ${forecast.main.pressure}</li>`;
    listItems += `<li>Temp: ${temp}</li>`;
    listItems += `<li>Humidity: ${forecast.main.humidity}</li>`;
    let list = document.querySelector('ul');
    list.innerHTML = listItems;
    image.innerHTML = `<img class="icon" src="icons/icon_broken_clouds_day.png"</img>`;
    
    
})
.catch((err) => {
    // Handel the rejected promise
    console.error(err);
});
 });

/**
 * Promises to fetch the data from Weather site
 */
function getWeather(url) {
    return new Promise((resolve, reject) => {
        // The promise has been made and returned to the caller, now get busy fulfilling the promise, buster.
        // Call the Open Weather API 
        fetch(url)
        // Turn the response, into json
        .then((response) => response.json())
        // Display json in console
        .then((json) => {
            // The promise has been fulfilled.
            resolve(json);
        })
        .catch((err) => {
            // Oops! Another broken promise. tsk! tsk!
            reject(err);
        });
    });
}
});
  /**
 * Displays all of the location data.
 */





  