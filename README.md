# Overview
`toronto-trees` is an exploratory tool for the [Toronto Open Data](http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=9e56e03bb8d1e310VgnVCM10000071d60f89RCRD)'s  [Street Tree Dataset](Street Tree Data) built with Leaflet and D3

# Requirements
- nodejs (used to serve the files and process GeoJSON)
- gdal (used to convert Shapefiles to GeoJSON)

# Preparing the Data

`npm run data:fetch` downloads the data from Toronto Open Data 
`npm run data:process` converts it to GeoJSON
`npm run data` does both

# Running the Tool

`npm start` will start a server on port 8080

Go to localhost:8080/toronto_street_trees.html to load the tool
