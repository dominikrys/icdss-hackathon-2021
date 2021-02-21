import chroma from "chroma-js";
import React, { Dispatch } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geojson } from "./geojson";
import { futureYield } from "./futureYield";
import Title from "antd/lib/typography/Title";
import { Typography } from "antd";

interface Props {
  setContent: Dispatch<React.SetStateAction<string>>;
  data: any;
  historicYear: string;
  predictionYear: string;
  showPrediction: boolean;
}

export const Map: React.FC<Props> = ({
  setContent,
  data,
  historicYear: year,
  showPrediction,
  predictionYear,
}) => {
  const scale = chroma.scale(["white", "green"]);

  return (
    <>
      <Typography >
        <Title level={5}>{showPrediction ? predictionYear : year}</Title>
      </Typography>
      <ComposableMap
        data-tip=""
        projection="geoAlbers"
        projectionConfig={{
          scale: 4200,
          rotate: [88.5, 0.2, 0],
        }}
      >
        <Geographies geography={geojson}>
          {({ geographies }) =>
            geographies.map((geo, index) => {
              let countyYield: any = null;
              let color = "#FF0000";

              const { name } = geo.properties;
              if (!showPrediction) {
                if (data[year].counties[name.toUpperCase()]) {
                  countyYield = parseInt(
                    data[year].counties[name.toUpperCase()].ave
                  );
                  color = scale((countyYield as number) / 250).hex();
                }
              } else {
                countyYield = parseInt(
                  (futureYield as any)[name.toUpperCase()]
                );
                if (countyYield !== 0) {
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
                      content += " - Yield: " + countyYield;
                    }
                    setContent(content);
                  }}
                  onMouseLeave={() => {
                    setContent("");
                  }}
                  style={{
                    default: {
                      fill: color,
                      outline: "none",
                    },
                    hover: {
                      fill: chroma(color).darken().hex(),
                      outline: "none",
                    },
                    pressed: {
                      fill: chroma(color).darken().darken().hex(),
                      outline: "none",
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
