var geoLoc = document.querySelector('.geoButton');

geoLoc.addEventListener('click', function(event) {
event.preventDefault();    
    console.log('button works?');
    geoLocate(function(latitude, longitude) {
        var locString = '/?lat=' + latitude + '&long=' + longitude;
        xhr('GET', locString, function(data)
    {
        console.log(data);
    })
    })
}
);