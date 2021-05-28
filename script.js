const startButton = $("#searchButton")
console.log("This is the button", startButton)
startButton.click(function() {
    const searchInput = $("#searchValue").val();
    var apiKey = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=57b85d9f6f550dd234e00f49ef09169c`
    console.log("This is the input", searchInput)
    $.ajax({
        url:apiKey,
        method: "GET",
        success: function(data){
            var cityTitle = $("#cityName")
            var temp = $("#temp")
            var humid = $("#humidity")
            var wind = $("#windSpeed")
            var uv = $("#uvInd")
            cityTitle.text(data.name)
            temp.text(data.main.temp)
            humid.text(data.main.humidity)
            wind.text(data.wind.speed)
            console.log(data)
        }
    })
});

