var weatherContent = $("#weather-content");
// jQuery.ajaxPrefilter(function (options) {
//     if (options.crossDomain && jQuery.support.cors) {
//       options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//     }
//   });


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


                //----------------------------------------YELP API-----------------------------------------------
                
                
                var category;
                $("#family").on("click", function(){
                    if ($(this).is(':checked')){
                        price = "1,2,3,4"
                        family = true;
                        category = "kidfriendly,restaurant"
                        console.log("family")
                    }
                })
                $("#budget").on("click", function(){
                    if($(this).is(':checked')){
                        price = "1,2"
                        budget = true;
                        category = "restaurant"
                        console.log("budget")
                    }
                })
                $("#business").on("click", function(){
                    if ($(this).is(':checked')){
                        price = "2,3,4 "
                        business = true;
                        category = "fancy,restaurant"
                        console.log("business")
                    }
                })

                
            
                jQuery.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors) {
                        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                    }
                });
                $("#restaurants").on("click", function () {
                    event.preventDefault()
                    $("#body").attr("style","background-image: none");
                    $("#find-restaurants-div").attr("style", "display: none");
                    $("#filter-div").attr("style","display: none");

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
//-------------------------------------------if more than one box is checked:----------------------------------------------------------------
                    if (budget === true && family === true){
                        price = "1,2"
                        category = "kidfriendly,restaurant"
                    }
                    else if (family === true && business === true){
                        price = "3,4"
                        category = "kidfriendly,fancy,restaurant"
                    }
                    else if (budget === true && business === true){
                        price = "1,2"
                        category = "fancy,restaurant"
                    }

                    
                    console.log(type)
                    console.log(category)

                    $.ajax({
                        url: 'https://api.yelp.com/v3/businesses/search?term=' + type + '&longitude=' + lon + '&latitude=' + lat + '&price=' + 
                        price + '&open_now=true&categories=' + category + '&radius=10000&limit=12',
                        method: "GET",
                        headers: {
                            authorization: "Bearer CyZO8Ys8yDQ-FCnqNZegGIU2FvGwOLg00MP1JtA6GLKWM2SadzcHyCA4KMt9Y9643sXFsA2bhvDY4RKLyydvPULurteiMPQKydq62F92eEKefWJnbuOanTUtAtjzXXYx"
                        }
                    }).then(function (result) {
                        console.log(result)
                        runPackery(result.businesses);

                        // for (var i = 0; i < result.businesses.length; i ++){
                        //     var id = result.businesses[i].id
                        //     console.log(id)
                        //     //--------------------------------YELP hours of operation ajax call-------------------------------------
                        //     $.ajax({
                        //         url: "https://api.yelp.com/v3/businesses/" + id,
                        //         method: "GET", 
                        //         headers: {
                        //             authorization: "Bearer CyZO8Ys8yDQ-FCnqNZegGIU2FvGwOLg00MP1JtA6GLKWM2SadzcHyCA4KMt9Y9643sXFsA2bhvDY4RKLyydvPULurteiMPQKydq62F92eEKefWJnbuOanTUtAtjzXXYx"
                        //         }
                        //     }).then(function(response){
                        //         console.log(response)
                        //         var restName = result.businesses[0].name
                        //         var prices = result.businesses[0].price
                        //         var ratings = result.businesses[0].rating
                        //         var address = result.businesses[0].location.display_address[0]
                        //         var address2 = result.businesses[0].location.display_address[1]
                        //         var phone = result.businesses[0].display_phone
                        //         // var sunday = response.hours[0].open[0].start
                        //         // var sunday1 = response.hours[0].open[0].end
                        //         for(var i = 0; i < response.hours[0].open.length; i++){
                        //             // var hours = response.hours[0].open[i].start
                        //             // var hourDiv = $("<div>" + hours + "</div>")
                        //             // $("#hours").append(hourDiv)
                        //             // $("#hours").text("Hours: " + hours)
                        //             // console.log(hours)
                        //             var day = response.hours[0].open[i].day
                        //             console.log(day)
                        //             var dayWeek;
                        //             if ( day === 0){
                        //                 dayWeek = "Sunday"
                        //             }
                        //             else if( day === 1){
                        //                 dayWeek = "Monday"
                        //             }
                        //             else if (day === 2){
                        //                 dayWeek = "Tuesday"
                        //             }
                        //             else if (day === 3){
                        //                 dayWeek = "Wednesday"
                        //             }
                        //             else if (day === 4){
                        //                 dayWeek = "Thursday"
                        //             }
                        //             else if (day === 5){
                        //                 dayWeek = "Friday"
                        //             }
                        //             else if (day === 6){
                        //                 dayWeek = "Saturday"
                        //             }
                        //             if(response.hours[0].open[i] === response.hours[0].open[i+1]){
                        //                 var start = response.hours[0].open[i].start
                        //                 var end = response.hours[0].open[i].end
                        //                 var start1 = response.hours[0].open[i+1].start
                        //                 var end1 = response.hours[0].open[i+1].start
                        //                 var hourDiv = $("<div>" + dayWeek +": " + start + "-" + end + "</div>")
                        //                 var hoursDiv = $("<div>" + start1 + "-" + end1 + "</div" )
                        //                 console.log(start,end,start1,end1)
                        //                 $("#hours").append(hourDiv, hoursDiv)
                        //             }
                        //             else{
                        //                 var start = response.hours[0].open[i].start
                        //                 var end = response.hours[0].open[i].end
                        //                 var hourDiv = $("<div>" +dayWeek + ": " + start + "-" + end + "</div>")
                        //                 $("#hours").append(hourDiv)
                        //                 console.log(start,end)
                        //             }
                            
                        //         }
                                

                        //         $("#restaurantName").text(restName)
                        //         console.log(restName)
                        //         // $("#cuisine").text(response[0].categories[0].alias)
                        //         // console.log(response.categories[0].alias)
                        //         $("#price").html("<strong>Price: </strong>" + prices)
                        //         console.log(prices)
                        //         $("#rating").html("<strong>Rating: </strong>" + ratings + "/5")
                        //         console.log(ratings)
                        //         $("#location").html("<strong>Address: </strong>" + address + ", " +  address2)
                        //         console.log(address + address2)
                        //         $("#phone").html("<strong>Phone no.: </strong>" + phone)
                        //         console.log(phone)
                        //         var img = $("<img>")
                        //         img.attr("src", result.businesses[0].image_url)
                        //         img.attr("style", "height: 150px; width: 150px; position: absolute; right: 30px;")
                        //         $("#img").append(img)
                        //         // var sundayDiv = $("<div>" + sunday + "- " + sunday1 + "</div>")
                        //         // $("#hours").append(sundayDiv)
                        //         // console.log(sunday + sunday1)
                                
                        //     })
                        // }
                        

                    })

                })

            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function runPackery(arr){
    var grid = $(".grid");
    for(var i = 0; i < arr.length; i++){
        var gridItem = $("<div>");
        gridItem.addClass("grid-item");
        grid.append(gridItem);

        var image = $("<img>");
        image.attr("src", arr[i].image_url)
        image.addClass("restaurant-img");
        image.attr("id", arr[i].id);
        gridItem.append(image);
        $("#"+arr[i].id).click(function() {
            showModal(this.id); 
        });
        
    }

    var $grid =     $('.grid').packery({
        itemSelector: '.grid-item'
    });

    $grid.imagesLoaded().progress( function() {
    $grid.packery();
});
}

renderWeather();


function showModal(id){
    $.ajax({
        url: "https://api.yelp.com/v3/businesses/" + id,
        method: "GET", 
        headers: {
            authorization: "Bearer CyZO8Ys8yDQ-FCnqNZegGIU2FvGwOLg00MP1JtA6GLKWM2SadzcHyCA4KMt9Y9643sXFsA2bhvDY4RKLyydvPULurteiMPQKydq62F92eEKefWJnbuOanTUtAtjzXXYx"
        }
    }).then(function(response){ 
            console.log(response)
            localStorage.setItem("businessData", JSON.stringify(response));
            $(".modal").addClass("is-active");
           
            window.open("businessPage.html", '_blank');
            
    });  
}



// $("#showModal").click(function() {
//     $(".modal").addClass("is-active");  
//   });
  
  $(".modal-close").click(function() {
     $(".modal").removeClass("is-active");
  });