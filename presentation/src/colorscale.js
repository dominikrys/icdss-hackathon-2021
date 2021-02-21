import { Colorscale } from "react-colorscales";
import chroma from "chroma-js";


export const ColorScale = () => {
  const scale = chroma.scale(["white", "green"]);

  const colorRange = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250]
  const viridisColorscale = colorRange.map((color) => scale((color) / 250).hex())

  return (
    <>
    <Colorscale colorscale={viridisColorscale} onClick={() => {}} width={150} />
    0 - 250
    </>
  );
};
