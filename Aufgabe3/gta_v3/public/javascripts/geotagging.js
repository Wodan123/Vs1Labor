
console.log("The geoTagging script is going to start...");


function updateLocation() {

    try{
        
        LocationHelper.findLocation(function(loc) {
            //Holen uns die Koordinaten ausm Locationhelper
            var longitude = loc.longitude;
            var latitude = loc.latitude;
            //Selecten die richtigen Elemente ausm Discovery-HTML
            let disclatinginput = document.getElementById("disclatinput");
            let disclonginput = document.getElementById("disclonginput");
            //Selecten die richtigen Elemente ausm Tagging-HTML
            let taglatinginput = document.getElementById("taglatinput");
            let taglonginput = document.getElementById("taglonginput");
            //Die Koordinaten in die Inputs schreiben
            disclatinginput.setAttribute("value",latitude);
            disclonginput.setAttribute("value",longitude);
            taglatinginput.setAttribute("value",latitude);
            taglonginput.setAttribute("value",longitude);
            //Map generierung
            var mapvar= new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");            //Schlüssel von der WEB API 
            let URL = mapvar.getMapUrl(latitude,longitude, [], 15);   
            let map = document.getElementById("map");
            map.src = URL;
        });

    }
    catch(error) {
        alert("error");
    }


}

document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});