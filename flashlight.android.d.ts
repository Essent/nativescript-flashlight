import { FlashLightCommon } from './flashlight.common';
export declare class FlashLight extends FlashLightCommon {
    private camera;
    private appContext;
    private cameraManager;
    private parameters;
    private readonly hasCamera2API;
    isAvailable(): boolean;
    on(arg: any): void;
    off(): void;
    private init();
}
