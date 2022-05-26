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
    addGeoTag() {
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
        var latitude = tagLatitude;
        var longitude= tagLongitude;
        var radius = 0.500;
        var getNearGT= [];
        for(var i = 0; i < this.#setOfGeotags.length; i++) {

        //Fkt. siehe https://www.vectorsoft.de/blog/2011/11/geokodierung-mittels-webservices-und-entfernungsberechnung/

        var lat = this.#setOfGeotags[i].latitude + latitude / 2.0 * 0.01745;
        var dx = 111.3 * Math.cos(lat) * Math.abs(longitude - this.#setOfGeotags[i].longitude);        
        var dy = 111.3 * Math.abs(latitude - this.#setOfGeotags[i].latitude);
        var sqrt = Math.sqrt(dx * dx + dy * dy); //Abstand in km

            if(sqrt < radius) {
                getNearGT.push(this.#setOfGeotags[i]);
            }
        }
        return this.getNearGT;
    }

    searchNearbyGeoTags(searching) {
        var array = [];
        this.#setOfGeotags.forEach(function (current) {
            if (current.name.includes(searching) || current.hashtag.includes(searching)) array.push(current); 
        });
        console.log(array);
        return array;
    }
}

module.exports = InMemoryGeoTagStore;