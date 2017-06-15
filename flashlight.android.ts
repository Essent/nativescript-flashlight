import { FlashLightCommon } from './flashlight.common';
import { device } from 'platform';
import { android as androidApplication } from 'application'

export class FlashLight extends FlashLightCommon {
    private camera: any;
    private appContext: any;
    private cameraManager: any;
    private parameters: any;

    private get hasCamera2API(): boolean {
        let sdkVersion: string = device.sdkVersion.replace('(ios)', '').replace('android', '');
        return parseInt(sdkVersion) > 20;
    }

    public isAvailable(): boolean {
        var packageManager = androidApplication.currentContext.getPackageManager();
        return packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
    }

    public on(arg: any): void {
        this.checkAvailability();
        this.init();

        if (this.hasCamera2API) {
            this.cameraManager.setTorchMode(this.camera, true);
        } else {
            this.parameters.setFlashMode(this.camera.Parameters.FLASH_MODE_TORCH);
            this.camera.setParameters(this.parameters);
        }
    }

    public off(): void {
        this.init();

        if (this.hasCamera2API) {
            this.cameraManager.setTorchMode(this.camera, false);
        } else {
            this.parameters.setFlashMode(this.camera.Parameters.FLASH_MODE_OFF);
            this.camera.setParameters(this.parameters);
            this.camera.stopPreview();
            this.camera.release();
        }
    }

    private init(): void {
        if (this.hasCamera2API && !this.cameraManager) {
            this.appContext = androidApplication.context;
            this.cameraManager = this.appContext.getSystemService('camera'); //TODO: figure out how to use android.content.Context.CAMERA_SERVICE
            this.camera = this.cameraManager.getCameraIdList()[0];
        } else if(!this.camera) {
            this.camera = android.hardware.Camera.open(0);
            this.parameters = this.camera.getParameters();
        }
    }
}
