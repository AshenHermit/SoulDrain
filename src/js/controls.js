class Controls{
    constructor(){
        this.is_pressed = {}
        this.on_press = {}
        this.enabled = false
    }

    reset_on_press(){
        this.on_press = {}
    }

    update(){
        this.reset_on_press()
    }

    setup_event_listeners(){
        this.enabled = true
        document.addEventListener('keypress', (function(e){
            if(!this.is_pressed[e.code]) this.is_pressed[e.code] = true
            if(!this.on_press[e.code]) this.on_press[e.code] = true
        }).bind(this), false)
        document.addEventListener('keyup', (function(e){
            this.is_pressed[e.code] = false
        }).bind(this), false)
    }
}