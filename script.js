import {API_KEY} from './sensitive.js'
window.addEventListener('load', function() {

// Autocomplete using the Google Places API to pass in the Coordinate of the selected as variables lat and lng.
const searchElement = document.querySelector('[data-citySearch]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place === null) return alert('You done goofed. This place does not exist.');
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    const units = 'imperial';
// The variables of lat and lng are passed from the Google Places API to the Open Weather Maps: Current Weather Data API to return specified data points.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`).then(function(response) {
        return response.json();
        }).then(function(data) {
            console.log(data);
            console.log(`Your request for ${place.name} has completed successfully.`)
            let temp = data.main.temp;
            let loca = data.name;
            let icon = data.weather[0].icon;
            let desc = data.weather[0].description;
            document.getElementById("locationHeader").innerHTML=(loca);
            document.getElementById("temp").innerHTML =(`${temp} °`);
            document.getElementById("dynamicIcon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById("description").innerHTML =(desc);
        }).then(function() {
// Fetch to another Open Weather Maps API: One Call. Used to get daily weather data.
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`).then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data);
            let monday = data.daily[0].temp.day
            let iconM = data.daily[0].weather[0].icon
            let tuesday = data.daily[1].temp.day
            let iconT = data.daily[1].weather[0].icon
            let wednesday = data.daily[2].temp.day
            let iconW = data.daily[2].weather[0].icon
            let thursday = data.daily[3].temp.day
            let iconTh = data.daily[3].weather[0].icon
            let friday = data.daily[4].temp.day
            let iconF = data.daily[4].weather[0].icon
            // Monday box
            document.getElementById('mon').innerHTML =(`${monday} °`)
            document.getElementById('iconM').src = `http://openweathermap.org/img/wn/${iconM}.png`
            // Tuesday box
            document.getElementById('tue').innerHTML =(`${tuesday} °`)
            document.getElementById('iconT').src = `http://openweathermap.org/img/wn/${iconT}.png`
            // Wednesday box
            document.getElementById('wed').innerHTML =(`${wednesday} °`)
            document.getElementById('iconW').src = `http://openweathermap.org/img/wn/${iconW}.png`
            // Thursday box
            document.getElementById('thu').innerHTML =(`${thursday} °`)
            document.getElementById('iconTh').src = `http://openweathermap.org/img/wn/${iconTh}.png`
            // Friday box
            document.getElementById('fri').innerHTML =(`${friday} °`)
            document.getElementById('iconF').src = `http://openweathermap.org/img/wn/${iconF}.png`
        })
    }).catch(err => {
        alert(err)
    })
})


})