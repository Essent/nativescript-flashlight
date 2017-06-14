"use strict";
var flashlight_common_1 = require("./flashlight.common");
var platform_1 = require("platform");
var application_1 = require("application");
var FlashLight = (function (_super) {
    __extends(FlashLight, _super);
    function FlashLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FlashLight.prototype, "hasCamera2API", {
        get: function () {
            var sdkVersion = platform_1.device.sdkVersion.replace('(ios)', '').replace('android', '');
            return parseInt(sdkVersion) > 20;
        },
        enumerable: true,
        configurable: true
    });
    FlashLight.prototype.isAvailable = function () {
        var packageManager = application_1.android.currentContext.getPackageManager();
        return packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
    };
    FlashLight.prototype.on = function (arg) {
        this.checkAvailability();
        if (!this.camera) {
            this.init();
        }
        if (this.hasCamera2API) {
            console.log('Test 1');
            console.dir(this.cameraManager);
            this.cameraManager.setTorchMode(this.camera, true);
        }
        else {
            this.parameters.setFlashMode(this.camera.Parameters.FLASH_MODE_TORCH);
            this.camera.setParameters(this.parameters);
        }
        this.isOn = true;
    };
    FlashLight.prototype.off = function () {
        if (!this.camera) {
            this.init();
        }
        if (this.hasCamera2API) {
            console.log('Test 2');
            console.dir(this.cameraManager);
            this.cameraManager.setTorchMode(this.camera, false);
        }
        else {
            this.parameters.setFlashMode(this.camera.Parameters.FLASH_MODE_OFF);
            this.camera.setParameters(this.parameters);
            this.camera.stopPreview();
            this.camera.release();
        }
        this.isOn = false;
    };
    FlashLight.prototype.init = function () {
        console.log('Init!');
        if (this.hasCamera2API) {
            this.appContext = application_1.android.context;
            this.cameraManager = this.appContext.getSystemService('camera');
            this.camera = this.cameraManager.getCameraIdList()[0];
        }
        else {
            this.camera = android.hardware.Camera.open(0);
            this.parameters = this.camera.getParameters();
        }
    };
    return FlashLight;
}(flashlight_common_1.FlashLightCommon));
exports.FlashLight = FlashLight;
//# sourceMappingURL=flashlight.android.js.map