// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class representing example geoTags at HKA
 * 
 * TODO: populate your InMemoryGeoTagStore with these tags
 * 
 */
class GeoTagExamples {
    /**
     * Provides some geoTag data
     */

    static get tagList() {
        return [
            ['Castle', 49.013790, 8.404435, '#sight',0],
            ['IWI', 49.013790, 8.390071, '#edu',1],
            ['Building E', 49.014993, 8.390049, '#campus',2],
            ['Building F', 49.015608, 8.390112, '#campus',3],
            ['Building M', 49.016171, 8.390155, '#campus',4],
            ['Building LI', 49.015636, 8.389318, '#campus',5],
            ['Auditorium He', 49.014915, 8.389264, '#campus',6],
            ['Building R', 49.014992, 8.392365, '#campus',7],
            ['Building A', 49.015738, 8.391619, '#campus',8],
            ['Building B', 49.016843, 8.391372, '#campus',9],
            ['Building K', 49.013190, 8.392090, '#campus',10],
            ['TestFall', 50.00, 50.00, '#far', 11],
        ];
    }
}

module.exports = GeoTagExamples;
