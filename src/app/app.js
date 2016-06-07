import { Counter } from './components/counter/counter';
import { Menu } from './components/menu/menu';
import { resetButton } from './components/menu/modules/reset';

class App {
    constructor() {
        this.modules = {
            counter: new Counter(document.getElementsByTagName('counter')[0]),
            menu: new Menu(document.getElementsByTagName('menu')[0])
        };
        
        
        this.modules.menu.addComponent(resetButton);
        
    }
}

const APP = new App();
