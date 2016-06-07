const Config = require('../../../config.json');

export class resetButton {
    constructor() {
        this.timer = 0;
        this.longClickThreshold = 350;

        this.element = document.createElement('li');
        this.element.setAttribute('class', 'exit-button');
        this.button = document.createElement('button');
        this.button.innerHTML = 'RESET';

        this.element.appendChild(this.button);

        this.events();
    }

    events () {
        this.button.addEventListener('touchstart', this.touchStart.bind(this));
        this.button.addEventListener('touchend', this.touchEnd.bind(this));
    }

    touchStart() {
        this.timer = new Date().getTime();
    }

    touchEnd() {
        let duration = new Date().getTime() - this.timer;

        if (duration > this.longClickThreshold) {
            window.localStorage.setItem(Config['counter.key'], 0)
        }

        this.timer = 0;
    }

    render () {
        return this.element;
    }
}