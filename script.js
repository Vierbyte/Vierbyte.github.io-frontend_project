// Autocomplete using the Google Places API.
const searchElement = document.querySelector('[data-citySearch]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place === null) return
})

// 