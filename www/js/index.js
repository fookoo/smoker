class SmokerApp {
    constructor() {
        console.info('SmokerApp init');

        this.counter = document.getElementById('counter');
        this.introduction = document.getElementById('introduction')

        let perDay = new Component({
            id: 'count',
            label: '/ day',
            title: 'How many cigarettes per day?'
        });

        let cost = new Component({
            id: 'cost',
            label: '/ PLN',
            title: 'How much it cost?'
        });




        this.fromColor = {r: 255, g: 0, b: 0};
        this.toColor = {r: 0, g: 255, b: 0};
        this.value = undefined;
        this.longClickThreshold = 300;

        this.bindEvents();
        this.sync(false);
        this.setBackground();
        this.countdown(this.value);
    }

    bindEvents() {
        this.counter.addEventListener('touchstart', this.touchStart.bind(this));
        this.counter.addEventListener('touchend', this.touchEnd.bind(this));
    }

    getGradientStepColor(fromColor = {r: 0, g: 0, b: 0}, toColor = {r: 0, g: 0, b: 0}, step = 0, steps = 30) {
        return {
            r: parseInt(fromColor.r + (((toColor.r - fromColor.r) / steps) * step)),
            g: parseInt(fromColor.g + (((toColor.g - fromColor.g) / steps) * step)),
            b: parseInt(fromColor.b + (((toColor.b - fromColor.b) / steps) * step))
        }
    }

    touchStart() {
        this.timer = new Date().getTime();
    }

    touchEnd() {
        let duration = new Date().getTime() - this.timer;

        if (duration > this.longClickThreshold) {
            this.reset();
        } else {
            this.value++;
            this.sync();
        }

        this.timer = 0;
    }

    sync(html = true) {
        if (this.value === undefined) {
            this.value = window.localStorage.getItem('smoker.value') || 0;
        }

        if (this.value > 0) {
            this.introduction.classList.remove('show');
        }

        if (html){
            this.setValueToHtml();
            this.setBackground();
        }


        window.localStorage.setItem('smoker.value', this.value);
    }

    reset() {
        this.value = 0;
        this.introduction.classList.add('show');
        this.sync();
    }

    setValueToHtml() {
        this.counter.innerHTML = this.value;
    }

    setBackground() {
        let color = this.getGradientStepColor(this.fromColor, this.toColor, this.value < 60 ? this.value : 60, 60);
        this.counter.style.background = `rgb(${color.r},${color.g},${color.b})`;
    }

    countdown(value = 0, current = 0) {
        if (current <= value) {
            setTimeout(() => {
                this.counter.innerHTML = current;

                this.countdown(value, current + 1);
            }, parseInt(1000 / value));
        }

    }
}

class Component {
    constructor(options = {id: '', label: '', title: ''}) {
        this.element = document.getElementById(options.id);

        this.element.innerHTML =
            `<header>${options.title}</header>
            <content>
                <span>0</span>
                <label>${options.label}</label>
            </content>
            <nav>
                <button class="up">+</button>
                <button class="down">-</button>
            </nav>`;

    }
}

// start app on device ready
document.addEventListener('deviceready', () => {
    var app = new SmokerApp();
});