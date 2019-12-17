data = JSON.parse(localStorage.getItem("businessData"));
lat = data.coordinates.latitude;
lon = data.coordinates.longitude;
businessImage = data.image_url;
console.log(businessImage);
businessCusine = data.categories[0].title;
console.log(businessCusine);
businessPrice = data.price;
console.log(businessPrice);
businessRating = data.rating;
console.log(businessRating);
businessLocation = `${data.location.address1}, 
                        ${data.location.city}, 
                        ${data.location.state} 
                        ${data.location.zip_code}`;
console.log(businessLocation);
businessPhone = data.display_phone;
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


