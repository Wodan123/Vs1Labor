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
// function getMapUpdate(geotag) {
    //     let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    //     let lat = parseFloat(document.getElementById("taglatinput").getAttribute("value"));
    //     let long = parseFloat(document.getElementById("taglonginput").getAttribute("value"));
    //     let mapUrl = mapManager.getMapUrl(lat, long, JSON.parse(geotags));
    //     document.getElementById("map").setAttribute("src", mapUrl);

//     return geotags;
// }

async function postAddGT(geotag) {
    let response = await fetch("http://localhost:3000/geotags", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(geotag),
    });
    return await response.json();
}



async function getGeotag(){
    const res = await fetch("http://localhost:3000/geotags", {
        method: "GET"
    });
    return res.json();
}



document.getElementById("tagbutton").addEventListener("click", function (evtLi) {
    evtLi.preventDefault();

    let geotag = {
        name: document.getElementById("tagname").value,
        latitude: document.getElementById("taglatinput").value,
        longitude: document.getElementById("taglonginput").value,
        hashtag: document.getElementById("taghashtag").value
    }
    console.log("erfolgreich");
    postAddGT(geotag).then(async fun => mapUpdate(latitude, longitude));

}, true);




function mapUpdate(latitude, longitude) {
    let nearGeoTaglist = JSON.parse(document.getElementById("map").getAttribute("data-tags"));
    let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    let mapUrl = mapManager.getMapUrl(latitude, longitude, nearGeoTaglist, 15);
    document.getElementById("map").setAttribute("src", mapUrl);
}
document.addEventListener("DOMContentLoaded", updateLocation(), true);
