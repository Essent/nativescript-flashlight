import { Common } from './flashlight.common';
export declare class Flashlight extends Common {
    private static instance;
    constructor();
    static getInstance(): Flashlight;
    isAvailable(): boolean;
    on(arg: any): void;
    off(): void;
}
