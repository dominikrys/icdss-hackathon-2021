import fs from "fs";

var stationInfo = fs
    .readFileSync("./illinoisCounties.geojson") // https://www.ncdc.noaa.gov/homr/reports
    .toString("utf-8");

let jso = JSON.parse(stationInfo)
jso.features.forEach((feature) => {
  console.log(feature.properties.name.toString().toUpperCase())
});