// File origin: VS1LAB A3

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

    // TODO: ... your code here ...
    
    #setOfGeotags = [];
    examples(){
        let tagList = GeoTagExamples.tagList;
        for (let i = 0; i < (GeoTagExamples.tagList).length; i++) {
                this.addGeoTag(new GeoTag(tagList[i][0], tagList[i][1], tagList[i][2], tagList[i][3]));
        }
    }
    getArray(){
        return this.#setOfGeotags;
    }

    addGeoTag(GeoTag) {
        this.#setOfGeotags.push(GeoTag);
    }

    removeGeoTag(name) {
        for(let i = 0; i < this.setOfGeoTags.length; i++) {
            if(name === this.#setOfGeotags[i].name) {
                this.#setOfGeotags.splice(i);
                break;
            }
        }
    }

    getNearbyGeoTags(tagLatitude, tagLongitude) {
        var radius = 1;
        var res = [];
        var x = tagLatitude;
        var y = tagLongitude;
        this.#setOfGeotags.forEach(function (cur) {
            var curX = cur.latitude-x;
            var curY = cur.longitude-y;
            var squareX = Math.pow(curX,2);
            var squareY = Math.pow(curY,2);
            var squareR = Math.pow(radius,2);
            if((squareX+squareY)<=squareR) //im Bereich Zentrum +- radius
            {
                res.push(cur);
            }
        });
        return res;
    }
    //Methodenüberladung siehe index.js
    getNearbyGeoTagsO(tagLatitude, tagLongitude, geotagArray) {
        var radius = 100;
        var res = [];
        var x = tagLatitude;
        var y = tagLongitude;
        geotagArray.forEach((cur) => {
            var curX = cur.latitude-x;
            var curY = cur.longitude-y;
            var squareX = Math.pow(curX,2);
            var squareY = Math.pow(curY,2);
            var squareR = Math.pow(radius,2);
            if((squareX+squareY)<=squareR) //im Bereich Zentrum +- radius
            {
                res.push(cur);
            }
        });
        return res;
    }
    //Cleaned Up Version, diese sucht nur nach Hashtag oder Namen
    searchGeoTags(searching) {
        let nearbyGeoTags = [];

        this.#setOfGeotags.forEach(geotag => {
            let geoTagName = geotag.name;
            let geoTagHash = geotag.hashtag;

            if(geoTagName.includes(searching) || geoTagHash.includes(searching)) {
                nearbyGeoTags.push(geotag);
            }
        });

        return nearbyGeoTags;
    }
    //Cleaned Up Methode, überladen -> index.js
    searchGeoTagsO(searching, geotagArray) {
        let nearbyGeoTags = [];

        geotagArray.forEach(geotag => {
            let geoTagName = geotag.name;
            let geoTagHash = geotag.hashtag;

            if(geoTagName.includes(searching) || geoTagHash.includes(searching)) {
                nearbyGeoTags.push(geotag);
            }
        });

        return nearbyGeoTags;
    }

    //vorher wurde bei searchNearby nie wirklich nearby gesucht, weil die getNearby nicht darin aufgerufen wurde
    //dies ist jetzt behoben. Daher Trennung zwischen search und searchNearby
    searchNearbyGeoTags(searching) {
        let match;
        // let nearbyGeoTags = this.getNearbyGeoTags(this.#setOfGeotags);
        let res = [];

        for (let i = 0; i < this.#setOfGeotags.length; i++) {
            let geoTagName = this.#setOfGeotags[i].name;
            let geoTagHash = this.#setOfGeotags[i].hashtag;

            if(geoTagName.includes(searching) || geoTagHash.includes(searching)) {
                match = this.#setOfGeotags[i];
                res.push(match);
            }
        }

        return res;
    }
}

module.exports = InMemoryGeoTagStore;