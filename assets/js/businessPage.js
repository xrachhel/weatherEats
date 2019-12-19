data = JSON.parse(localStorage.getItem("businessData"));
lat = data.coordinates.latitude;
lon = data.coordinates.longitude;
businessImage = data.image_url;
businessCusine = data.categories[0].title;
businessPrice = data.price;
businessRating = data.rating;
businessLocation = `${data.location.address1}, 
                        ${data.location.city}, 
                        ${data.location.state} 
                        ${data.location.zip_code}`;
businessPhone = data.display_phone;
businessName = data.name;
console.log(data)
function change() {
  $("#businessP").text(businessName);
  $("#business-image").attr("src", businessImage);
  $("#cuisineP").text(`${businessCusine}`);
  $("#priceP").text(`${businessPrice}`);
  $("#ratingP").text(`${businessRating}/5`);
  $("#locationP").text(`${businessLocation}`);
  $("#phoneP").text(`${businessPhone}`);

  //business hours
  for (var i = 0; i < data.hours[0].open.length; i++) {
    var day = data.hours[0].open[i].day
    console.log(day)
    var dayWeek;
    if (day === 0) {
      dayWeek = "Sunday"
    }
    else if (day === 1) {
      dayWeek = "Monday"
    }
    else if (day === 2) {
      dayWeek = "Tuesday"
    }
    else if (day === 3) {
      dayWeek = "Wednesday"
    }
    else if (day === 4) {
      dayWeek = "Thursday"
    }
    else if (day === 5) {
      dayWeek = "Friday"
    }
    else if (day === 6) {
      dayWeek = "Saturday"
    }
    if (data.hours[0].open[i] === data.hours[0].open[i + 1]) {
      var start = data.hours[0].open[i].start
      var end = data.hours[0].open[i].end
      var start1 = data.hours[0].open[i + 1].start
      var end1 = data.hours[0].open[i + 1].start
      var hourDiv = $("<div>" + dayWeek + ": " + start + "-" + end + "," + start1 + "-" + end1 + "</div>")
      var hoursDiv = $("<div>       " + start1 + "-" + end1 + "</div")
      $("#hours").append(hourDiv)
      $("#hours").append(hoursDiv)
    }
    else {

      var start = data.hours[0].open[i].start
      var end = data.hours[0].open[i].end
      var hourDiv = $("<div>" + dayWeek + ": " + start + "-" + end + "</div>")
      $("#hours").append(hourDiv)
    }

  }
}
change();
// update map
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



