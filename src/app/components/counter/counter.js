const Config = require('../../config.json');
export class Counter {
    constructor(element) {
        this.longClickThreshold = 300;
        this.fromColor = {r: 255, g: 0, b: 0};
        this.toColor = {r: 40, g: 145, b: 20};
        
        this.element = element;

        window.localStorage.setItem(Config['count.key'], 12);
        window.localStorage.setItem(Config['cost.key'], 14.5);
        window.localStorage.setItem(Config['cost.currency.key'], 'PLN');

        this.buildTemplate();
        this.events();
        this.sync();
    }

    buildTemplate() {
        this.introElement = document.createElement('label');
        this.valueElement = document.createElement('span');
        this.countElement = document.createElement('span');
        this.savingsElement = document.createElement('span');

        this.introElement.setAttribute('class', 'show');

        this.valueElement.setAttribute('id', 'days');
        this.countElement.setAttribute('id', 'count');
        this.countElement.setAttribute('class', 'intro');
        this.savingsElement.setAttribute('id', 'savings');
        this.savingsElement.setAttribute('class', 'intro');

        this.introElement.innerHTML = Config['introduction.text'];

        this.element.appendChild(this.introElement);
        this.element.appendChild(this.valueElement);
        this.element.appendChild(this.countElement);
        this.element.appendChild(this.savingsElement);
    }
    
    events() {
        this.element.addEventListener('touchstart', this.touchStart.bind(this));
        this.element.addEventListener('touchend', this.touchEnd.bind(this));
    }
    
    sync() {
        if (this.value === undefined) {
            this.value = window.localStorage.getItem(Config['counter.key']) || 0;
        }

        if (this.value > 0) {
            this.introElement.classList.remove('show');
            this.countElement.classList.remove('intro');
            this.savingsElement.classList.remove('intro');

        }

        let cigarettesPerDay = parseInt(window.localStorage.getItem(Config['count.key']) || 0);
        let packageCost = parseFloat(window.localStorage.getItem(Config['cost.key']) || 0);
        let currency = window.localStorage.getItem(Config['cost.currency.key']) || '';
        let packagesPerDay = cigarettesPerDay / 20;
        let tarValue = 8; //8 mg/day

        this.valueElement.innerHTML = this.value;
        this.countElement.innerHTML = this.value * cigarettesPerDay * tarValue + ' mg';
        this.savingsElement.innerHTML = parseFloat(this.value * (packageCost * packagesPerDay)).toFixed(2) + ' ' + currency;
        this.setBackground();
        
        window.localStorage.setItem(Config['counter.key'], this.value);
    }

    reset() {
        this.value = 0;
        this.introElement.classList.add('show');
        this.countElement.classList.add('intro');
        this.savingsElement.classList.add('intro');
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

    getGradientStepColor(fromColor = {r: 0, g: 0, b: 0}, toColor = {r: 0, g: 0, b: 0}, step = 0, steps = 30) {
        return {
            r: parseInt(fromColor.r + (((toColor.r - fromColor.r) / steps) * step)),
            g: parseInt(fromColor.g + (((toColor.g - fromColor.g) / steps) * step)),
            b: parseInt(fromColor.b + (((toColor.b - fromColor.b) / steps) * step))
        }
    }

    setBackground() {
        let color = this.getGradientStepColor(this.fromColor, this.toColor, this.value < 60 ? this.value : 60, 60);
        this.element.style.background = `rgb(${color.r},${color.g},${color.b})`;
    }
}