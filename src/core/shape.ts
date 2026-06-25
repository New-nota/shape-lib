import { ShapeEvent } from "../create_shape.js";

export abstract class Shape extends EventTarget {
    readonly kind: string;

    protected constructor(kind: string) {
        super();
        this.kind = kind
    }

    abstract get params(): Readonly<Record<string, number>>;

    abstract area(): Promise<number>;

    abstract perimeter(): Promise<number>;

    protected emitChange(): void {
        this.dispatchEvent(new CustomEvent("change", { detail: { shape: this } }));
    }
}