import * as convert from "color-convert";
import { IActivityTypeColor } from "./interfaces";

/*function rgb(r: number, g: number, b: number) {
  return {
    r, g, b
  };
}*/

interface INamedColor {
    name: string;
    color: [number, number, number];
}

// defined base colors in RGB
const baseColorsRgb: INamedColor[] = [
    { name: "blue", color: [163, 186, 202] },
    { name: "yellow", color: [251, 234, 201] },
    { name: "red", color: [240, 204, 204] },
    { name: "green", color: [220, 255, 220] },
    { name: "grey", color: [170, 170, 170] },
    { name: "purple", color: [172, 161, 209] },
];

// convert base colors to HSV
const baseColorsHsv = baseColorsRgb.map((c) => ({
    ...c,
    color: convert.rgb.hsv(c.color),
}));

// create variants for each color
const variantsHSV = baseColorsHsv
    .map((c) => {
        // initialize with the base variant
        const colorVariants: INamedColor[] = [c];
        // decrease value by a bit
        let index = 2;
        for (const decrement of [10, 20, 30, 35]) {
            colorVariants.push({
                name: `${c.name}-${index}`,
                color: [c.color[0], c.color[1], c.color[2] - decrement],
            });
            index += 1;
        }
        return colorVariants;
    })
    .reduce((prev, cur) => prev.concat(cur), []);

const variantsRGB = variantsHSV.map((c) => ({
    ...c,
    color: convert.hsv.rgb(c.color),
}));

export const activityColors: IActivityTypeColor[] = variantsRGB.map((c) => ({
    id: c.name,
    styleClass: `activity-${c.name}`,
    color: { r: c.color[0], g: c.color[1], b: c.color[2] },
}));

/*export const activityColors: IActivityTypeColor[] = [
  {
    id: 'blue',
    styleClass: 'activity-blue',
    color: { r: 163, g: 186, b: 202 },
  },
  {
    id: 'blue-2',
    styleClass: 'activity-blue-2',
    color: rgb(142, 165, 182),
  },
  {
    id: 'blue-3',
    styleClass: 'activity-blue-3',
    color: rgb(128, 150, 167),
  },
  {
    id: 'blue-4',
    styleClass: 'activity-blue-4',
    color: rgb(100, 121, 138),
  },
  {
    id: 'yellow',
    styleClass: 'activity-yellow',
    color: { r: 251, g: 234, b: 201 },
  },
  {
    id: 'red',
    styleClass: 'activity-red',
    color: { r: 240, g: 204, b: 204 },
  },
  {
    id: 'green',
    styleClass: 'activity-green',
    color: { r: 220, g: 255, b: 220 },
  },
  {
    id: 'grey',
    styleClass: 'activity-grey',
    color: { r: 170, g: 170, b: 170 },
  },
  {
    id: 'purple',
    styleClass: 'activity-purple',
    color: { r: 172, g: 161, b: 209 },
  },
];
*/
