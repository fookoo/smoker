import { Map } from './components/map/map';

export class App {
    constructor() {
        this.modules = [
            new Map(document.getElementsByTagName('map')[0])
        ];


        facebookConnectPlugin.login(['public_profile'], (success) => {
            console.info('fb login success');
            console.dir(success);
        }, (error) => {
            console.warn('fb login fail');
            console.warn(error);
        });
    }
}




document.addEventListener("deviceready", () => {
    const APP = new App();
}, false);
