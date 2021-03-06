import { Flashlight } from '@essent/nativescript-flashlight';
import { EventData, Observable, PropertyChangeData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { Slider } from 'tns-core-modules/ui/slider';

let flashLight: Flashlight = Flashlight.getInstance();
let viewModel = new Observable();
viewModel.set("flashlightState", "Turn on");
viewModel.set("intensity", 50);

export function toggleFlashlight(arg) {
    if (flashLight.isAvailable()) {
        flashLight.toggle({
            intensity: viewModel.get("intensity") / 100
        });
        viewModel.set("flashlightState", (flashLight.isOn ? "Turn off" : "Turn on"));
    } else {
        alert("A flashlight is not available on your device.");
    }
};

export function pageLoaded(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = viewModel;

    let slider = <Slider>page.getViewById("intensitySlider");
    if(slider) {
        slider.on("propertyChange", (args: PropertyChangeData) => {
            console.log("Intensity set to: " + args.value);
        });
    }
}
