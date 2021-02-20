import { count } from 'console';
import { UV_FS_O_FILEMAP } from 'constants';
import csv from 'csv-parser'
import fs from 'fs'



let years = {}

fs.createReadStream('IL_yield.csv')
  .pipe(csv())
  .on('data', (row) => {

    if(parseInt(row.year) >= 2003) {
      
      if(!years[row.year]) {
        years[row.year] = {counties: {}, max:Number.MIN_SAFE_INTEGER}
      }
  
      if(!years[row.year].counties[row.county]) {
        years[row.year].counties[row.county] = {count:0, ave:0, values:[]}
      }
      years[row.year].counties[row.county].values.push(row.yield)
  
      
      let count = years[row.year].counties[row.county].count
      let ave = years[row.year].counties[row.county].ave
      let values = years[row.year].counties[row.county].values
  
      count +=1
      ave = values.reduce((a, b) => a + b, 0) / count
      
      if(ave > years[row.year].max) {
        years[row.year].max = ave
      }
  
      years[row.year].counties[row.county].ave = ave
      years[row.year].counties[row.county].count = count
    }

  })
  .on('end', () => {

    let maximum = Number.MIN_SAFE_INTEGER
    Object.entries(years).forEach((year) => {

      if(years[year[0]].max > maximum) {
        maximum = years[year[0]].max
      }
    })
    console.log(maximum)


    fs.writeFileSync("averagedHistoricYield.json", JSON.stringify(years))
  });

