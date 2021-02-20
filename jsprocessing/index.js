import fs from "fs";
import * as geoJSON from "./illinois-counties copy.json";
import d3 from "d3";

const run = () => {
  let rootpath = "./weather";
  let writeStream = fs.createWriteStream("./allweather.csv");

  writeStream.write(
    "stationCode,county,lat,long,units,year,month,day,hour,measurement\n",
    "utf-8"
  );

  let stations = new Map();

  var stationInfo = fs
    .readFileSync("./station-information.txt") // https://www.ncdc.noaa.gov/homr/reports
    .toString("utf-8");
  const allLines = stationInfo.split(/\r\n|\n/);
  allLines.forEach((line, index) => {

    if(index % 100 === 0) {
      console.log(index/allLines.length * 100)

    }

    let stationCode = line.substring(34, 40);
    let latitude = line.substring(85, 94).replace("*", ".").replace("'", "");
    let longitude = line.substring(95, 106).replace("*", ".").replace("'", "");

    let county = "";

    geoJSON.default.features.forEach((feature) => {
      if (d3.geoContains(feature, [parseInt(longitude), parseInt(latitude)])) {
        county = feature.properties.name;
      }
    });

    stations.set(stationCode, { latitude, longitude, county });
  });

  var folders = fs.readdirSync(rootpath);
  folders.forEach((folder) => {
    let folderPath = rootpath + "/" + folder;
    var files = fs.readdirSync(folderPath);
    files.forEach((filepath) => {
      var file = fs.readFileSync(folderPath + "/" + filepath).toString("utf-8");
      const allLines = file.split(/\r\n|\n/);

      allLines.forEach((line) => {
        let stationCode = line.substring(3, 9);
        let units = line.substring(15, 17);
        let year = line.substring(17, 21);
        let month = line.substring(21, 23);
        let day = line.substring(25, 27);
        let numberOfItems = parseInt(line.substring(27, 30));

        let latitude = "";
        let longitude = "";
        let county = "";

        if (stations.has(stationCode)) {
          let {
            latitude: innerLatitude,
            longitude: innerLongitude,
            county: innerCounty,
          } = stations.get(stationCode);
          latitude = innerLatitude;
          longitude = innerLongitude;
          county = innerCounty;
        }

        let baseString =
          stationCode +
          "," +
          county +
          "," +
          latitude +
          "," +
          longitude +
          "," +
          units +
          "," +
          year +
          "," +
          month +
          "," +
          day +
          ",";

        let datapoints = line.substring(30);
        for (let i = 0; i < numberOfItems; i++) {
          let thisItem = datapoints.substring(0, 11);
          datapoints = datapoints.substring(12); // remove for next loop

          let hour = thisItem.substring(0, 4);
          let measurement = thisItem.substring(5);

          if (!/[a-zA-Z,{}[\]]/.test(measurement)) {
            let writeString = baseString + hour + "," + measurement + "\n";
            writeStream.write(writeString, "utf-8");
          }
        }
      });
    });
  });
};

console.time('someFunction')

run();

console.timeEnd('someFunction')

