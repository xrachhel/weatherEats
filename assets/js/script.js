var weatherContent = $("#weather-content");

function renderWeather() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude

            var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=2cf011e0ff0bddcd3b775b324d2a19d4";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);
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


                // checkboxes
                var category;
                $("#family").on("click", function () {
                    if ($(this).is(':checked')) {
                        price = "1,2,3,4"
                        family = true;
                        category = "kidfriendly,restaurant"
                    }
                })
                $("#budget").on("click", function () {
                    if ($(this).is(':checked')) {
                        price = "1,2"
                        budget = true;
                        category = "restaurant"
                    }
                })
                $("#business").on("click", function () {
                    if ($(this).is(':checked')) {
                        price = "2,3,4 "
                        business = true;
                        category = "fancy,restaurant"
                    }
                })

                jQuery.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors) {
                        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                    }
                });
                $("#restaurants").on("click", function () {
                    event.preventDefault()
                    $("#body").attr("style", "background-image: none");
                    $("#find-restaurants-div").attr("style", "display: none");
                    $("#filter-div").attr("style", "display: none");

                    var main = response.weather[0].main
                    var lat = response.coord.lat
                    var lon = response.coord.lon

                    var type;

                    if (main === "Clouds" || main === "Rain") {
                        type = "soup"
                    }
                    else if (main === "Thunderstorm") {
                        type = "takeout"
                    }
                    else if (main === "Clear") {
                        type = "patio"
                    }
                    //if more than one box is checked
                    if (budget === true && family === true) {
                        price = "1,2"
                        category = "kidfriendly,restaurant"
                    }
                    else if (family === true && business === true) {
                        price = "3,4"
                        category = "kidfriendly,fancy,restaurant"
                    }
                    else if (budget === true && business === true) {
                        price = "1,2"
                        category = "fancy,restaurant"
                    }
                    //First Yelp API call
                    $.ajax({
                        url: 'https://api.yelp.com/v3/businesses/search?term=' + type + '&longitude=' + lon + '&latitude=' + lat + '&price=' +
                            price + '&open_now=true&categories=' + category + '&radius=10000&limit=48',
                        method: "GET",
                        headers: {
                            authorization: "Bearer CyZO8Ys8yDQ-FCnqNZegGIU2FvGwOLg00MP1JtA6GLKWM2SadzcHyCA4KMt9Y9643sXFsA2bhvDY4RKLyydvPULurteiMPQKydq62F92eEKefWJnbuOanTUtAtjzXXYx"
                        }
                    }).then(function (result) {
                        console.log(result)
                        runPackery(result.businesses);
                    })

                })

            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function runPackery(arr) {
    var grid = $(".grid");
    for (var i = 0; i < arr.length; i++) {
        var gridItem = $("<div>");
        gridItem.addClass("grid-item");
        grid.append(gridItem);

        var image = $("<img>");
        image.attr("src", arr[i].image_url)
        image.addClass("restaurant-img");
        image.attr("id", arr[i].id);
        gridItem.append(image);
        $("#" + arr[i].id).click(function () {
            showModal(this.id);
        });

    }

    var $grid = $('.grid').packery({
        itemSelector: '.grid-item'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.packery();
    });
}

renderWeather();

//Second Yelp API call 
function showModal(id) {
    $.ajax({
        url: "https://api.yelp.com/v3/businesses/" + id,
        method: "GET",
        headers: {
            authorization: "Bearer CyZO8Ys8yDQ-FCnqNZegGIU2FvGwOLg00MP1JtA6GLKWM2SadzcHyCA4KMt9Y9643sXFsA2bhvDY4RKLyydvPULurteiMPQKydq62F92eEKefWJnbuOanTUtAtjzXXYx"
        }
    }).then(function (response) {
        console.log(response)
        localStorage.setItem("businessData", JSON.stringify(response));
        $(".modal").addClass("is-active");

        window.open("businessPage.html", '_blank');

    });
}




