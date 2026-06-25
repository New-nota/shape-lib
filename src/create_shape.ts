import type { Shape } from "./core/shape.js";

export interface ShapeEventDetail {
    readonly shape: Shape;
}

export class ShapeEvent extends Event {
    readonly detail: ShapeEventDetail;

    constructor(type: string, detail: ShapeEventDetail) {
        super(type);
        this.detail = detail;
    }
}

export type ShapeConstructor<P = unknown> = new (params: P) => Shape;

export class ShapeCreate extends EventTarget {
    readonly #registry = new Map<string, ShapeConstructor>();

    register<P>(kind: string, ctor: ShapeConstructor<P>): void {
        if( this.#registry.has(kind)) {
            throw new Error(`Фигура ${kind} уже создана`)
        }
        this.#registry.set(kind, ctor as ShapeConstructor);
    }

    kinds(): string[] {
        return [...this.#registry.keys()];
    }

    async create<P>(kind: string, params: P): Promise<Shape> {
        const ctor = this.#registry.get(kind);
        if (!ctor) {
            throw new Error(`Неизвестная фигура "${kind}"`);
        }
        const shape = new ctor(params);
        this.dispatchEvent(new ShapeEvent("create", {shape}));
        return shape;
    }
}