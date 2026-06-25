import {Shape} from "../core/shape.js"

export interface CircleParams {
    radius: number;
}

export class Circle extends Shape {
    #radius: number;

    constructor(params: CircleParams) {
        super("circle");
        Circle.assertPositive(params.radius, "radius")
        this.#radius = params.radius
    }

    get params(): Readonly<CircleParams> {
        return {radius: this.#radius}
    }

    get radius(): number {
        return this.#radius;
    }

    set radius(value: number) {
        Circle.assertPositive(value, "radius");
        this.#radius = value;
        this.emitChange();
    }

    get diameter(): number {
        return this.#radius * 2;
    }

    async area(): Promise<number> {
        return Math.PI * this.#radius ** 2;
    }

    async perimeter(): Promise<number> {
        return 2 * Math.PI * this.#radius;
    }

    private static assertPositive(value: number, name: string): void {
        if (!Number.isFinite(value) || value <= 0) {
            throw new RangeError(`${name} должно быть положительное число`);
        }
    }
    
}