

function weather() {

    var citySearch = $("#search-city").val().trim();
    var cityName = $(".city-name")
    // cityName = citySearch.value
    // console.log($(".city-name"));
    // console.log(citySearch);

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=afa1a88a95052b1eef7ecb94fe170eb6`;

    fetch(weatherUrl).then(res => { // same as function(response)
        return res.json();
    })
        .then(data => {
            console.log(data);
            // cityName.textContent = data.name + " " + dayjs().format("MM/DD/YYYY");
            $("#temperature").text("Temperature: " + data.main.temp);
            $("#wind").text("Wind: " + data.wind.speed);
            $("#humidity").text("Humidity: " + data.main.humidity);

        })
};

function forecast() {

    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=afa1a88a95052b1eef7ecb94fe170eb6`;
    console.log(forecastUrl);

    fetch(forecastUrl).then(res => {
        return res.json();
    })
        .then(data => {
            console.log(data);
            $("#temperature").text("Temperature: " + data.list[0].main.temp);
            $("#wind").text("Wind: " + data.list[0].wind.speed);
            $("#humidity").text("Humidity: " + data.list[0].$main.humidity);

        })
}

$('#search-btn').on('click', weather);

// $data.list[0].main.temp



//currentWeather
//fetch API
//get data for temperature, humidity and wind; add weather icon; need date
//display data-create list through .innerHTML
//set localStorage here

//5 day weather
//fetch API
//get data for temperature, humidity and wind; add weather icon; need date
//use for loop to get 5 days 
//i++ ?
//display data-create list through .innerHTML

//search history - localStorage
//get from input or data - search history should be there always (on start-up) hint* with localStorage, don't save all info; just save 'name'
//search history = localStorage but how many? (5)
//click on search history and get city info