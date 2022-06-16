console.log("The geoTagging script is going to start...");

let tagList = JSON.parse(document.getElementById("map").getAttribute("data-tags"));

function mapUpdate(latitude, longitude) {
    let nearGeoTaglist = JSON.parse(document.getElementById("map").getAttribute("data-tags"));
    let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    let mapUrl = mapManager.getMapUrl(latitude, longitude, nearGeoTaglist, 15);
    document.getElementById("map").setAttribute("src", mapUrl);
}

function updateLocation() {

    if ((document.getElementById("taglatinput").getAttribute("value") === "" ||
        document.getElementById("taglonginput").getAttribute("value") === "")) {
        LocationHelper.findLocation(function (loc) {
            document.getElementById("disclatinput").setAttribute("value", loc.latitude);
            document.getElementById("disclonginput").setAttribute("value", loc.longitude);
            document.getElementById("taglatinput").setAttribute("value", loc.latitude);
            document.getElementById("taglonginput").setAttribute("value", loc.longitude);
            mapUpdate(loc.latitude, loc.longitude);
        });
    } else {
        let latitude = document.getElementById("taglatinput").getAttribute("value");
        let longitude = document.getElementById("taglonginput").getAttribute("value");
        mapUpdate(latitude, longitude);
    }
}

async function postAddGT(geotag) {
    console.log("Help!");
    let response = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geotag),
    });
    return response;
}

async function getGeotag() {
    const res = await fetch("http://localhost:3000/api/geotags", {
        method: "GET"
    });
    return res.json();
}


var btn = document.getElementById("tagbutton");

function apiMapUpdate(tagList){
    let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    let lat = document.getElementById("taglatinput").getAttribute("value");
    let lon = document.getElementById("taglonginput").getAttribute("value"); 
    let mapUrl = mapManager.getMapUrl(lat, lon, JSON.parse(tagList),15);
    document.getElementById("map").setAttribute("src", mapUrl);
}

function apiListUpdate(tagList){
    tagList = JSON.parse(tagList);
}








btn.addEventListener("click", function (e) {
    console.log("???????????????????");
    e.preventDefault();
    let lat = document.getElementById("taglatinput").getAttribute("value");
    let lon = document.getElementById("taglonginput").getAttribute("value"); 
    if (document.getElementById("tag-form").reportValidity()) {
        var geotag = {
            name: document.getElementById("tagnameinput").value,
            latitude: lat,
            longitude: lon,
            hashtag: document.getElementById("taghashtaginput").value
        }
    };
    console.log("erfolgreich");
    postAddGT(geotag);
    apiMapUpdate();
    apiListUpdate();

});

document.addEventListener("DOMContentLoaded", updateLocation(), true);
