# WeatherEats

## Description

This website recommends restaurants based on the weather and certain filters. Different weather conditions determine what type of restaurants are recommended. For example, a rainy day will have more recommendations for warmn foods such as soups. On top of the weather recommendations, the user may also choose from three filters: Family, Budget, and Buisines. These filters further affect the recommendations provided.
Once the user has selected the filters, they may then press the Find Restaurants button. This causes a grid of restaurant images to be populated to the page. Clicking any of these images opens a new tab on the browser with information about that restaurant, such as address and business hours.

## Technologies Used

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [jQuery](https://jquery.com/)
* [Bulma](https://bulma.io/documentation/)
* [Packery](https://packery.metafizzy.co/)
* [Open Weather](https://openweathermap.org/api)
* [Yelp Fusion](https://www.yelp.com/developers/documentation/v3)
* [Google Maps](https://developers.google.com/maps/documentation)
* [Git](https://git-scm.com/)
* [GitHub](https://github.com/)
* [VSCode](https://code.visualstudio.com/)

## Deployed Link

* [weatherEats](https://xrachhel.github.io/weatherEats/)

## Demo of Deployed Site

![alt-text](assets/images/full-demo.gif)

## Mobile Responsiveness

![alt-text](assets/images/responsiveness.gif)

## Code Snipets

```
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
```
This portion of the script file displays how the weather and the filters affect the results. Each weather condition sets initializes the type variable which will be used in the query request for the yelp api. Similarly, the filters will affect the price range and the category.

```
url: 'https://api.yelp.com/v3/businesses/search?term=' + type + '&longitude=' + lon + '&latitude=' + lat + '&price=' + price + '&open_now=true&categories=' + category + '&radius=10000&limit=48'
```
Once all the variables are initialized, they are concatinated into the parameters of the query URL used for the Yelp API call. 

```
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
```
Using the response from the Yelp API, the website dynamically generates images and appends them to the page. Once the images are loaded, they are processed using the Packery library and arranged onto a grid.

```
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
```
This is the function that is run when a restaurant image is clicked. Using the restaurant id information provided by the first Yelp API call, another API call is made to retrieve the individual restaurant's information (i.e. Business Hours, Address). This data is saved to local storage because the Google API to display the map required a second tab to be opened. This gives the second page access to the JSON file by simply pulling it from local storage.

```
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 15,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker = new google.maps.Marker({ position: mapProp.center });

  marker.setMap(map);
}
```
This is the function that generates the Google map. The latitude and longitude are retrieved from the JSON object in local storage. This map is then appended to a div on the HTML file with an ID of "googleMap".

## Authors

**Oren Amema**
* [Github](https://github.com/orenamema)
* [LinkedIn](https://www.linkedin.com/in/oren-amematekpo-b7a12b13)

**Rachel Yeung**

* [Github](https://github.com/xrachhel)
* [LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)

**Yalí Miranda** 

* [Github](https://github.com/yjmiranda)
* [LinkedIn](https://www.linkedin.com/in/yal%C3%AD-miranda-8b4b94199/)