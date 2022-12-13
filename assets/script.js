

function weather(citySearch) {
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
            cityName.text(data.name + " " + dayjs().format("(MM/DD/YYYY)"));
            $("#temperature").text("Temperature: " + data.main.temp);
            $("#wind").text("Wind: " + data.wind.speed);
            $("#humidity").text("Humidity: " + data.main.humidity);
            $("#icon").attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        })
};

function forecast(citySearch) {

    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&units=imperial&appid=afa1a88a95052b1eef7ecb94fe170eb6`;
    console.log(forecastUrl);

    fetch(forecastUrl).then(res => {
        return res.json();
    })
        .then(data => {
            console.log(data);
            for (var i = 1; i < 6; i++) {
                var forecast = data.list[i * 8 - 1];
                var day = $("#day-" + i)
                day.children(".temp").text("Temperature: " + forecast.main.temp);
                day.children(".wind").text("Wind: " + forecast.wind.speed);
                day.children(".humidity").text("Humidity: " + forecast.main.humidity);
                day.find(".icon").attr("src", `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`)
                day.children(".date").text(dayjs().add(i, "day").format("(MM/DD/YYYY)"));
            }

        })
}

function addCity(citySearch) {
    const localStorageCities = localStorage.getItem("cities") || "[]";
    const cities = JSON.parse(localStorageCities).filter(function (city) {
        return city !== citySearch;
    });
    cities.unshift(citySearch);
    localStorage.setItem("cities", JSON.stringify(cities));
}

$('#search-btn').on('click', search);

function search() {
    var citySearch = $("#search-city").val().trim();
    weather(citySearch);
    // forecast(citySearch);
    addCity(citySearch);
    addSearchButtons();
    forecast(citySearch);
}

function addSearchButtons() {
    const localStorageCities = localStorage.getItem("cities") || "[]";
    const cities = JSON.parse(localStorageCities);
    const searchEl = $(".search-history");
    searchEl.empty();
    for (const city of cities) {
        const button = $("<button>").text(city);
        button.on('click', function () {
            weather(city);
            addCity(city);
            addSearchButtons();
            forecast(city);
        })
        searchEl.append(button);
        //set butt on text to city ; append button to end of search 
    }
}

addSearchButtons();


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