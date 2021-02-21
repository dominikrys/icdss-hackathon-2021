import chroma from "chroma-js";
import React, { Dispatch } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geojson } from "./geojson";
import { futureYield } from "./futureYield";

interface Props {
  setContent: Dispatch<React.SetStateAction<string>>;
  data: any;
  year: string;
}

export const Map: React.FC<Props> = ({ setContent, data, year }) => {
  const scale = chroma.scale(["white", "green"]);

  return (
    <>
      <ComposableMap
        data-tip=""
        projection="geoAlbers"
        projectionConfig={{
          scale: 4500,
          rotate: [89, 0, 0],
        }}
      >
        <Geographies geography={geojson}>
          {({ geographies }) =>
            geographies.map((geo, index) => {
              let countyYield: any = null;
              let color = "#FF0000";

              const { name } = geo.properties;
              if (year !== "2020") {
                if (data[year].counties[name.toUpperCase()]) {
                  countyYield = parseInt(
                    data[year].counties[name.toUpperCase()].ave
                  );
                  color = scale((countyYield as number) / 250).hex();
                }
              } else {
                countyYield = parseInt((futureYield as any)[name.toUpperCase()]);
                if(countyYield!= 0) {
                  color = scale((countyYield as number) / 250).hex();

                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    let content = name;
                    if (countyYield) {
                      content += "\n" + "Yield: " + countyYield;
                    }
                    setContent(content);
                  }}
                  onMouseLeave={() => {
                    setContent("");
                  }}
                  style={{
                    default: {
                      fill: color,
                    },
                    hover: {
                      fill: chroma(color).darken().hex(),
                    },
                    pressed: {
                      fill: chroma(color).darken().darken().hex(),
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};
