import { Common } from './flashlight.common';
export declare class Flashlight extends Common {
    private camera;
    private appContext;
    private cameraManager;
    private parameters;
    private static instance;
    private readonly hasCamera2API;
    constructor();
    static getInstance(): Flashlight;
    isAvailable(): boolean;
    on(arg: any): void;
    off(): void;
    private init();
}
