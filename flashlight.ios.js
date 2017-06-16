"use strict";
var flashlight_common_1 = require("./flashlight.common");
var device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
var FlashLight = (function (_super) {
    __extends(FlashLight, _super);
    function FlashLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlashLight.prototype.isAvailable = function () {
        return !!device;
    };
    FlashLight.prototype.on = function (arg) {
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
    };
    FlashLight.prototype.off = function () {
        device.lockForConfiguration();
        device.torchMode = 0;
        device.unlockForConfiguration();
    };
    return FlashLight;
}(flashlight_common_1.FlashLightCommon));
exports.FlashLight = FlashLight;
//# sourceMappingURL=flashlight.ios.js.map