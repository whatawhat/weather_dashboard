const startButton = $("#searchButton")
//console.log("This is the button", startButton)
startButton.click(function() {
    const searchInput = $("#searchValue").val();
    var apiKey = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=57b85d9f6f550dd234e00f49ef09169c`
    //console.log("This is the input", searchInput)
    $.ajax({
        url:apiKey,
        method: "GET",
        success: function(data){
            var cityTitle = $("#cityName")
            var temp = $("#temp")
            var humid = $("#humidity")
            var wind = $("#windSpeed")
            var dateString = moment.unix(data.dt).format("MM/DD/YYYY");
            cityTitle.html(`${data.name} ${dateString} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>`)
            temp.text(data.main.temp)
            humid.text(data.main.humidity)
            wind.text(data.wind.speed)
            //console.log(data)
            var oneCallApiKey = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=57b85d9f6f550dd234e00f49ef09169c`
            //console.log(data.coord.lat)
            //console.log(data.coord.lon)
            $.ajax({
                url:oneCallApiKey,
                method: "GET",
                success: function(data){
                    //console.log("This is the One Call API Key!", data)
                    //console.log("This is the UV Index", data.current.uvi)
                    var uvElement = $("#uvInd")
                    if (data.current.uvi <= 2) {
                        uvElement.css("background-color", "green")
                    } else if (data.current.uvi >= 3 && data.current.uvi <= 5) {
                        uvElement.css("background-color", "yellow")
                    } else if (data.current.uvi >= 6 && data.current.uvi <= 7) {
                        uvElement.css("background-color", "orange")
                    } else {
                        uvElement.css("background-color", "red")}
                    uvElement.text(data.current.uvi)
                    //5 day forecast
                    var fiveDay = $("#fivedayforecast")
                    fiveDay.text(data.daily.temp)


                }
            })

        }
    

    })
});

