console.log("The geoTagging script is going to start...");

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
    let response = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(geotag),
    });
    return await response.json();
}

document.getElementById("tagbutton").addEventListener("click", function (evtLi) {
    evtLi.preventDefault();
 
    let geotag = {
        name: document.getElementById("tagname").value,
        latitude: document.getElementById("taglatinput").value,
        longitude: document.getElementById("taglonginput").value,
        hashtag: document.getElementById("taghashtag").value
    }
    console.log("Erfolgreich");
    postAddGT(geotag).then(getMapUpdate());
}, true);

function mapUpdate(latitude, longitude) {
    let nearGeoTaglist = JSON.parse(document.getElementById("map").getAttribute("data-tags"));
    let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    let mapUrl = mapManager.getMapUrl(latitude, longitude, nearGeoTaglist, 15);
    document.getElementById("map").setAttribute("src", mapUrl);
}
document.addEventListener("DOMContentLoaded", updateLocation(), true);
