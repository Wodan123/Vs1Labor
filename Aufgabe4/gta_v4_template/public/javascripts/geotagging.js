console.log("The geoTagging script is going to start...");

let actualTaglist = JSON.parse(document.getElementById("map").getAttribute("data-tags"));
const TAGS_NUMBER = 5;

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
        updatePagination;
    }
}
function apiMapUpdate(array){
    let mapManager = new MapManager("yaMPFXET2G0vG84h8G9MxGQBo2a35oVc");
    let lat = parseFloat(document.getElementById("taglatinput").getAttribute("value"));
    let lon = parseFloat(document.getElementById("taglonginput").getAttribute("value")); 
    let mapUrl = mapManager.getMapUrl(lat, lon, array,15);
    document.getElementById("map").setAttribute("src", mapUrl);
}


var nextBtn = document.getElementById("pagination-right");
var preBtn = document.getElementById("pagination-left");

var maxElemsPerPage = 5;
var maxPs = -1;
var curPage = 1;
var currentArr;

function updatePagination() {

    document.getElementById("discoveryResults").innerHTML = "";
    console.log("updatePagination");

    for (i = (curPage - 1) * maxElemsPerPage; i < currentArr.length && i < curPage * maxElemsPerPage; i++) {
        var gtag = currentArr[i];
        var newElem = document.createElement("li");
        newElem.innerHTML = gtag.name + " ( " + gtag.latitude + "," + gtag.longitude + ") " + gtag.hashtag;
        document.getElementById('discoveryResults').appendChild(newElem);
    }
    calcMaxPages(currentArr);
    document.getElementById("pagination-text").value = curPage + " / " + maxPs + "(" + currentArr.length + ")";

    if (curPage == 1) preBtn.disabled = true;
    else preBtn.disabled = false;

    if (curPage == maxPs) nextBtn.disabled = true;
    else nextBtn.disabled = false;

    apiMapUpdate(currentArr);
}
async function calcMaxPages(arr) {
    maxPs = Math.ceil(arr.length / maxElemsPerPage);
}

async function postAdd(geotag) {
    let response = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(geotag),
    });
    return await response.json();
}

nextBtn.addEventListener("click", async function (e) {
    if (curPage < maxPs) {
        curPage++;
        updatePagination();
    }
});


preBtn.addEventListener("click", async function (e) {
    if (curPage > 1) {
        curPage--;
        updatePagination();
    }
});


document.getElementById("tag-form").addEventListener("submit", function (evt) {
    evt.preventDefault();

    let geotag = {
        name: document.getElementById("tagnameinput").value,
        latitude: document.getElementById("taglatinput").value,
        longitude: document.getElementById("taglonginput").value,
        hashtag: document.getElementById("taghashtaginput").value
    }

    postAdd(geotag).then(apiMapUpdate).then(updatePagination);
    document.getElementById("tagnameinput").value = "";
    document.getElementById("taghashtaginput").value = "";
    document.getElementById("discoveryinput").value = "";
}, true);

document.getElementById("discoverybutton").addEventListener("submit", function (evt) {
    evt.preventDefault();

    apiMapUpdate.then(updatePagination);
});


document.addEventListener("DOMContentLoaded", updateLocation(), true);
