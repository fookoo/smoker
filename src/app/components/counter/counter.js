const Config = require('../../config.json');
export class Counter {
    constructor(element) {
        this.longClickThreshold = 300;
        this.fromColor = {r: 255, g: 0, b: 0};
        this.toColor = {r: 40, g: 145, b: 20};
        
        this.element = element;


        this.buildTemplate();
        this.events();
        this.sync();
    }

    buildTemplate() {
        this.introElement = document.createElement('label');
        this.valueElement = document.createElement('span');


        this.introElement.setAttribute('class', 'show');
        this.valueElement.setAttribute('id', 'days');

        this.introElement.innerHTML = Config['introduction.text'];

        this.element.appendChild(this.introElement);
        this.element.appendChild(this.valueElement);
    }
    
    events() {
        this.element.addEventListener('touchstart', this.touchStart.bind(this), {passive: true});
        this.element.addEventListener('touchend', this.touchEnd.bind(this), {passive: true});
    }
    
    sync() {
        if (this.value === undefined) {
            this.value = window.localStorage.getItem(Config['counter.key']) || 0;
        }

        if (this.value > 0) {
            this.introElement.classList.remove('show');

        }

        this.valueElement.innerHTML = this.value;
        this.setBackground();
        
        window.localStorage.setItem(Config['counter.key'], this.value);
    }

    reset() {
        this.value = 0;
        this.introElement.classList.add('show');
    }

    touchStart() {
        this.timer = new Date().getTime();
    }

    touchEnd() {
        let duration = new Date().getTime() - this.timer;

        if (duration > this.longClickThreshold) {
            console.info('reset');
            this.reset();
        } else {
            this.value++;
        }

        this.sync();
        this.timer = 0;
    }

    static getGradientStepColor(fromColor = {r: 0, g: 0, b: 0}, toColor = {r: 0, g: 0, b: 0}, step = 0, steps = 30) {
        return {
            r: parseInt(fromColor.r + (((toColor.r - fromColor.r) / steps) * step)),
            g: parseInt(fromColor.g + (((toColor.g - fromColor.g) / steps) * step)),
            b: parseInt(fromColor.b + (((toColor.b - fromColor.b) / steps) * step))
        }
    }

    setBackground() {
        let color = Counter.getGradientStepColor(this.fromColor, this.toColor, this.value < 60 ? this.value : 60, 60);
        this.element.style.background = `rgb(${color.r},${color.g},${color.b})`;
    }
}