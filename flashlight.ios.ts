import { FlashLightCommon } from './flashlight.common';
var device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);

export class FlashLight extends FlashLightCommon {
	public isAvailable(): boolean {
		return !!device;
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
		device.flashMode = AVCaptureFlashMode.Off;
		device.unlockForConfiguration();
	}

	public off(): void {
		device.lockForConfiguration();
		device.torchMode = AVCaptureTorchMode.Off;
		device.flashMode = AVCaptureFlashMode.Off;
		device.unlockForConfiguration();
	}
}
