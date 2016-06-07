import { exitButton } from './modules/exit';

export class Menu {
    constructor(element) {
        console.info('Menu constructor');

        this.timer = 0;
        this.longClickThreshold = 400;
        this.components = [];
        
        this.element = element;
        this.buildTemplate();
        this.events();

        this.addComponent(exitButton);
    }

    buildTemplate() {
        this.element.innerHTML = `<div class="overlay">
                                      <ul class="components">
                                      
                                      </ul>
                                  </div>`;

        this.overlay = this.element.getElementsByClassName('overlay')[0];
        this.componentsContainer = this.element.getElementsByClassName('components')[0];
    }

    events() {
        document.addEventListener('touchstart', this.touchStart.bind(this));
        document.addEventListener('touchend', this.touchEnd.bind(this));
    }

    touchStart() {
        this.timer = new Date().getTime();
    }

    touchEnd() {
        let duration = new Date().getTime() - this.timer;

        if (duration > this.longClickThreshold) {
            this.show();
        }

        this.timer = 0;
    }

    show() {
        this.overlay.classList.add('show');
    }

    hide() {
        this.overlay.classList.remove('show');
    }

    addComponent(component) {
        component = new component(this);

        this.components.push(component);
        this.componentsContainer.appendChild(component.render());
    }
}
