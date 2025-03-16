import convert from "color-convert";
import { IActivityTypeColor, INamedColor } from "./activity-color.types";

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
