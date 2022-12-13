

function weather(citySearch) {
    var cityName = $(".city-name")

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=afa1a88a95052b1eef7ecb94fe170eb6`;

    fetch(weatherUrl).then(res => {
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
    }
}

addSearchButtons();

