import fs from "fs";
import * as data from './illinois-counties copy.json'

const run = () => {
  let maxLong = Number.MIN_SAFE_INTEGER
  let maxLat = Number.MIN_SAFE_INTEGER

  let minLong = Number.MAX_SAFE_INTEGER
  let minLat = Number.MAX_SAFE_INTEGER

  data.default.features.forEach((feature) => {

    feature.geometry.coordinates[0][0].forEach((item) => {
      // console.log(item)
      let long = item[0]
      let lat = item[1]

      if(lat < minLat) minLat = lat
      if(lat > maxLat) maxLat = lat

      
      if(long < minLong) minLong = long
      if(long > maxLong) maxLong = long


    })
  })
  console.log("Max: " + maxLat + " " + maxLong)
  console.log("Min: " + minLat + " " + minLong)

  // console.log("Horizontal distance = " + (maxLat - minLat))
  // console.log("Horizontal distance = " + (maxLong - minLong))
};

run();
