export { Shape } from "./core/shape.js";
export { ShapeEventDetail, ShapeEvent, ShapeConstructor, ShapeCreate } from "./create_shape.js";

export { Rectangle } from "./shapes/rectangle.js";
export type { RectangleParams } from "./shapes/rectangle.js";
export { Circle } from "./shapes/circle.js";
export type { CircleParams } from "./shapes/circle.js";
export { Triangle } from "./shapes/triangle.js";
export type { TriangleParams } from "./shapes/triangle.js";

import { Rectangle } from "./shapes/rectangle.js";
import { Circle } from "./shapes/circle.js";
import { Triangle } from "./shapes/triangle.js";
import { ShapeCreate } from "./create_shape.js";

export function createDefaultShapes(): ShapeCreate {
    const creator = new ShapeCreate();
    creator.register("rectangle", Rectangle)
    creator.register("circle", Circle);
    creator.register("triangle", Triangle);
    return creator;
}