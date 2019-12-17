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

* []

## Code Snipet

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

## Authors

**Oren Amema**

**Rachel Yeung**

**Yalí Miranda** 

* [Github](https://github.com/yjmiranda)
* [LinkedIn](https://www.linkedin.com/in/yal%C3%AD-miranda-8b4b94199/)# weatherEats