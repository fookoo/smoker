class SmokerApp {
    constructor() {
        console.info('SmokerApp init');

        this.counter = document.getElementById('counter');
        this.introduction = document.getElementById('introduction');

        this.fromColor = { r: 255, g: 0, b: 0 };
        this.toColor = { r: 0, g: 255, b: 0 };
        this.value = undefined;
        this.longClickThreshold = 300;

        this.bindEvents();
        this.sync();
    }

    bindEvents() {
        this.counter.addEventListener('touchstart', this.touchStart.bind(this));
        this.counter.addEventListener('touchend', this.touchEnd.bind(this));
    }

    getGradientStepColor(fromColor = { r: 0, g: 0, b: 0 }, toColor = { r: 0, g: 0, b: 0 }, step = 0, steps = 30) {
        return {
            r: parseInt(fromColor.r + (toColor.r - fromColor.r) / steps * step),
            g: parseInt(fromColor.g + (toColor.g - fromColor.g) / steps * step),
            b: parseInt(fromColor.b + (toColor.b - fromColor.b) / steps * step)
        };
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

    sync() {
        if (this.value === undefined) {
            this.value = window.localStorage.getItem('smoker.value') || 0;
        }

        let color = this.getGradientStepColor(this.fromColor, this.toColor, this.value < 60 ? this.value : 60, 60);
        this.counter.innerHTML = this.value;
        this.counter.style.background = `rgb(${ color.r },${ color.g },${ color.b })`;

        if (this.value > 0) {
            this.introduction.classList.remove('show');
        }

        window.localStorage.setItem('smoker.value', this.value);
    }

    reset() {
        this.value = 0;
        this.introduction.classList.add('show');
        this.sync();
    }
}

// start app on device ready
document.addEventListener('deviceready', () => {
    var app = new SmokerApp();
});

//# sourceMappingURL=index-compiled.js.map