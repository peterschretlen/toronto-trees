'use strict';

var download = require('download');
var _ = require('lodash');
var url = require('url');
var path = require('path');
var fs = require('fs');
var AdmZip = require('adm-zip');

var raw_data_path = './data/raw/';
var data_url = 'http://www1.toronto.ca/City Of Toronto/Information & Technology/Open Data/Data Sets/Assets/Files/StreetTree_WGS84_April_2016.zip';
var data_readme_url = 'http://www1.toronto.ca/City_Of_Toronto/Information_&_Technology/Open_Data/Data_Sets/Assets/Files/Street_Tree_Data_Readme.xls';

function fetch(download_url) {

	var parsed_url = url.parse(download_url);
	var filename = path.basename(parsed_url.pathname);
	var filepath = raw_data_path + filename;

	//skip download if file already exists
	fs.stat(filepath, function(err, stat){
		if( err == null || err.code != 'ENOENT') return;

		console.log("downloading", download_url, filepath);
		download(download_url, raw_data_path, ).then( function(){
			var isZip = _.toLower(path.extname(filename)) === ".zip";
			if(!isZip) return;
			var zip = new AdmZip(filepath);
			zip.extractAllTo(raw_data_path, true);
		});
	});

};

_.map([data_url, data_readme_url], fetch );