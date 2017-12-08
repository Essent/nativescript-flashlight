import { Common } from './flashlight.common';

let device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);

export class Flashlight extends Common {
    private static instance: Flashlight = new Flashlight();

    public constructor() {
        super();
        if(Flashlight.instance) {
            throw new Error('Error: Instance failed: Use Flashlight.getInstance() instead of new.');
        }

        Flashlight.instance = this;
    }

    static getInstance() {
        return Flashlight.instance;
    }

    public isAvailable(): boolean {
        return !!device && device.hasTorch;
    }

    public on(arg: any): void {
        this.checkAvailability();

        var intensity = AVCaptureMaxAvailableTorchLevel;
        if (arg && arg.intensity) {
            var requestedIntensity = arg.intensity;
            if (requestedIntensity > 0.0 && requestedIntensity < 1.0) {
                intensity = requestedIntensity;
            }
        }

        device.lockForConfiguration();
        device.setTorchModeOnWithLevelError(intensity);
        device.unlockForConfiguration();
        this.isOn = true;
    }

    public off(): void {
        device.lockForConfiguration();
        device.torchMode = AVCaptureTorchMode.Off;
        device.unlockForConfiguration();
        this.isOn = false;
    }
}
