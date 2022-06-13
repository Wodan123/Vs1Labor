// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */
/**
 * Define module dependencies.
 */

 const express = require('express');
 const router = express.Router();
 
 /**
  * The module "geotag" exports a class GeoTagStore. 
  * It represents geotags.
  * 
  * TODO: implement the module in the file "../models/geotag.js"
  */
 // eslint-disable-next-line no-unused-vars
 const GeoTag = require('../models/geotag');
 const GeoTagExamples = require('../models/geotag-examples');
 /**
  * The module "geotag-store" exports a class GeoTagStore. 
  * It provides an in-memory store for geotag objects.
  * 
  * TODO: implement the module in the file "../models/geotag-store.js"
  */
 // eslint-disable-next-line no-unused-vars
 const GeoTagStore = require('../models/geotag-store');
 var GeoTagStoreObject = new GeoTagStore();
 
 GeoTagStoreObject.examples(); //Lade die GeoTag-Beispiele in unser Array
 
 /**
  * Route '/' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests cary no parameters
  *
  * As response, the ejs-template is rendered without geotag objects.
  */
 
 // TODO: extend the following route example if necessary
 router.get('/', (req, res) => {
   res.render('index', { taglist: GeoTagStoreObject.getArray() , latvalue: "", longvalue: "", mapGeoTagList: JSON.stringify(GeoTagStoreObject.getArray()) });
 });

 router.post('/tagging',(req, res)=> {
   GeoTagStoreObject.addGeoTag(new GeoTag(req.body.tagname, req.body.tagLatitude, req.body.tagLongitude, req.body.taghashtag));
   let nearbyGT = GeoTagStoreObject.getNearbyGeoTags(req.body.tagLatitude, req.body.tagLongitude);
   console.log(req.body);
     res.render("index", { 
       taglist: nearbyGT,
       latvalue: req.body.tagLatitude,
       longvalue: req.body.tagLongitude, 
       mapGeoTagList: JSON.stringify(nearbyGT)
     });   
 })

 router.post('/discovery',(req, res)=> {
   let searchTerm = req.body.searchbox;
   let searching = GeoTagStoreObject.searchNearbyGeoTags(searchTerm);
   res.render("index", { 
     taglist: searching,
     latvalue: req.body.hiddenLatitude,
     longvalue: req.body.hiddenLongitude,
     mapGeoTagList: JSON.stringify(searching)
   });   
 });
//hier neu 
 router.get('/', (req, res) => {
  res.render('index', { taglist: [] })
});

router.get('/geotags', function(req, res){ 
   
  console.log(req.query.search);
    if(req.query.search !== undefined)   
    {
      res.json(GeoTagStoreObject.searchNearbyGeoTags(req.query.search));
    }else if(req.body.tagLatitude !== undefined && req.body.tagLongitude !== undefined) {
      res.json(GeoTagStoreObject.getNearbyGeoTags(req.body.tagLatitude, req.body.tagLongitude));
    }else
    {
      res.json(GeoTagStoreObject.getArray()); //returns all geotags
    }
  }); 

  router.post('/geotags/', function(req, res){ 
    console.log(req.body);
    GeoTagStoreObject.addGeoToMap(req.body); 
    
    });

    router.get('/geotags/:id', function(req, res){ 
      res.json(GeoTagStoreObject.map.get(parseInt(req.params.id)));   
  }); 
  
  
   router.put('/geotags/:id', function(req, res){ 
    console.log(req.params.id, req.body);
    GeoTagStoreObject.update(req.params.id, req.body);
    }); 
  
   router.delete('/geotags/:id', function(req, res){ 
    res.json(GeoTagStoreObject.delete(parseInt(req.params.id)));   
  }); 
 
 module.exports = router;
