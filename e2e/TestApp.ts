import { KoaApp } from "../KoaApp";


let appInstance: KoaApp;

export const createTestApp = async () => {
    appInstance = new KoaApp();
    await appInstance.init();
    return appInstance.getApp().callback();
};
