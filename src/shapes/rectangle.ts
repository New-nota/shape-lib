import { Shape } from "../core/shape.js"

export interface RectangleParams {
    width: number;
    height: number;
}

export class Rectangle extends Shape {
    #width: number;
    #heigth: number;

    constructor(params: RectangleParams) {
        super("rectangle");
        Rectangle.assertPositive(params.width, "width");
        Rectangle.assertPositive(params.height, "height");
        this.#heigth = params.height;
        this.#width = params.width;
    }

    get params(): Readonly<RectangleParams> {
        return { width: this.#width, height: this.#heigth};
    }

    get width(): number {
        return this.#width;
    }

    set width(value: number) {
        Rectangle.assertPositive(value, "width");
        this.#width = value;
        this.emitChange();
    }

    get heigth(): number {
        return this.#heigth;
    }

    set heigth(value: number) {
        Rectangle.assertPositive(value, "heigth");
        this.#heigth = value;
        this.emitChange();
    }

    async area(): Promise<number> {
        return this.#heigth * this.#width;
    }

    async perimeter(): Promise<number> {
        return 2 * (this.#heigth + this.#width);
    }

    private static assertPositive(value: number, name: string): void {
        if (!Number.isFinite(value) || value <= 0) {
            throw new RangeError(`${name} должно быть положительное число`);
        }
        
    }

}