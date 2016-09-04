"use strict";

var ogr2ogr = require('ogr2ogr');
var OgrJsonStream = require('ogr-json-stream');
var fs = require('fs');
var through = require('through2');
var pipe = require('pump');

var tmp_trees_geojson = "./data/tmp/trees.geojson";
var raw_shape = "./data/raw/StreetTree_WGS84_April_2016.zip";
var geojson_start = "{ \"type\": \"FeatureCollection\", \"features\": [";
var geojson_end = "]}";


var through = require('through2');
function transformGeoJsonFeature() { 
	return through.obj(function (feature, encoding, callback) {
		this.push( JSON.stringify(feature)  );
		//console.log( JSON.stringify(feature)  );
		return callback();
	});
}


//skip conversion if the file exists already
fs.stat(tmp_trees_geojson, function(err){
	console.log("converting shape to geojson...", raw_shape, tmp_trees_geojson);

 	if( err === null || err.code != 'ENOENT') {
		console.log(tmp_trees_geojson, "exists, skipping conversion");
		return;
	}

	var tmp_geojson = fs.createWriteStream(tmp_trees_geojson);
	tmp_geojson.write(geojson_start);

	var timeout_ms = 120000; //two minutes
	var ogr = ogr2ogr(raw_shape).timeout(timeout_ms);


	pipe(   ogr.stream(),
			OgrJsonStream(),
			transformGeoJsonFeature(),
			tmp_geojson,
			function(err){
				if(err){
					return console.error('Shapefile to GeoJSON conversion error:', err);

				} else {
					tmp_geojson.write(geojson_end);
					console.log("Conversion Complete");
				}
			});

});