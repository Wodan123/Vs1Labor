console.log("The geoTagging script is going to start...");

function updateLocation(array) {

    if ((document.getElementById("taglatinput").getAttribute("value") === "" ||
        document.getElementById("taglonginput").getAttribute("value") === "")) {
        LocationHelper.findLocation(function (loc) {
            document.getElementById("disclatinput").setAttribute("value", loc.latitude);
            document.getElementById("disclonginput").setAttribute("value", loc.longitude);
            document.getElementById("taglatinput").setAttribute("value", loc.latitude);
            document.getElementById("taglonginput").setAttribute("value", loc.longitude);
            mapUpdate(loc.latitude, loc.longitude, array);
        });
    } else {
        let latitude = document.getElementById("taglatinput").getAttribute("value");
        let longitude = document.getElementById("taglonginput").getAttribute("value");
        mapUpdate(latitude, longitude, array);
    }

}

async function postAddGT(geotag) {
    let response = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geotag),
    });
    return response.json();
}



async function getGeotag() {
    const res = await fetch("http://localhost:3000/api/geotags", {
        method: "GET"
    });
    return res.json();
}

var btn = document.getElementById("tagbutton");



btn.addEventListener("click", function (e) {
    console.log("???????????????????");
    e.preventDefault();
    if (document.getElementById("tag-form").reportValidity()) {
        var geotag = {
            name: document.getElementById("tagnameinput").value,
            latitude: document.getElementById("taglatinput").getAttribute("value"),
            longitude: document.getElementById("taglonginput").getAttribute("value"),
            hashtag: document.getElementById("taghashtaginput").value
        }
    };
    console.log("erfolgreich");
    postAddGT(geotag);

});

function mapUpdate(latitude, longitude, array) {
    let nearGeoTaglist = JSON.parse(document.getElementById("map").getAttribute("data-tags"));
    let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    let mapUrl = mapManager.getMapUrl(latitude, longitude, array == null ? nearGeoTaglist : array , 15);
    document.getElementById("map").setAttribute("src", mapUrl);
}
document.addEventListener("DOMContentLoaded", updateLocation(), true);
