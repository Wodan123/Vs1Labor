// File origin: VS1LAB A3

const { json } = require("express");
const GeoTag = require("./geotag");

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
    
    #setOfGeotags = []; //Empty set of geotags
    #getNearGT = [];

    addGeoTag() {
        this.#setOfGeotags.push(GeoTag);
        this.#setOfGeotags.forEach(e => {
            console.log(e);
        });
    }

    removeGeoTag() {
        for(var i = 0; i < setOfGeoTags.length; i++) {
            if(this.#setOfGeotags[i].tagname === GeoTag.tagname) {
                this.#setOfGeotags[i].pop();
            }
        }
    }

    getNearbyGeoTags() {
        var latitude = GeoTag.latitude;
        var longitude = GeoTag.longitude;
        var radius = 0.500;
        
        for(var i = 0; i < this.#setOfGeotags.length; i++) {

        //Fkt. siehe https://www.vectorsoft.de/blog/2011/11/geokodierung-mittels-webservices-und-entfernungsberechnung/

        var lat = this.#setOfGeotags[i].latitude + latitude / 2.0 * 0.01745;
        var dx = 111.3 * Math.cos(lat) * Math.abs(longitude - this.#setOfGeotags[i].longitude);        
        var dy = 111.3 * Math.abs(latitude - this.#setOfGeotags[i].latitude);
        var sqrt = Math.sqrt(dx * dx + dy * dy); //Abstand in km

            if(sqrt < radius) {
                this.#getNearGT.push(this.#setOfGeotags[i]);
            }
        }
        return this.#getNearGT;
    }

    searchNearbyGeoTags(name, hashtag) {
        var latitude = GeoTag.latitude;
        var longitude = GeoTag.longitude;
        var tagname = GeoTag.tagname;
        var hashtag = GeoTag.hashtag;
        ret = this.getNearbyGeoTags(this.latitude, this.longitude); // Array wo die naheliegenden GT gespeichert werden, aber nur wo der Name bzw. der Hashtag mit der Suche matched
        
        for(var i = 0; i < this.ret.length; i++) {
            if(!((this.tagname === this.ret[i].tagname) || (this.hashtag === this.ret[i].hashtag))) {
                ret[i].pop(this.ret[i]); // löscht die Werte aus dem Array wo der Name und Hashtag nicht passt, (umgekehrte Logik)
                                        // so werden am Ende nur die GT zurückgegeben im Array, die Proximity und (Hashtag od. Name) haben.
            }   
        }
    return ret;
    }
}

module.exports = InMemoryGeoTagStore;