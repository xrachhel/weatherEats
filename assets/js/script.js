var weatherContent = $("#weather-content");
// jQuery.ajaxPrefilter(function (options) {
//     if (options.crossDomain && jQuery.support.cors) {
//       options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//     }
//   });


function renderWeather(){

    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(function(position){

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude
     
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&units=imperial&appid=2cf011e0ff0bddcd3b775b324d2a19d4";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(queryURL);
                var cityName = $("<p>");
                cityName.addClass("is-size-2")
                cityName.text(response.name);
                weatherContent.append(cityName);

                var weatherImg = $("<img>");
                weatherImg.addClass("");
                weatherImg.attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon +"@2x.png");
                weatherContent.append(weatherImg);

                var temperature = $("<p>");
                temperature.text("Temperature: " + response.main.temp);
                weatherContent.append(temperature);

                var humidity = $("<p>");
                humidity.text("Humidity: " + response.main.humidity);
                weatherContent.append(humidity);

                var windSpeed = $("<p>");
                windSpeed.text("Wind Speed: " + response.wind.speed);
                weatherContent.append(windSpeed);

            });
        });
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

renderWeather();