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

//  https://www.spacearchive.info/military.htm
matcher = {'0000':'Midnight' ,'0100':'1:00 a.m.' ,'0200':'2:00 a.m.' ,'0300':'3:00 a.m.' 
        ,'0400':'4:00 a.m.' ,'0500':'5:00 a.m.' ,'0600':'6:00 a.m.' ,'0700':'7:00 a.m.' 
        ,'0800':'8:00 a.m.' ,'0900':'9:00 a.m.' ,'1000':'10:00 a.m.' ,'1100':'11:00 a.m.' 
        ,'1200':'Noon' ,'1300':'1:00 p.m.' ,'1400':'2:00 p.m.' ,'1500':'3:00 p.m.' 
        ,'1600':'4:00 p.m.' ,'1700':'5:00 p.m.' ,'1800':'6:00 p.m.' ,'1900':'7:00 p.m.' 
        ,'2000':'8:00 p.m.' ,'2100':'9:00 p.m.' ,'2200':'10:00 p.m.' ,'2300':'11:00 p.m.'};

// console.log($("#cuisineP"));

function change(){
    // Update ids 
    $("#businessP").text(businessName);
    $("#business-image").attr("src", businessImage);
    $("#cuisineP").text(`${businessCusine}`);
    $("#priceP").text(`${businessPrice}`);
    $("#ratingP").text(`${businessRating}/5`);
    $("#locationP").text(`${businessLocation}`);
    $("#phoneP").text(`${businessPhone}`);
    $("#mondayP").text(`${data.hours[0].open[0].start} - ${data.hours[0].open[0].end}`);
    $("#tuesdayP").text(`${data.hours[0].open[1].start} - ${data.hours[0].open[1].end}`);
    $("#wednesdayP").text(`${data.hours[0].open[2].start} - ${data.hours[0].open[2].end}`);
    $("#thursdayP").text(`${data.hours[0].open[3].start} - ${data.hours[0].open[3].end}`);
    $("#fridayP").text(`${data.hours[0].open[4].start} - ${data.hours[0].open[4].end}`);
    $("#saturdayP").text(`${data.hours[0].open[5].start} - ${data.hours[0].open[5].end}`);
    $("#sundayP").text(`${data.hours[0].open[6].start} - ${data.hours[0].open[6].end}`);
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



