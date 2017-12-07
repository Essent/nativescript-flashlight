import { Observable } from 'tns-core-modules/data/observable';
export declare abstract class Common extends Observable {
    isOn: boolean;
    toggle(arg: any): void;
    protected checkAvailability(): void;
    abstract on(arg: any): void;
    abstract off(): void;
    abstract isAvailable(): boolean;
}
