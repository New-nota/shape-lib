import { Shape } from "../core/shape.js"


export interface TriangleParams {
    a: number;
    b: number;
    c: number;
}

export class Triangle extends Shape {
    #a: number;
    #b: number;
    #c: number;

    constructor( params: TriangleParams) {
        super("triangle");
        Triangle.assertValid(params.a, params.b, params.c);
        this.#a = params.a;
        this.#b = params.b;
        this.#c = params.c;
    }

    get params(): Readonly<TriangleParams> {
        return {a: this.#a, b: this.#b, c: this.#c};
    }

    async area(): Promise<number> {
        const s = (this.#a + this.#b + this.#c) / 2;
        return Math.sqrt(s * ( s - this.#a) * (s-this.#b) * (s - this.#c));
    }

    async perimeter(): Promise<number> {
        return this.#a + this.#b + this.#c;
    }

    private static assertValid(a: number, b: number, c: number): void {
        for (const [value, name] of [[a, "a"], [b, "b"], [c, "c"]] as const) {
            if (!Number.isFinite(value) || value <=0) {
                throw new RangeError(`${name} должно быть положительное число`);
            }
        }
        if (a + b <= c || b + c <= a || a + c <= b ) {
            throw new RangeError("стороны не удовлетворяют равенству треугольника")
        }
    }
} 