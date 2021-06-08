const startButton = $("#searchButton")
//console.log("This is the button", startButton)
startButton.click(function() {
    const searchInput = $("#searchValue").val();
    recentSearch (searchInput);
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
                    console.log("This is the One Call API Key!", data)
                    console.log("This is the UV Index", data.current.uvi)
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
                    fiveDay.empty();
                    //fiveDay.text(data.daily[1].humidity)
                    //console.log("this is the daily humidity for day 1", data.daily[1].humidity)
                    //fiveDay.text(data.daily[2].humidity)
                    //fiveDay.text(data.daily[3].humidity)
                    //fiveDay.text(data.daily[4].humidity)
                    //fiveDay.text(data.daily[5].humidity)
                    

                    for (var i = 1; i < 6; i++) {
                        //fiveDay.text(data.daily[i].humidity)
                        console.log(data.daily[i])
                        var divElement = $('<div class=fivedaybox></div>')
                        var dateElement = $('<p></p>')
                        var datefive = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
                        dateElement.text(datefive);
                        var iconElement = $(`<img src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`)
                        var tempElement = $('<p></p>')
                        var tempfive = data.daily[i].temp.day;
                        tempElement.text(tempfive);
                        var humidityElement = $('<p></p>')
                        humidityElement.text(data.daily[i].humidity);
                        divElement.append(dateElement, iconElement, tempElement, humidityElement);
                        fiveDay.append(divElement);

                        //tempterature, humidity, date, icon
                    }



                }
            })

        }
    

    })
});

function recentSearch(searchvalue) {
    var listElement = $('<li></li>')
    listElement.text(searchvalue);
    $('#searchList').append(listElement)
};

var searchListStr = JSON.stringify(searchInput);

console.log(searchListStr);

console.log(JSON.parse(searchListStr));

//need .push to add additional search values
//to append new value use variableName.push(what to add)


//Get #searchList and get it to local storage

//var fakeSearchItems = ['Miami', 'Dallas', 'New York'];
// window.localStorage.setItem('search', fakeSearchItems)
// var practice = JSON.parse(fakeSearchItems)
// console.log(practice);

//console.log(typeof window.localStorage.getItem('search'))

//JSON.stringify
//JSON.parse
