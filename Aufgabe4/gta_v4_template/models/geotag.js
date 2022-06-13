// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
 class GeoTag {
    // TODO: ... your code here ...
    constructor(name, latitude, longitude, hashtag, id) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hashtag = hashtag;
        this.id = id;
    }
}

module.exports = GeoTag;