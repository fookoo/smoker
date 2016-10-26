const Config = require('../../config.json');
export class Map {
    constructor(element) {
        console.info('Map constructor');
        console.dir(element);

        this.element = element;
        this.myPositon = null;

        let elem = document.getElementById('go');
        this.map = plugin.google.maps.Map.getMap(this.element);

        this.map.addEventListener(plugin.google.maps.event.MAP_READY, () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.buildTemplate.bind(this), this.buildTemplate.bind(this), {
                    maximumAge: 30000,
                    timeout: 3000,
                    enableHighAccuracy: true
                });
            }
        });




    }

    buildTemplate(position) {
        this.map.animateCamera({
            target: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 17,
            tilt: 60,
            bearing: 0,
            duration: 5000
        });

    }
    
    events() {

    }
    
}