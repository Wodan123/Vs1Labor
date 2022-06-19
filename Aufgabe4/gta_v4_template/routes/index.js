// File origin: VS1LAB A3, A4

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
  */
 // eslint-disable-next-line no-unused-vars
 const GeoTag = require('../models/geotag');
 const GeoTagExamples = require("../models/geotag-examples");
 
 /**
  * The module "geotag-store" exports a class GeoTagStore. 
  * It provides an in-memory store for geotag objects.
  */
 // eslint-disable-next-line no-unused-vars
 const GeoTagStore = require('../models/geotag-store');
 var GeoTagStoreObject = new GeoTagStore();
 
 GeoTagStoreObject.examples(); //Lade die Geotag-Beispiele in unser Array
 // App routes (A3)
 
 /**
  * Route '/' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests cary no parameters
  *
  * As response, the ejs-template is rendered without geotag objects.
  */
 
 router.get('/', (req, res) => {
   res.render('index', {taglist: GeoTagStoreObject.getArray() , latvalue: "", longvalue: "", mapGeoTagList: JSON.stringify(GeoTagStoreObject.getArray())})
 });
 
 /**
  * Route '/tagging' for HTTP 'POST' requests.
  * (http://expressjs.com/de/4x/api.html#app.post.method)
  *
  * Requests cary the fields of the tagging form in the body.
  * (http://expressjs.com/de/4x/api.html#req.body)
  *
  * Based on the form data, a new geotag is created and stored.
  *
  * As response, the ejs-template is rendered with geotag objects.
  * All result objects are located in the proximity of the new geotag.
  * To this end, "GeoTagStore" provides a method to search geotags 
  * by radius around a given location.
  */
 
 // TODO: ... your code here ...
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
 });
 /**
  * Route '/discovery' for HTTP 'POST' requests.
  * (http://expressjs.com/de/4x/api.html#app.post.method)
  *
  * Requests cary the fields of the discovery form in the body.
  * This includes coordinates and an optional search term.
  * (http://expressjs.com/de/4x/api.html#req.body)
  *
  * As response, the ejs-template is rendered with geotag objects.
  * All result objects are located in the proximity of the given coordinates.
  * If a search term is given, the results are further filtered to contain 
  * the term as a part of their names or hashtags. 
  * To this end, "GeoTagStore" provides methods to search geotags 
  * by radius and keyword.
  */
 
 // TODO: ... your code here ...
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
 
 // API routes (A4)
 
 /**
  * Route '/api/geotags' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests contain the fields of the Discovery form as query.
  * (http://expressjs.com/de/4x/api.html#req.body)
  *
  * As a response, an array with Geo Tag objects is rendered as JSON.
  * If 'searchterm' is present, it will be filtered by search term.
  * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
  */
 
 // TODO: ... your code here ...
 router.get('/api/geotags', (req, res) => {
   
   let searchterm = req.query.searchterm;
   let latitude = req.query.latitude;
   let longitude = req.query.longitude;
 
   console.log(`Here is your searchterm: ${searchterm},${latitude},${longitude}`);

   if (searchterm === undefined && latitude === undefined && longitude === undefined) {
    return res.json(GeoTagStoreObject.getArray());
   }
   
   /*First search, when only searchterm is avalaible */
   let searchingWithTerm = GeoTagStoreObject.searchGeoTags(searchterm);
 
   let searchingWithCoords = [];
   /*Second Search, if latitude/longitude are available, and what to do if they are not*/
   if(searchingWithTerm.length === 0) {
     searchingWithCoords = GeoTagStoreObject.getNearbyGeoTags(latitude, longitude);
   } else {
     if(latitude == null || longitude == null) {
       searchingWithCoords = searchingWithTerm;
     }
     else {
       searchingWithCoords = GeoTagStoreObject.getNearbyGeoTagsO(latitude, longitude, searchingWithTerm);
     }
   }
   res.json(searchingWithCoords); 
 });
 
 
 /**
  * Route '/api/geotags' for HTTP 'POST' requests.
  * (http://expressjs.com/de/4x/api.html#app.post.method)
  *
  * Requests contain a GeoTag as JSON????? (not true) in the body.
  * (http://expressjs.com/de/4x/api.html#req.query)
  *
  * The URL of the new resource is returned in the header as a response.
  * The new resource is rendered as JSON in the response.
  */
 
 // TODO: ... your code here ...
 router.post("/api/geotags",(req,res) => {
 
   let GeoT = req.body;
 
   let identifier = GeoTagStoreObject.getArray().length - 1; //Damit man die typische Zählweise eines Arrays beibehält und man mit 0 anfängt zu zählen
 
   identifier++;
 
   let GeoTagPost = new GeoTag(GeoT.name, GeoT.latitude, GeoT.longitude, GeoT.hashtag, identifier);
 
   console.log(GeoTagPost);
   
   GeoTagStoreObject.addGeoTag(GeoTagPost);
   
   let arrayGT = GeoTagStoreObject.getArray();
 
   res.header("Location", `http://localhost:3000/api/geotags/${identifier}`);
 
   res.json({ 
     Geotag : arrayGT[identifier]
   });
 
 });
 
 /**
  * Route '/api/geotags/:id' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  *
  * The requested tag is rendered as JSON in the response.
  */
 
 // TODO: ... your code here ...
 router.get("/api/geotags/:id",(req,res) => {
   
   let identifier = req.params.id;
 
   console.log(identifier);
 
   let searchedGeotag = GeoTagStoreObject.getGeoTagID(identifier);
 
   console.log(searchedGeotag);
 
   res.send(JSON.stringify(searchedGeotag));
 
 });
 
 /**
  * Route '/api/geotags/:id' for HTTP 'PUT' requests.
  * (http://expressjs.com/de/4x/api.html#app.put.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  * 
  * Requests contain a GeoTag as JSON in the body.
  * (http://expressjs.com/de/4x/api.html#req.query)
  *
  * Changes the tag with the corresponding ID to the sent value.
  * The updated resource is rendered as JSON in the response. 
  */
 
 // TODO: ... your code here ...
 router.put("/api/geotags/:id",(req,res) => {
 
   var identifier = req.params.id.split(":");
 
   let GeoT = req.body;
  
   let searchedGT = GeoTagStoreObject.searchGeoTagID(identifier[1]);

   GeoTagStoreObject.removeGeoTag(searchedGT.name);
   
   let GeoTagPost = new GeoTag(GeoT.name, GeoT.latitude, GeoT.longitude, GeoT.hashtag, parseInt(identifier[1]));
 
   GeoTagStoreObject.addGeoTagID(GeoTagPost,parseInt(identifier[1]));
 
   let GTArr = GeoTagStoreObject.getArray();
 
   res.send(JSON.stringify(GeoTagPost) + "\n" + JSON.stringify(GTArr));
 
   //Austauschen des GeoTags im Array, aber auch suchen so wie in der Methode davor
 });
 
 /**
  * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
  * (http://expressjs.com/de/4x/api.html#app.delete.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  *
  * Deletes the tag with the corresponding ID.
  * The deleted resource is rendered as JSON in the response.
  */
 
 // TODO: ... your code here ...
 router.delete("/api/geotags/:id",(req,res) => {
   
  var identifier = req.params.id.split(":");
 
  let searchedGT = GeoTagStoreObject.searchGeoTagID(identifier[1]);
   
   console.log(searchedGT);
 
   GeoTagStoreObject.removeGeoTag(searchedGT.name);
 
   let GTArr = GeoTagStoreObject.getArray();
 
   res.send(JSON.stringify(searchedGT) + '\n' + JSON.stringify(GTArr));
 
   //Löschen des GeoTags im Array, wo man mit der ID nachsucht.
 });

 
 module.exports = router;