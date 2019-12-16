lat = localStorage.getItem("lat");
lon = localStorage.getItem("lon");
businessImage = localStorage.getItem("businessImage");
console.log(businessImage);
businessCusine = localStorage.getItem("businessCusine");
console.log(businessCusine);
businessPrice = localStorage.getItem("businessPrice");
console.log(businessPrice);
businessRating = localStorage.getItem("businessRating");
console.log(businessRating);
businessLocation = localStorage.getItem("businessLocation");
console.log(businessLocation);
businessPhone = localStorage.getItem("businessPhone");
console.log(businessPhone);

// console.log($("#cuisineP"));

function change(){
    // Update ids 
    $("#business-image").attr("src", businessImage);
    $("#cuisineP").text(`Cuisine: ${businessCusine}`);
    $("#priceP").text(`Price: ${businessPrice}`);
    $("#ratingP").text(`Rating: ${businessRating}/5`);
    $("#locationP").text(`Location: ${businessLocation}`);
    $("#phoneP").text(`Phone number: ${businessPhone}`);
}
change();
// update map
function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(lat,lon),
      zoom:15,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position: mapProp.center});
    
    marker.setMap(map);
}


