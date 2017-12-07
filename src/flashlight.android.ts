import { android as androidApplication } from 'tns-core-modules/application';
import { device } from 'tns-core-modules/platform';
import { isNullOrUndefined } from 'tns-core-modules/utils/types';
import { Common } from './flashlight.common';

export class Flashlight extends Common {
    private camera: any;
    private appContext: any;
    private cameraManager: any;
    private parameters: any;

    private static instance: Flashlight;

    private get hasCamera2API(): boolean {
        let sdkVersion: string = device.sdkVersion.replace('(ios)', '').replace('android', '');
        return parseInt(sdkVersion) > 22;
    }

    public constructor() {
        super();
        if(!isNullOrUndefined(Flashlight.instance)) {
            throw new Error('Error: Instance failed: Use Flashlight.getInstance() instead of new.');
        }

        this.init();
        Flashlight.instance = this;
    }

    static getInstance() {
        if(isNullOrUndefined(Flashlight.instance)) {
            Flashlight.instance = new Flashlight();
        }
        return Flashlight.instance;
    }

    public isAvailable(): boolean {
        var packageManager = androidApplication.currentContext.getPackageManager();
        return packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
    }

    public on(arg: any): void {
        this.checkAvailability();

        if (this.hasCamera2API === true) {
            this.cameraManager.setTorchMode(this.camera, true);
        } else {
            if (isNullOrUndefined(this.camera)) {
                this.camera = android.hardware.Camera.open();
                this.parameters = this.camera.getParameters();
            }
            this.parameters.setFlashMode(android.hardware.Camera.Parameters.FLASH_MODE_TORCH);
            this.camera.setParameters(this.parameters);
            this.camera.startPreview();
        }
        this.isOn = true;
    }

    public off(): void {
        if (this.hasCamera2API === true) {
            this.cameraManager.setTorchMode(this.camera, false);
        } else {
            if(!isNullOrUndefined(this.camera)) {
                this.parameters.setFlashMode(android.hardware.Camera.Parameters.FLASH_MODE_OFF);
                this.camera.setParameters(this.parameters);
                this.camera.stopPreview();
                this.camera.release();
                this.camera = undefined;
            }
        }
        this.isOn = false;
    }

    private init(): void {
        if (this.hasCamera2API === true) {
            if(isNullOrUndefined(androidApplication)) {
                console.error('androidApplication is not instantiated, please call the init on a later moment');
                return;
            }
            this.appContext = androidApplication.context;
            this.cameraManager = this.appContext.getSystemService((<any>android.content.Context).CAMERA_SERVICE);
            this.camera = this.cameraManager.getCameraIdList()[0];
        }
    }
}
