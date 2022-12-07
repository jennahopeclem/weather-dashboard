var cityName = $('#search-city');
// var search = document.querySelector("#city-name")
var search = $("#city-name");

function weather() {
    var citySearch = $("#search-city").val().trim();
    console.log(citySearch);
    var city = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid={afa1a88a95052b1eef7ecb94fe170eb6}`;
    console.log(citySearch);
    fetch(city).then(response => { // same as function(response)
        console.log(res)
        return res.json();
    })
        .then(data => {
            console.log(data);
        })
}

$('#search-btn').on('click', weather);

