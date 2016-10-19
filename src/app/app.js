import { Counter } from './components/counter/counter';

class App {
    constructor() {
        this.modules = {
            counter: new Counter(document.getElementsByTagName('counter')[0])
        };
    }
}

const APP = new App();
