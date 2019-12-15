var weatherContent = $("#weather-content");
// jQuery.ajaxPrefilter(function (options) {
//     if (options.crossDomain && jQuery.support.cors) {
//       options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//     }
//   });
var lat_;
var lon_;

function renderWeather() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            var latitude = position.coords.latitude;
            lat = latitude;
            var longitude = position.coords.longitude;
            lon_ = longitude;



            var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=2cf011e0ff0bddcd3b775b324d2a19d4";
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // console.log(queryURL);
                console.log(response)
                var cityName = $("<p>");
                cityName.addClass("is-size-2")
                cityName.text(response.name);
                weatherContent.append(cityName);

                var weatherImg = $("<img>");
                weatherImg.addClass("");
                weatherImg.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
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


                //----------------------------------------YELP API-----------------------------------------------
                $("#family").on("click", function(){
                    if ($(this).is(':checked')){
                        price = "1,2,3,4"
                    }
                })
                $("#budget").on("click", function(){
                    if($(this).is(':checked')){
                        price = "1,2"
                    }
                })
                $("#business").on("click", function(){
                    if ($(this).is(':checked')){
                        price = "2,3,4 "
                    }
                })

               

                jQuery.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors) {
                        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                    }
                });
                $("#restaurants").on("click", function () {
                    event.preventDefault()
                    var main = response.weather[0].main
                    var lat = response.coord.lat
                    var lon = response.coord.lon
                    var type;
                    console.log(main)
                   

                    if (main === "Clouds" || main === "Rain") {
                        type = "soup"
                    }
                    else if (main === "Thunderstorm") {
                        type = "takeout"
                    }
                    else if (main === "Clear") {
                        type = "patio"
                    }

                    
                    
                    console.log(price);
                    

                    $.ajax({
                        url: 'https://api.yelp.com/v3/businesses/search?term=' + type + '&longitude=' + lon + '&latitude=' + lat + '&price=' + price + '&open_now=true&radius=10000',
                        method: "GET",
                        headers: {
                            authorization: "Bearer CyZO8Ys8yDQ-FCnqNZegGIU2FvGwOLg00MP1JtA6GLKWM2SadzcHyCA4KMt9Y9643sXFsA2bhvDY4RKLyydvPULurteiMPQKydq62F92eEKefWJnbuOanTUtAtjzXXYx"
                        }
                    }).then(function (response) {
                        console.log(response);

                        // inspect the api call
                        console.log('https://api.yelp.com/v3/businesses/search?term=' + type + '&longitude=' + lon + '&latitude=' + lat + '&price=' + price + '&open_now=true&radius=10000');

                        // clear the body
                        $("#the-body").empty();

                        // Will need another API call for the the business hours
                        // https://www.yelp.com/developers/documentation/v3/business

                        // add the header + div
                        $("#the-body").append(
                            `<section class="hero has-background-danger">
                            <div class="hero-body">
                                <div class="container has-text-centered">
                                    <h1 class="title is-size-1 has-text-white">Weather Eats <span class="icon"><i class="fas fa-stroopwafel"></i></span></h1>
                                </div>
                            </div>
                        </section>
                        <br>
                        <section class="columns">
                            <div class="column is-8 is-offset-2 box" id="weather-content">
                            <img id="business-image" src="${response.businesses[0].image_url}"/>                        
                            <p>Cuisine: ${response.businesses[0].categories[0].title}</p>
                            <p>Price: ${response.businesses[0].price}</p>
                            <p>Rating: ${response.businesses[0].rating}/5</p>
                            <p>Location: ${response.businesses[0].location.address1}, 
                            ${response.businesses[0].location.city}, 
                            ${response.businesses[0].location.state} 
                            ${response.businesses[0].location.zip_code}</p>
                            <p>Phone number: ${response.businesses[0].display_phone}</p>
                            <br>
                            <p>Hours</p>
                            <p>Monday: XXX</p>
                            <p>Tuesday: XXX</p>
                            <p>Wednesday: XXX</p>
                            <p>Thursday: XXX</p>
                            <p>Friday: XXX</p>
                            <p>Saturday: XXX</p>
                            <p>Sunday: XXX</p>
                            <div id="googleMap" ></div>
                            </div>
                            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1vAB6ebgaBoaJKNAgmnFeVICug9Ls8fo&callback=myMap"></script>
                        </section>`           
                        );

                    })

                })

            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

renderWeather();
function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(lat,lon),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position: mapProp.center});
    
    marker.setMap(map);
}


